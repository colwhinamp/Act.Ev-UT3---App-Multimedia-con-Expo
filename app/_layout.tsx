import { Stack } from 'expo-router';
import { useStore } from '../src/logic/store';
import { useEffect } from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movie/[id]" options={{ title: 'Detalle' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}