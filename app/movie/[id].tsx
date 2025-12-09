import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { View, Text, Image, ScrollView, Button, StyleSheet, Alert } from 'react-native';
import { useStore } from '../../src/logic/store';

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { movies, toggleFavorite, favorites, deleteMovie, theme } = useStore();
  
  const movie = movies.find(m => m.id.toString() === id);
  const isFav = favorites.some(m => m.id.toString() === id);

  if (!movie) return <Text>Película no encontrada</Text>;

  const textColor = theme === 'dark' ? '#fff' : '#000';
  const bg = theme === 'dark' ? '#121212' : '#fff';

  const handleDelete = () => {
    Alert.alert("Borrar", "¿Estás seguro?", [
      { text: "Cancelar" },
      { text: "Borrar", style: "destructive", onPress: () => {
          deleteMovie(movie.id);
          router.back();
        }
      }
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>
      <Stack.Screen options={{ title: movie.title, headerBackTitle: 'Atrás' }} />
      <Image source={{ uri: movie.poster }} style={styles.poster} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>{movie.title}</Text>
        <Text style={[styles.meta, { color: textColor }]}>Año: {movie.year} | Nota: {movie.rating}</Text>
        <Text style={[styles.desc, { color: textColor }]}>{movie.overview}</Text>
        <View style={styles.actions}>
          <Button 
            title={isFav ? "Quitar de Favoritos" : "❤️ Añadir a Favoritos"} 
            onPress={() => toggleFavorite(movie)} 
          />
          <View style={{height: 10}} />
          <Button title="🗑️ Eliminar Película" color="red" onPress={handleDelete} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  poster: { width: '100%', height: 400, resizeMode: 'cover' },
  content: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  meta: { fontSize: 16, marginBottom: 20, opacity: 0.7 },
  desc: { fontSize: 16, lineHeight: 24, marginBottom: 30 },
  actions: { marginTop: 10 }
});