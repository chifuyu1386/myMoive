// src/pages/ExplorePage.tsx
import { useState, useEffect } from 'react';
import { Search, X, Film, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { movieService } from '../services/movieService';
import type { Movie, Genre } from '../types/tmdb';
import { useDebounce } from '../hooks/useDebounce';
import { MovieCard } from '../features/movies/components/MovieCard';
import { MovieCardSkeleton } from '../features/movies/components/MovieCardSkeleton';
import { GenreDrawer } from '../features/movies/components/GenreDrawer';

export const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    movieService.getGenres()
      .then((res) => setGenres(res.genres))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, selectedGenreId]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchMovies = async () => {
      try {
        let res;
        if (debouncedSearchTerm.trim()) {
          res = await movieService.searchMovies(debouncedSearchTerm, page);
        } else if (selectedGenreId !== null) {
          res = await movieService.getMoviesByGenre(selectedGenreId, page);
        } else {
          res = await movieService.getPopular(page);
        }

        if (isMounted) {
          setMovies(res.results);
          setTotalPages(Math.min(res.total_pages, 500));
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearchTerm, selectedGenreId, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, page + 5);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-xl md:text-3xl font-extrabold text-white flex items-center gap-2.5">
          <Film className="w-6 h-6 text-primary-glow" />
          کاوش و جستجوی فیلم‌ها
        </h1>
        <p className="text-sm text-zinc-400">
          فیلم مورد علاقه خود را جستجو کنید یا بر اساس ژانر دسته‌بندی نمایید.
        </p>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-zinc-400">
          <Search className="w-5 h-5 text-primary-glow" />
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="نام فیلم به فارسی یا انگلیسی..."
          className="w-full pl-12 pr-12 py-3.5 glass-panel rounded-2xl text-sm md:text-base text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-primary-base/60 focus:purple-glow transition-all"
        />

        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {!searchTerm && (
        <div className="flex items-center justify-between pt-1">
          <GenreDrawer
            genres={genres}
            selectedGenreId={selectedGenreId}
            onSelectGenre={(id) => setSelectedGenreId(id)}
          />
          <span className="text-xs font-mono text-zinc-500">
            صفحه {page} از {totalPages}
          </span>
        </div>
      )}

      <div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 20 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            <div className="flex items-center justify-center gap-1.5 md:gap-2 pt-10 pb-6 select-none overflow-x-auto">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs md:text-sm font-medium glass-card text-zinc-300 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all"
              >
                <ChevronRight className="w-4 h-4" />
                <span>قبلی</span>
              </button>

              <div className="flex items-center gap-1 md:gap-1.5">
                {getPageNumbers().map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer ${
                      page === num
                        ? 'bg-primary-base text-white purple-glow border border-primary-glow/60 shadow-lg'
                        : 'glass-card text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs md:text-sm font-medium glass-card text-zinc-300 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all"
              >
                <span>بعدی</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="glass-panel rounded-3xl p-10 flex flex-col items-center justify-center text-center space-y-3 my-8 border-dashed border-white/10">
            <div className="p-3.5 rounded-2xl bg-white/5 text-zinc-400">
              <AlertCircle className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-zinc-200">
              نتیجه‌ای یافت نشد!
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 max-w-sm">
              هیچ اثری متناسب با جستجوی شما پیدا نشد.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};