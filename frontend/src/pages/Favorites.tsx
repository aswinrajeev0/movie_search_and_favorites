import { useEffect, useState } from "react"
import MovieCard from "@/components/MovieCard"
import type { IMovie } from "@/types/movie"
import { HeartOff } from "lucide-react"
import BackToHomeButton from "@/components/BackToHomeButton"
import { getFavorites } from "@/services/getFavorites"

export default function Favorites() {
    const [favorites, setFavorites] = useState<IMovie[]>([])

    useEffect(() => {
        async function fetchFavorites() {
            const response = await getFavorites();
            setFavorites((response?.favorites || []) as IMovie[])
        }

        fetchFavorites()
    }, [])

    const handleRemoveFavorite = (imdbID: string) => {
        setFavorites(favorites.filter(fav => fav.imdbID !== imdbID))
    }

    return (
        <main className="max-w-6xl mx-auto px-4 py-6 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">My Favorite Movies</h1>
                    <p className="text-muted-foreground mt-1">
                        Your collection of favorite movies
                    </p>
                </div>
                <BackToHomeButton />
            </div>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
                    {favorites.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            isFavorite={true}
                            onFavoriteToggle={() => handleRemoveFavorite(movie.imdbID)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <HeartOff className="h-14 w-14 text-gray-400 mb-3" />
                    <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
                    <p className="text-muted-foreground max-w-md">
                        You haven't added any movies to your favorites yet. Search for movies and click the heart icon to add them to your favorites.
                    </p>
                </div>
            )}
        </main>
    )
}