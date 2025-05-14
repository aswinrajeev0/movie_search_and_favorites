import { Card, CardContent } from "@/components/ui/card"
import type { IMovie } from "@/types/movie"
import { Heart } from "lucide-react"
import placeholder from "@/assets/placeholder-kino.png"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { toggleFavorite } from "@/services/favoriteToggle"
import { toast } from "sonner" 

interface MovieCardProps {
    movie: IMovie
    isFavorite?: boolean
    onFavoriteToggle?: () => void
}

export default function MovieCard({ movie, isFavorite, onFavoriteToggle }: MovieCardProps) {
    console.log(isFavorite)
    const [isFav, setIsFav] = useState(isFavorite)

    useEffect(() => {
        const storedFavorites = localStorage.getItem('movieFavorites')
        if (storedFavorites) {
            try {
                const favorites = JSON.parse(storedFavorites)
                const isMovieInFavorites = favorites.some((fav: IMovie) => fav.imdbID === movie.imdbID)
                setIsFav(isMovieInFavorites)
            } catch (error) {
                console.error('Failed to parse favorites:', error)
            }
        }
    }, [movie.imdbID])

    const handleFavoriteToggle = async () => {
        try {
            const response = await toggleFavorite(movie.imdbID)
            if(response.success){
                toast(response?.message || "Update success")
            }else{
                toast(response?.message || "Something went wrong")
            }
        } catch (error) {
            console.error('Failed to update favorites:', error)
        }
    }

    return (
        <Card className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative aspect-[2/3] w-full">
                <img
                    src={
                        movie.Poster && movie.Poster !== "N/A"
                            ? movie.Poster
                            : placeholder
                    }
                    alt={movie.Title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 rounded-full h-8 w-8 p-1.5"
                    onClick={handleFavoriteToggle}
                    aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                    <Heart className={`h-full w-full ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </Button>
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1">{movie.Title}</h3>
                <div className="flex justify-between items-center mt-1">
                    <span className="text-muted-foreground">{movie.Year}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{movie.Type.toUpperCase()}</p>
            </CardContent>
        </Card>
    )
}