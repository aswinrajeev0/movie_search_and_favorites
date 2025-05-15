import { Card, CardContent } from "@/components/ui/card"
import type { IMovie } from "@/types/movie"
import { Heart } from "lucide-react"
import placeholder from "@/assets/placeholder-kino.png"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toggleFavorite } from "@/services/favoriteToggle"
import { toast } from "sonner"

interface MovieCardProps {
    movie: IMovie
    isFavorite?: boolean
    onFavoriteToggle?: (imdbID: string) => void
}

export default function MovieCard({ movie, isFavorite, onFavoriteToggle }: MovieCardProps) {
    const [isFav, setIsFav] = useState(isFavorite)

    const handleFavoriteToggle = async () => {
        try {
            const response = await toggleFavorite(movie)
            if (response.success) {
                toast(response?.message || "Update success")
                if (isFav) {
                    onFavoriteToggle && onFavoriteToggle(movie.imdbID)
                }
                setIsFav(!isFav)
            } else {
                toast(response?.message || "Something went wrong")
            }
        } catch (error) {
            console.error('Failed to update favorites:', error)
        }
    }

    return (
        <Card className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg overflow-hidden transition-all hover:shadow-md hover:scale-[1.01]">
            <div className="relative aspect-[3/4] w-full">
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
                    className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 rounded-full h-6 w-6 p-1"
                    onClick={handleFavoriteToggle}
                    aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                    <Heart
                        className={`h-full w-full ${isFav ? "fill-red-500 text-red-500" : "text-white"}`}
                    />
                </Button>
            </div>
            <CardContent className="p-2 text-white">
                <h3 className="font-medium text-sm line-clamp-1">{movie.Title}</h3>
                <div className="flex justify-between items-center mt-0.5 text-xs text-gray-400">
                    <span>{movie.Year}</span>
                    <span className="text-xs">{movie.Type.toUpperCase()}</span>
                </div>
            </CardContent>
        </Card>
    )
}