import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../src/logic/store';
import { MovieCard } from '../../src/ui/MovieCard';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, theme } = useStore();
  const bg = theme === 'dark' ? '#121212' : '#f5f5f5';
  const txt = theme === 'dark' ? '#fff' : '#000';

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {favorites.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: txt, fontSize: 16 }}>No tienes favoritos aún.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              theme={theme}
              isFavorite={true}
              onPress={() => router.push(`/movie/${item.id}`)}
            />
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});