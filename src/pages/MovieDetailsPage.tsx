// src/pages/MovieDetailsPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Star, Clock, Calendar, ArrowRight, Bookmark } from 'lucide-react';
import { movieService } from '../services/movieService';
import type { MovieDetails } from '../types/tmdb';
import { getTMDBImageUrl } from '../services/apiClient';
import { TMDB_GENRES_MAP } from '../constants/genres';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { CastList } from '../features/movies/components/CastList';
import { MovieRow } from '../features/movies/components/MovieRow';
import { TrailerModal } from '../components/common/TrailerModal';

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    movieService.getMovieDetails(Number(id))
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Skeleton className="w-full h-[360px] md:h-[480px] rounded-3xl" />
        <div className="flex gap-4">
          <Skeleton className="w-36 md:w-48 aspect-[2/3] rounded-2xl" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-400">اطلاعات این فیلم یافت نشد.</p>
        <Button variant="glass" className="mt-4" onClick={() => navigate(-1)}>
          بازگشت
        </Button>
      </div>
    );
  }

  const trailer = movie.videos?.results.find(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );

  const displayTitle = movie.title || movie.original_title;
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '---';
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const runtimeFormatted = movie.runtime ? `${hours} ساعت و ${minutes} دقیقه` : null;

  return (
    <div className="space-y-10 pb-10">
      <div className="relative w-full h-[360px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <img
          src={getTMDBImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
          alt={displayTitle}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base/80 via-transparent to-transparent hidden md:block" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-2xl glass-panel text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 -mt-24 md:-mt-36 relative z-10 px-2 md:px-4">
        <div className="w-36 md:w-56 shrink-0 mx-auto md:mx-0 aspect-[2/3] rounded-2xl overflow-hidden glass-panel border border-white/15 shadow-2xl">
          <img
            src={getTMDBImageUrl(movie.poster_path, 'w500')}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="amber">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
              <span className="font-mono pt-0.5">{movie.vote_average.toFixed(1)}</span>
            </Badge>

            <Badge variant="glass">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>{releaseYear}</span>
            </Badge>

            {runtimeFormatted && (
              <Badge variant="glass">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>{runtimeFormatted}</span>
              </Badge>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            {displayTitle}
          </h1>

          {movie.tagline && (
            <p className="text-xs md:text-sm text-primary-glow italic -mt-2">
              « {movie.tagline} »
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {movie.genres?.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 rounded-xl text-xs font-medium glass-card text-zinc-300"
              >
                {TMDB_GENRES_MAP[g.id] || g.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            {trailer && (
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsTrailerOpen(true)}
                className="font-semibold"
              >
                <Play className="w-4 h-4 fill-white" />
                پخش تریلر رسمی
              </Button>
            )}

            <Button variant="glass" size="md">
              <Bookmark className="w-4 h-4 text-zinc-300" />
              نشان کردن فیلم
            </Button>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-base font-bold text-zinc-200">داستان فیلم</h3>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              {movie.overview || 'خلاصه داستانی به زبان فارسی برای این اثر ثبت نشده است.'}
            </p>
          </div>
        </div>
      </div>

      {movie.credits?.cast && <CastList cast={movie.credits.cast} />}

      {movie.recommendations?.results && movie.recommendations.results.length > 0 && (
        <MovieRow
          title="آثار پیشنهادی و مشابه"
          movies={movie.recommendations.results}
        />
      )}

      <TrailerModal
        isOpen={isTrailerOpen}
        videoKey={trailer?.key || null}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
};