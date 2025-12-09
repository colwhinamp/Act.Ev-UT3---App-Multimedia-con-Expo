import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Movie } from '../models/Movie';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  movie: Movie;
  onPress: () => void;
  isFavorite: boolean;
  theme: 'light' | 'dark';
}

export const MovieCard = ({ movie, onPress, isFavorite, theme }: Props) => {
  const textColor = theme === 'dark' ? '#fff' : '#000';
  const cardBg = theme === 'dark' ? '#2c2c2c' : '#fff';

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: cardBg }]}>
      <Image source={{ uri: movie.poster }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: textColor }]}>{movie.title}</Text>
        <Text style={[styles.year, { color: textColor }]}>{movie.year} • ⭐ {movie.rating}</Text>
        {isFavorite && <Ionicons name="heart" size={20} color="red" style={{marginTop: 5}} />}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', marginBottom: 15, borderRadius: 12,
    overflow: 'hidden', elevation: 3, shadowColor: '#000',
    shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 }
  },
  image: { width: 100, height: 150, resizeMode: 'cover' },
  infoContainer: { flex: 1, padding: 12, justifyContent: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  year: { fontSize: 14, opacity: 0.7 },
});