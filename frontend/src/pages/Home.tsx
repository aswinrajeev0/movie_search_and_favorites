import type React from "react"
import { useEffect, useMemo, useState } from "react"
import MovieCard from "@/components/MovieCard"
import { getMovies } from "@/services/getMovies"
import Pagination from '@mui/material/Pagination';
import { SearchInput } from "@/components/Search"
import { toast } from "sonner"
import NoMoviesFound from "@/components/NoMoviesFound";
import { debounce } from "lodash"
import FavoritesButton from "@/components/FavoritesButton"
import { getFavoriteIds } from "@/services/favoriteToggle"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/store"
import { setIsLoading, setMovies, setNoMovieMessage, setPage, setQuery, setTotalPages } from "@/redux/searchSlice"

export default function Home() {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    const movies = useSelector((state: RootState) => state.search.movies);
    const totalPages = useSelector((state: RootState) => state.search.totalPages);
    const isLoading = useSelector((state: RootState) => state.search.isLoading);
    const noMovieMessage = useSelector((state: RootState) => state.search.noMovieMessage);
    const searchQuery = useSelector((state: RootState) => state.search.query);
    const currentPage = useSelector((state: RootState) => state.search.currentPage);
    const dispatch = useDispatch();

    const fetchMovies = async (query: string, page: number) => {
        if (query.trim() === "") {
            dispatch(setIsLoading(false));
            dispatch(setMovies([]));
            dispatch(setPage(1))
            return;
        }

        dispatch(setIsLoading(true));
        try {
            const moviesData = await getMovies(page, query);
            if (moviesData?.success) {
                dispatch(setMovies(moviesData.movies));
                dispatch(setTotalPages(moviesData.totalPages));
                if (moviesData.movies.length === 0) {
                    dispatch(setNoMovieMessage(moviesData.message || "No movies found"));
                } else {
                    dispatch(setNoMovieMessage(null));
                }
            } else {
                dispatch(setMovies([]));
                toast(moviesData?.message || "Something went wrong");
            }
        } catch (error: unknown) {
            toast((error as Error).message ||"Something went wrong")
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const debouncedFetch = useMemo(() => debounce(fetchMovies, 500), []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            dispatch(setMovies([]));
            dispatch(setTotalPages(1));
            dispatch(setNoMovieMessage(null));
            dispatch(setPage(1));
            dispatch(setIsLoading(false));
            return;
        }
        dispatch(setIsLoading(true));
        debouncedFetch(searchQuery, currentPage);
        return () => {
            debouncedFetch.cancel();
        };
    }, [searchQuery, currentPage, debouncedFetch]);

    useEffect(() => {
        const fetchFavoriteIds = async () => {
            const data = await getFavoriteIds();
            setFavoriteIds(data?.favoriteIds || []);
        };

        fetchFavoriteIds();
    }, []);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-6 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Movie Search</h1>
                <FavoritesButton />
            </div>

            <div
                className={`w-full ${movies.length === 0 && searchQuery.trim() === ""
                    ? "h-100 flex flex-col items-center justify-center"
                    : ""
                    }`}
            >
                <SearchInput
                    searchQuery={searchQuery}
                    setSearchQuery={(value) => dispatch(setQuery(value))}
                />

                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
                    </div>
                ) : movies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
                            {movies.map((movie) => {
                                const isFavorite = favoriteIds.includes(movie.imdbID);
                                return (
                                    <MovieCard
                                        key={movie.imdbID}
                                        movie={movie}
                                        onFavoriteToggle={() => { }}
                                        isFavorite={isFavorite}
                                    />
                                );
                            })}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-6">
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    size="small"
                                    sx={{
                                        '& .MuiPaginationItem-root': {
                                            color: '#c9c0bf',
                                            '&.Mui-selected': {
                                                backgroundColor: '#2563eb',
                                                color: '#fff',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    !isLoading &&
                    searchQuery.trim() !== "" && (
                        <NoMoviesFound searchQuery={searchQuery} message={noMovieMessage} />
                    )
                )}
            </div>
        </main>
    )
}