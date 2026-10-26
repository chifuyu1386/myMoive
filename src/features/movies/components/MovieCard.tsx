import React from 'react';
import { Star } from 'lucide-react';
import type { Movie } from '../../../types/tmdb';
import { getTMDBImageUrl } from '../../../services/apiClient';
import { Badge } from '../../../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '---';

  const displayTitle = movie.title || movie.original_title;

  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/movie/${movie.id}`);
    }
  };
  
  return (
    <div
      onClick={handleClick}
      className="group relative flex flex-col gap-2 cursor-pointer select-none transition-transform duration-300 active:scale-95"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl glass-card transition-all duration-300 group-hover:border-primary-base/50 group-hover:shadow-lg group-hover:shadow-primary-base/15">
        <img
          src={getTMDBImageUrl(movie.poster_path, 'w500')}
          alt={displayTitle}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

        <div className="absolute top-2.5 right-2.5">
          <Badge variant="amber" className="shadow-md">
            <Star className="w-3 h-3 fill-amber-400 stroke-none" />
            <span className="font-mono text-xs font-bold pt-0.5">
              {movie.vote_average.toFixed(1)}
            </span>
          </Badge>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3
          title={displayTitle}
          className="text-sm font-semibold text-zinc-100 truncate group-hover:text-primary-glow transition-colors"
        >
          {displayTitle}
        </h3>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{releaseYear}</span>
          <span className="text-[11px] text-zinc-500">سینمایی</span>
        </div>
      </div>
    </div>
  );
};