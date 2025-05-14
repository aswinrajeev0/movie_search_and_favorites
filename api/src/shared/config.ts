import dotenv from "dotenv";

dotenv.config()

export const OMDB = {
    URL: process.env.OMDB_URL as string,
    API_KEY: process.env.OMDB_KEY as string
}