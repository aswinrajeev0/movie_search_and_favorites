import { SearchX } from "lucide-react";

interface NoMoviesFoundProps {
    searchQuery: string;
    message?: string | null;
}

export default function NoMoviesFound({ searchQuery, message }: NoMoviesFoundProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <SearchX className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{message || `No movies found`}</h2>
            <p className="text-muted-foreground mb-4">
                {message
                    ? ""
                    : `We couldn't find any movies matching "${searchQuery}"`}
            </p>
            {!message && (
                <div className="max-w-md text-sm text-muted-foreground">
                    <p>Try adjusting your search terms or check for typos.</p>
                    <p className="mt-2">You can search by movie title, actor name, or year.</p>
                </div>
            )}
        </div>
    );
}
