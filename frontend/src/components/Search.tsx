import type React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="relative w-full max-w-xl mx-auto mb-8">
            <Input
                type="text"
                placeholder="Search for movies..."
                className="pl-10 h-12 border-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>
    );
};
