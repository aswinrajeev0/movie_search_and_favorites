import { Router } from "express";
import { favoriteIds, favorites, searchMovies, toggleFavorite } from "../controllers/movieController";

const movieRouter = Router();

movieRouter.get("/search", searchMovies);
movieRouter.put("/favorite-toggle", toggleFavorite);
movieRouter.get("/favorite-ids", favoriteIds)
movieRouter.get("/favorites", favorites)

export default movieRouter;