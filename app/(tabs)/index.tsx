import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../src/logic/store';
import { MovieCard } from '../../src/ui/MovieCard';

export default function HomeScreen() {
  const router = useRouter();
  const { movies, favorites, loadMovies, isLoading, theme } = useStore();

  useEffect(() => {
    loadMovies();
  }, []);

  const bg = theme === 'dark' ? '#121212' : '#f5f5f5';

  if (isLoading && movies.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: bg }]}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            theme={theme}
            isFavorite={favorites.some(f => f.id === item.id)}
            onPress={() => router.push(`/movie/${item.id}`)}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});