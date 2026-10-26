import React from 'react';
import  type { CastMember } from '../../../types/tmdb';
import { getTMDBImageUrl } from '../../../services/apiClient';

interface CastListProps {
  cast: CastMember[];
}

export const CastList: React.FC<CastListProps> = ({ cast }) => {
  if (!cast.length) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
        <span className="w-2 h-5 rounded-full bg-primary-base inline-block"></span>
        بازیگران اصلی
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {cast.slice(0, 15).map((person) => (
          <div
            key={person.id}
            className="flex flex-col items-center gap-2 min-w-[90px] md:min-w-[110px] text-center"
          >
            <div className="w-18 h-18 md:w-22 md:h-22 rounded-full overflow-hidden glass-card border border-white/10 shadow-md">
              <img
                src={
                  person.profile_path
                    ? getTMDBImageUrl(person.profile_path, 'w342')
                    : 'https://placehold.co/200x200/121215/8b5cf6?text=Cast'
                }
                alt={person.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs font-semibold text-zinc-200 line-clamp-1">
              {person.name}
            </span>
            <span className="text-[11px] text-zinc-500 line-clamp-1">
              {person.character}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};