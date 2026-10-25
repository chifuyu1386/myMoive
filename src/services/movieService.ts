import { apiClient } from "./apiClient";
import type { Movie, TMDBResponse, Genre } from "../types/tmdb";


export const movieService = {
  getTrending: () => {
    return apiClient<TMDBResponse<Movie>>('/trending/movie/day');
  },

  getPopular: (page: number = 1) => {
    return apiClient<TMDBResponse<Movie>>('/movie/popular', { page: page.toString() });
  },

  getGenres: () => {
    return apiClient<{ genres: Genre[] }>('/genre/movie/list');
  }
}