import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '../models/Movie';
import { fetchMoviesAPI } from '../api/movieApi';

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      movies: [],
      favorites: [],
      theme: 'light',
      isLoading: false,

      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),

      loadMovies: async () => {
        set({ isLoading: true });
        try {
          const localMovies = get().movies.filter(m => m.isLocal);
          const apiMovies = await fetchMoviesAPI();
          set({ movies: [...localMovies, ...apiMovies], isLoading: false });
        } catch (e) {
          set({ isLoading: false });
        }
      },

      toggleFavorite: (movie) => set((state) => {
        const exists = state.favorites.find((m) => m.id === movie.id);
        if (exists) {
          return { favorites: state.favorites.filter((m) => m.id !== movie.id) };
        }
        return { favorites: [...state.favorites, movie] };
      }),

      addLocalMovie: (newMovie) => set((state) => ({
        movies: [newMovie, ...state.movies]
      })),

      deleteMovie: (id) => set((state) => ({
        movies: state.movies.filter(m => m.id !== id),
        favorites: state.favorites.filter(m => m.id !== id)
      }))
    }),
    {
      name: 'cineapp-storage-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        favorites: state.favorites,
        theme: state.theme,
        movies: state.movies.filter(m => m.isLocal)
      }), 
    }
  )
);