import axios from 'axios';
import { Movie } from '../models/Movie';

// API Oficial de Studio Ghibli 
const BASE_URL = 'https://ghibliapi.vercel.app/films';

export const fetchMoviesAPI = async (): Promise<Movie[]> => {
  try {
    const response = await axios.get(BASE_URL);

    // Mapeamos los datos de Ghibli a tu modelo de CineApp
    return response.data.map((item: any, index: number) => ({
      // Generamos un ID usando el índice para no romper tu interfaz
      id: 200 + index, 
      title: item.title,
      // Usamos 'image' para el poster vertical
      poster: item.image, 
      overview: item.description,
      // La API devuelve nota sobre 100, lo pasamos a sobre 10
      rating: Number(item.rt_score) / 10, 
      year: Number(item.release_date),
      isLocal: false
    }));

  } catch (error) {
    console.error(" Error grave cargando API Ghibli:", error);
    // Como pediste quitar el modo offline, aquí lanzamos el error limpio
    throw error; 
  }
};