import { api } from "@/api/api";
import axios from "axios";

export const getMovies = async (page: number, searchQuery: string) => {
    try {
        const response = await api.get("/movies/search", {
            params: {
                page,
                searchQuery
            }
        })
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Failed to fetch movies.";
            throw new Error(message);
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
}   