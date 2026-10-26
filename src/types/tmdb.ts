export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface TMDBResponse<T>{
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre{
  id: number;
  name:string;
}

export type ImageSize = 'w342' | 'w500' | 'w780' | 'original';


export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface VideoItem {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  tagline: string;
  genres: Genre[];
  credits?: {
    cast: CastMember[];
  };
  videos?: {
    results: VideoItem[];
  };
  recommendations?: TMDBResponse<Movie>;
}