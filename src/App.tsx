// src/App.tsx
import { useEffect, useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { BottomNav } from './components/layout/BottomNav';
import { MovieCard } from './features/movies/components/MovieCard';
import { MovieCardSkeleton } from './features/movies/components/MovieCardSkeleton';
import { movieService } from './services/movieService';
import type { Movie } from './types/tmdb';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    movieService.getTrending()
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pb-20 md:pb-8 flex flex-col bg-bg-base text-zinc-100">
      {/* هدر بالایی */}
      <Navbar />

      {/* محتوای اصلی */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-primary-base inline-block"></span>
            داغ‌ترین فیلم‌های امروز
          </h1>
        </div>

        {/* گرید واکنش‌گرا و موبایل‌فرست کارت‌ها */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))
            : movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => console.log('Movie clicked:', movie.id)}
                />
              ))}
        </div>
      </main>

      {/* منوی چسبان پایین موبایل */}
      <BottomNav />
    </div>
  );
}