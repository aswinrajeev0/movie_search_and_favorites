import { Router } from "express";
import { favoriteIds, searchMovies, toggleFavorite } from "../controllers/movieController";

const movieRouter = Router();

movieRouter.get("/search", searchMovies);
movieRouter.put("/favorite-toggle", toggleFavorite);
movieRouter.get("/favorite-ids", favoriteIds)

export default movieRouter;