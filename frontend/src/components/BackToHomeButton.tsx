import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function BackToHomeButton() {

    const navigate = useNavigate()

    return (
        <Button
            variant="outline"
            className="flex items-center gap-2 text-black"
            onClick={() => navigate(-1)}
        >
            <Home className="h-4 w-4" />
            <span>Back to Search</span>
        </Button>
    )
}