import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    // replace evita que el usuario pueda volver atrás a la bienvenida
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      

      <View style={styles.content}>
        <Text style={styles.title}>CineApp 🎬</Text>
        <Text style={styles.subtitle}>
          Organiza tus películas favoritas y crea tu propia colección personal.
        </Text>

        <Pressable style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>INICIAR</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  imageContainer: { ...StyleSheet.absoluteFillObject, opacity: 0.6 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)' }, // Oscurece la foto
  content: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    padding: 30, 
    paddingBottom: 50 
  },
  title: { 
    fontSize: 48, 
    fontWeight: 'bold', 
    color: '#fff', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 18, 
    color: '#ddd', 
    textAlign: 'center', 
    marginBottom: 40,
    lineHeight: 24
  },
  button: {
    backgroundColor: '#ff0505ff', // Rojo Netflix
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 }
});