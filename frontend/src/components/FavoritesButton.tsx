import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function FavoritesButton() {

    const navigate = useNavigate()

    return (
        <Button
            variant="ghost"
            className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => navigate("/favorites")}
        >
            <span className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span className="font-medium">Favorites</span>
            </span>
        </Button>

    )
}