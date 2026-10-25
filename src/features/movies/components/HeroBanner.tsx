import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import type { Movie } from '../../../types/tmdb';
import { getTMDBImageUrl } from '../../../services/apiClient';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';


interface HeroBannerProps {
  movie: Movie;
  onMoreInfo?: (id: number) => void
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ movie, onMoreInfo}) => {
  const displayTitle = movie.title || movie.original_title;
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

  return (
    <div
      className='relative w-full h-[460px] md:h-[540px] rounded-3xl overflow-hidden
      mb-8 border border-white/10 shadow-2xl'
    >
      <img 
        src={getTMDBImageUrl(movie.backdrop_path, "original")} 
        alt={displayTitle}
        className='w-full h-full object-cover object-top'
      />

      <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-base/90 via-transparent to-transparent hidden md:block" />

      <div className='absolute bottom-0 right-0 p-6 md:p-10 max-w-2xl flex flex-col gap-3.5 z-10'>
        <div className='flex items-center gap-2'>
          <Badge variant='purple'>پیشنهاد ویژه امروز</Badge>
          <Badge variant='amber'>
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
            <span className="font-mono pt-0.5">{movie.vote_average.toFixed(1)}</span>
          </Badge>
          <span className='text-xs text-zinc-400 font-mono'>{releaseYear}</span>
        </div>

        <h1
          className='text-2xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md'
        >
          {displayTitle}
        </h1>

        <p className="text-zinc-300 text-sm md:text-base line-clamp-3 leading-relaxed drop-shadow">
          {movie.overview || 'خلاصه داستانی به زبان فارسی برای این فیلم ثبت نشده است.'}
        </p>

        <div className='flex items-center gap-3 pt-2'>
          <Button
            variant='primary'
            size='md'
            onClick={() => onMoreInfo?.(movie.id)}
            className='font-semibold'
          >
            <Play className='w-4 h-4 fill-white'/>
            مشاهده و پخش
          </Button>
          <Button
            variant="glass"
            size="md"
            onClick={() => onMoreInfo?.(movie.id)}
          >
            <Info className="w-4 h-4 text-zinc-300" />
            اطلاعات بیشتر
          </Button>
        </div>
      </div>
    </div>
  )
}