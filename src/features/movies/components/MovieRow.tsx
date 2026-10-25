// src/features/movies/components/MovieRow.tsx
import React from 'react';
import type { Movie } from '../../../types/tmdb';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  loading?: boolean;
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, movies, loading = false }) => {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
          <span className="w-2 h-5 rounded-full bg-primary-base inline-block"></span>
          {title}
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="min-w-[150px] md:min-w-[190px] snap-start">
                <MovieCardSkeleton />
              </div>
            ))
          : movies.map((movie) => (
              <div key={movie.id} className="min-w-[150px] md:min-w-[190px] snap-start">
                <MovieCard movie={movie} />
              </div>
            ))}
      </div>
    </section>
  );
};