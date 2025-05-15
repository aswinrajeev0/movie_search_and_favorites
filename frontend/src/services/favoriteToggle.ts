import { api } from "@/api/api"
import type { IMovie } from "@/types/movie";
import { getOrCreateClientId } from "@/utils/clientId";
import axios from "axios";

export const toggleFavorite = async (movie: IMovie) => {
    const clientId = getOrCreateClientId();
    try {
        const response = await api.put("/movies/favorite-toggle", {
            clientId,
            movie
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

export const getFavoriteIds = async () => {
    const clientId = getOrCreateClientId()
    try {
        const response = await api.get("/movies/favorite-ids", {
            params: {
                clientId
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