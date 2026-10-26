// src/features/movies/components/GenreDrawer.tsx
import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, X, Check } from 'lucide-react';
import type { Genre } from '../../../types/tmdb';

interface GenreDrawerProps {
  genres: Genre[];
  selectedGenreId: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

export const GenreDrawer: React.FC<GenreDrawerProps> = ({
  genres,
  selectedGenreId,
  onSelectGenre,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  const selectedGenre = genres.find((g) => g.id === selectedGenreId);

  const handleSelect = (genreId: number | null) => {
    onSelectGenre(genreId);
    setIsOpen(false); 
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 select-none cursor-pointer ${
            selectedGenreId
              ? 'bg-primary-base/20 border border-primary-base/40 text-primary-glow purple-glow'
              : 'glass-card text-zinc-300 hover:text-white hover:border-white/20'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-primary-glow" />
          <span>
            {selectedGenre ? `ژانر: ${selectedGenre.name}` : 'فیلتر بر اساس ژانر'}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-zinc-400 font-mono">
            {selectedGenreId ? '۱' : 'همه'}
          </span>
        </button>

        {selectedGenreId && (
          <button
            onClick={() => onSelectGenre(null)}
            title="حذف فیلتر ژانر"
            className="p-2.5 rounded-2xl glass-card text-zinc-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          <div className="relative w-full max-w-lg glass-panel border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 z-10 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-6 duration-300">
            
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary-glow" />
                <h3 className="font-bold text-base md:text-lg text-white">
                  دسته‌بندی و ژانرها
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl glass-card text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>


            <div className="overflow-y-auto py-4 space-y-2 pr-1 [scrollbar-width:thin]">
              <button
                onClick={() => handleSelect(null)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-medium transition-all cursor-pointer ${
                  selectedGenreId === null
                    ? 'bg-primary-base text-white purple-glow font-bold'
                    : 'glass-card text-zinc-300 hover:bg-white/5'
                }`}
              >
                <span>همه ژانرها</span>
                {selectedGenreId === null && <Check className="w-4 h-4 stroke-[3]" />}
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {genres
                  .filter((g) => Boolean(g.name))
                  .map((genre) => {
                    const isSelected = selectedGenreId === genre.id;
                    return (
                      <button
                        key={genre.id}
                        onClick={() => handleSelect(genre.id)}
                        className={`flex items-center justify-between p-3 rounded-2xl text-xs md:text-sm font-medium transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-primary-base text-white purple-glow font-bold border border-primary-glow/60'
                            : 'glass-card text-zinc-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="truncate">{genre.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    );
                  })}
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500">
              <span>{genres.length} دسته‌بندی موجود</span>
              <button
                onClick={() => handleSelect(null)}
                className="text-primary-glow hover:underline cursor-pointer"
              >
                ریست فیلتر
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};