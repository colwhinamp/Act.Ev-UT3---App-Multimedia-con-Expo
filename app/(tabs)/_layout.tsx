import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../../src/logic/store';

export default function TabLayout() {
  const { theme } = useStore();
  const isDark = theme === 'dark';
  const bg = isDark ? '#1a1a1a' : '#fff';
  const txt = isDark ? '#fff' : '#000';

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: bg },
        headerTintColor: txt,
        tabBarStyle: { backgroundColor: bg },
        tabBarActiveTintColor: '#e50914',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Películas',
          tabBarIcon: ({ color }) => <Ionicons name="film-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}