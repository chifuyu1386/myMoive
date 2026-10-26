import { apiClient } from "./apiClient";
import type { Movie, TMDBResponse, Genre, MovieDetails } from "../types/tmdb";
import { TMDB_GENRES_MAP } from '../constants/genres';

export const movieService = {
  getTrending: () => {
    return apiClient<TMDBResponse<Movie>>('/trending/movie/day');
  },

  getPopular: (page: number = 1) => {
    return apiClient<TMDBResponse<Movie>>('/movie/popular', { page: page.toString() });
  },

  getTopRated: () => {
    return apiClient<TMDBResponse<Movie>>('/movie/top_rated');
  },

  getGenres: async () => {
    const res = await apiClient<{ genres: Genre[] }>('/genre/movie/list', { language: 'en-US' });
        
    const localizedGenres = res.genres.map((g) => ({
      id: g.id,
      name: TMDB_GENRES_MAP[g.id] || g.name,
    }));

    return { genres: localizedGenres };
  },

  searchMovies: (query: string, page: number = 1) => {
    return apiClient<TMDBResponse<Movie>>('/search/movie', {
        query,
        page: page.toString(),
      }
    )
  },

  getMoviesByGenre: (genreId: number, page: number = 1) => {
    return apiClient<TMDBResponse<Movie>>('/discover/movie', {
      with_genres: genreId.toString(),
      sort_by: 'popularity.desc',
      page: page.toString()
    })
  },

  getMovieDetails: async (id: number) => {
    const movieData = await apiClient<MovieDetails>(`/movie/${id}`, {
      append_to_response: 'credits,videos,recommendations',
    });

    if (!movieData.videos?.results.length) {
      try {
        const fallbackVideos = await apiClient<{ results: any[] }>(`/movie/${id}/videos`, {
          language: 'en-US',
        });
        movieData.videos = fallbackVideos;
      } catch (err) {
      }
    }

    return movieData;
  },
}