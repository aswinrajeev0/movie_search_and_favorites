import type React from "react"
import { useEffect, useMemo, useState } from "react"
import MovieCard from "@/components/MovieCard"
import type { IMovie } from "@/types/movie"
import { getMovies } from "@/services/getMovies"
import Pagination from '@mui/material/Pagination';
import { SearchInput } from "@/components/Search"
import { toast } from "sonner"
import NoMoviesFound from "@/components/NoMoviesFound";
import { debounce } from "lodash"
import FavoritesButton from "@/components/FavoritesButton"
import { getFavoriteIds } from "@/services/favoriteToggle"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    const fetchMovies = async (query: string, page: number) => {
        if (query.trim() === "") {
            setMovies([]);
            return;
        }

        setIsLoading(true);
        try {
            const moviesData = await getMovies(page, query);
            if (moviesData?.success) {
                setMovies(moviesData.movies);
                setTotalPages(moviesData.totalPages);
            } else {
                setMovies([]);
                toast(moviesData?.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const debouncedFetch = useMemo(
        () => debounce((query: string) => {
            setDebouncedQuery(query);
            setCurrentPage(1);
            fetchMovies(query, 1);
        }, 500),
        []
    );

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setMovies([]);
            return;
        }
        debouncedFetch(searchQuery);
        return () => debouncedFetch.cancel();
    }, [searchQuery, debouncedFetch]);

    useEffect(() => {
        if (searchQuery.trim() === "") return;
        fetchMovies(searchQuery, currentPage);
    }, [currentPage, searchQuery]);

    useEffect(() => {
        const fetchFavoriteIds = async () => {
            const data = await getFavoriteIds();
            setFavoriteIds(data?.favoriteIds || []);
        };

        fetchFavoriteIds();
    }, []);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex justify-between items-center mb-6">
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
                    setSearchQuery={setSearchQuery}
                />

                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                ) : movies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {movies.map((movie) => {
                                const isFavorite = favoriteIds.includes(movie.imdbID)
                                return (
                                    <MovieCard
                                        key={movie.imdbID}
                                        movie={movie}
                                        onFavoriteToggle={() => {

                                        }}
                                        isFavorite={isFavorite}
                                    />
                                )
                            }
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                            </div>
                        )}
                    </>
                ) : (searchQuery.trim() !== "") && (
                    <NoMoviesFound searchQuery={debouncedQuery} />
                )}
            </div>
        </main>
    )
}