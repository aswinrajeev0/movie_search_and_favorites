import type { IMovie } from "@/types/movie";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SearchState {
    query: string;
    currentPage: number;
    movies: IMovie[];
    totalPages: number;
    isLoading: boolean;
    noMovieMessage: string | null;
}

const initialState: SearchState = {
    query: "",
    currentPage: 1,
    movies: [],
    totalPages: 1,
    isLoading: false,
    noMovieMessage: null,
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setMovies(state, action: PayloadAction<IMovie[]>) {
            state.movies = action.payload;
        },
        setTotalPages(state, action: PayloadAction<number>) {
            state.totalPages = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setNoMovieMessage(state, action: PayloadAction<string | null>) {
            state.noMovieMessage = action.payload;
        },
        resetSearch(state) {
            state.query = "";
            state.currentPage = 1;
            state.movies = [];
            state.totalPages = 1;
            state.isLoading = false;
            state.noMovieMessage = null;
        },
    }
})

export const {
    setQuery,
    setPage,
    setMovies,
    setTotalPages,
    setIsLoading,
    setNoMovieMessage,
    resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;