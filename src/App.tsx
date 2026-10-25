// src/App.tsx
import { useEffect, useState } from 'react';
import { movieService } from './services/movieService';
import type { Movie } from './types/tmdb';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    movieService.getTrending()
      .then((data) => {
        setMovies(data.results.slice(0, 5)); // فقط ۵ تای اول برای تست
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-primary-base mb-6 purple-glow">
        پروژه مای‌مووی (myMovie)
      </h1>

      {loading ? (
        <p className="text-zinc-400">در حال دریافت فیلم‌ها از TMDB...</p>
      ) : (
        <div className="glass-panel p-6 rounded-2xl w-full max-w-md space-y-4">
          <h2 className="text-xl font-semibold border-b border-white/10 pb-2">ترندهای امروز به فارسی:</h2>
          <ul className="space-y-2">
            {movies.map((m) => (
              <li key={m.id} className="text-zinc-300 flex justify-between">
                <span>{m.title || m.original_title}</span>
                <span className="text-amber-400 font-mono">★ {m.vote_average.toFixed(1)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}