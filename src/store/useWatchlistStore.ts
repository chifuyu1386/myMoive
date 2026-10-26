import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie } from '../types/tmdb';

export interface WatchlistMovie extends Movie {
  isWatched: boolean;
  addedAt: string;
}

interface WatchlistState {
  watchlist: WatchlistMovie[];
  toggleWatchlist: (movie: Movie) => void;
  toggleWatched: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      watchlist: [],

      toggleWatchlist: (movie) => {
        const current = get().watchlist;
        const exists = current.some((m) => m.id === movie.id);

        if (exists) {
          set({ watchlist: current.filter((m) => m.id !== movie.id) });
        } else {
          const newItem: WatchlistMovie = {
            ...movie,
            isWatched: false,
            addedAt: new Date().toISOString(),
          };
          set({ watchlist: [newItem, ...current] });
        }
      },

      toggleWatched: (id) => {
        set({
          watchlist: get().watchlist.map((m) =>
            m.id === id ? { ...m, isWatched: !m.isWatched } : m
          ),
        });
      },

      isInWatchlist: (id) => {
        return get().watchlist.some((m) => m.id === id);
      },

      clearWatchlist: () => {
        set({ watchlist: [] });
      },
    }),
    {
      name: 'mymovie-watchlist-storage',
    }
  )
);