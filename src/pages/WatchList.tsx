// src/pages/WatchlistPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Trash2, CheckCircle2, Film } from 'lucide-react';
import { useWatchlistStore } from '../store/useWatchlistStore';
import { MovieCard } from '../features/movies/components/MovieCard';
import { Button } from '../components/ui/Button';

export const WatchlistPage = () => {
  const navigate = useNavigate();
  const { watchlist, clearWatchlist, toggleWatched } = useWatchlistStore();
  const [filter, setFilter] = useState<'all' | 'unwatched' | 'watched'>('all');

  const filteredMovies = watchlist.filter((movie) => {
    if (filter === 'watched') return movie.isWatched;
    if (filter === 'unwatched') return !movie.isWatched;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <h1 className="text-xl md:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Bookmark className="w-6 h-6 text-primary-glow fill-primary-glow" />
            فیلم‌های نشان‌شده من
          </h1>
          <p className="text-sm text-zinc-400">
            لیست آثاری که برای مشاهده در آینده نشان کرده‌اید.
          </p>
        </div>

        {watchlist.length > 0 && (
          <Button
            variant="glass"
            size="sm"
            onClick={clearWatchlist}
            className="text-zinc-400 hover:text-rose-400 self-start sm:self-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>پاک کردن همه</span>
          </Button>
        )}
      </div>

      {watchlist.length > 0 && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-primary-base text-white purple-glow'
                : 'glass-card text-zinc-400 hover:text-white'
            }`}
          >
            همه ({watchlist.length})
          </button>

          <button
            onClick={() => setFilter('unwatched')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all cursor-pointer ${
              filter === 'unwatched'
                ? 'bg-primary-base text-white purple-glow'
                : 'glass-card text-zinc-400 hover:text-white'
            }`}
          >
            در انتظار تماشا ({watchlist.filter((m) => !m.isWatched).length})
          </button>

          <button
            onClick={() => setFilter('watched')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all cursor-pointer ${
              filter === 'watched'
                ? 'bg-primary-base text-white purple-glow'
                : 'glass-card text-zinc-400 hover:text-white'
            }`}
          >
            دیده‌شده‌ها ({watchlist.filter((m) => m.isWatched).length})
          </button>
        </div>
      )}

      {watchlist.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4 my-10 border-dashed border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 text-zinc-400">
            <Film className="w-10 h-10 text-primary-glow" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-zinc-200">
            لیست شما در حال حاضر خالی است
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 max-w-sm">
            فیلم‌هایی که می‌خواهید بعداً ببینید را با زدن علامت بوکمارک به این بخش اضافه کنید.
          </p>
          <Button variant="primary" onClick={() => navigate('/explore')}>
            کاوش فیلم‌ها
          </Button>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="text-center py-16 text-zinc-400">
          موردی در این دسته‌بندی وجود ندارد.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="relative flex flex-col gap-2">
              <MovieCard movie={movie} />
              <button
                onClick={() => toggleWatched(movie.id)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  movie.isWatched
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'glass-card text-zinc-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{movie.isWatched ? 'دیده‌شده' : 'ندیده‌ام'}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};