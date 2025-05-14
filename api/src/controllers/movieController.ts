import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { HTTP_STATUS } from "../shared/statusCodes";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../shared/messages";
import { OMDB } from "../shared/config";
import path from "path";
import fs from "fs/promises";

dotenv.config()

export const searchMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = req.query.page;
        const searchQuery = (req.query.searchQuery as string).trim();
        const pageNumber = Number(page) || 1;

        if (!pageNumber || !searchQuery) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: ERROR_MESSAGES.INVALID_INPUT
            })
            return;
        }

        const omdbResponse = await axios.get(`${OMDB.URL}/?s=${searchQuery}&page=${pageNumber}&apikey=${OMDB.API_KEY}`)
        const movies = omdbResponse.data.Search || [];
        const totalMovies = omdbResponse.data.totalResults;
        const totalPages = Math.ceil(totalMovies / 10) || 1;

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message: SUCCESS_MESSAGES.FETCH_SUCCESS,
            movies,
            totalPages
        })

    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: ERROR_MESSAGES.INTERNAL_ERROR
        })
    }
}

export const toggleFavorite = async (req: Request, res: Response): Promise<void> => {
    try {
        const clientId = req.body.clientId as string;
        const imdbID = req.body.imdbID as string;

        if (!clientId || !imdbID) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: ERROR_MESSAGES.UNAUTHORIZED
            })
            return;
        }

        const filePath = path.join(__dirname, `../../storage/favorites_${clientId}.json`);

        let favorites: string[] = [];

        try {
            const data = await fs.readFile(filePath, "utf-8");
            favorites = JSON.parse(data);
        } catch (err: any) {
            if (err.code !== "ENOENT") throw err;
        }

        const index = favorites.indexOf(imdbID);
        let message = "";

        if (index === -1) {
            favorites.push(imdbID);
            message = SUCCESS_MESSAGES.MOVIE_ADDED;
        } else {
            favorites.splice(index, 1);
            message = SUCCESS_MESSAGES.MOVIE_DELETED;
        }

        await fs.writeFile(filePath, JSON.stringify(favorites, null, 2));

        res.status(HTTP_STATUS.OK).json({
            success: true,
            message,
            data: favorites
        });

    } catch (error) {
        console.error(error)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: ERROR_MESSAGES.INTERNAL_ERROR
        });
    }
}

export const favoriteIds = async (req: Request, res: Response) => {
    try {
        const clientId = req.query.clientId as string;
        if (!clientId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: ERROR_MESSAGES.UNAUTHORIZED
            })
            return;
        }

        const filePath = path.join(__dirname, `../../storage/favorites_${clientId}.json`);

        let favorites: string[] = [];

        try {
            const data = await fs.readFile(filePath, "utf-8");
            favorites = JSON.parse(data);
        } catch (err: any) {
            if (err.code !== "ENOENT") throw err;
        }

    } catch (error) {

    }
}