// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import { movieService } from '../services/movieService';
import type { Movie } from '../types/tmdb';
import { HeroBanner } from '../features/movies/components/HeroBanner';
import { MovieRow } from '../features/movies/components/MovieRow';
import { MovieCard } from '../features/movies/components/MovieCard';
import { MovieCardSkeleton } from '../features/movies/components/MovieCardSkeleton';
import { Skeleton } from '../components/ui/Skeleton';

export const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([movieService.getTrending(), movieService.getTopRated()])
      .then(([trendingRes, topRatedRes]) => {
        setTrendingMovies(trendingRes.results);
        setTopRatedMovies(topRatedRes.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('خطا در دریافت دیتای صفحه اصلی:', err);
        setLoading(false);
      });
  }, []);

  const heroMovie = trendingMovies[7];

  return (
    <div>
      {loading ? (
        <Skeleton className="w-full h-[460px] md:h-[540px] rounded-3xl mb-8" />
      ) : (
        heroMovie && <HeroBanner movie={heroMovie} />
      )}

      <MovieRow
        title="شاهکارهای برتر تاریخ سینما"
        movies={topRatedMovies}
        loading={loading}
      />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
            <span className="w-2 h-5 rounded-full bg-primary-base inline-block"></span>
            داغ‌ترین آثار امروز
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))
            : trendingMovies.slice(1).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </div>
      </section>
    </div>
  );
};