import { useEffect, useState } from "react"
import MovieCard from "@/components/MovieCard"
import type { IMovie } from "@/types/movie"
import { HeartOff } from "lucide-react"
import BackToHomeButton from "@/components/BackToHomeButton"

export default function Favorites() {
    const [favorites, setFavorites] = useState<IMovie[]>([])

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const storedFavorites = localStorage.getItem('movieFavorites')
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites))
            } catch (error) {
                console.error('Failed to parse favorites:', error)
                localStorage.removeItem('movieFavorites')
            }
        }
    }, [])

    const handleRemoveFavorite = (movieId: string) => {
        const updatedFavorites = favorites.filter(movie => movie.imdbID !== movieId)
        setFavorites(updatedFavorites)
        localStorage.setItem('movieFavorites', JSON.stringify(updatedFavorites))
        // Dispatch custom event to update favorites count on other pages
        window.dispatchEvent(new Event('favoritesUpdated'))
    }

    return (
        <main className="container mx-auto px-4 py-8 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">My Favorite Movies</h1>
                    <p className="text-muted-foreground mt-2">
                        Your collection of favorite movies
                    </p>
                </div>
                <BackToHomeButton />
            </div>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <HeartOff className="h-16 w-16 text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
                    <p className="text-muted-foreground max-w-md">
                        You haven't added any movies to your favorites yet. Search for movies and click the heart icon to add them to your favorites.
                    </p>
                </div>
            )}
        </main>
    )
}