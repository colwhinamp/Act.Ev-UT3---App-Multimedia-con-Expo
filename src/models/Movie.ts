export interface Movie {
  id: number;
  title: string;
  poster: string;
  overview: string;
  rating: number;
  year: number;
  isLocal?: boolean;
}

export interface AppState {
  movies: Movie[];
  favorites: Movie[];
  theme: 'light' | 'dark';
  isLoading: boolean;
  toggleTheme: () => void;
  loadMovies: () => Promise<void>;
  toggleFavorite: (movie: Movie) => void;
  addLocalMovie: (movie: Movie) => void;
  deleteMovie: (id: number) => void;
}