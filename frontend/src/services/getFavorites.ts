import { api } from "@/api/api";
import { getOrCreateClientId } from "@/utils/clientId"
import axios from "axios";

export const getFavorites = async () => {
    try {
        const clientId = getOrCreateClientId();
        const response = await api.get("/movies/favorites", {
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