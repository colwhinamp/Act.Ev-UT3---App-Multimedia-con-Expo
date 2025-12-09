import React, { useState } from 'react';
import { View, Text, Switch, Button, Image, StyleSheet, Alert, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useStore } from '../../src/logic/store';
import { useShakeSensor } from '../../src/logic/useSensors';

export default function SettingsScreen() {
  const { theme, toggleTheme, addLocalMovie } = useStore();
  const [image, setImage] = useState<string | null>(null);
  const [movieTitle, setMovieTitle] = useState(''); // Estado para el título

  // LOGICA SENSOR
  const { active, toggleSensor, data } = useShakeSensor(() => {
    toggleTheme();
    Alert.alert("¡Sensor Activado!", "Has agitado el móvil para cambiar el tema.");
  });

  // LOGICA CAMARA
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Se requiere permiso para acceder a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const createMyMovie = () => {
    if (!image) return Alert.alert("Falta imagen", "Por favor selecciona una imagen.");
    if (!movieTitle.trim()) return Alert.alert("Falta título", "Por favor escribe un nombre para la película.");
    
    const newMovie = {
      id: Date.now(),
      title: movieTitle, // Usamos el título que escribió el usuario
      poster: image,
      overview: "Película creada manualmente desde la galería personal.",
      rating: 10,
      year: new Date().getFullYear(),
      isLocal: true
    };

    addLocalMovie(newMovie);
    
    // Limpiamos el formulario
    Alert.alert("¡Éxito!", `"${movieTitle}" se ha añadido a la pantalla de inicio.`);
    setImage(null);
    setMovieTitle('');
  };

  const textColor = theme === 'dark' ? '#fff' : '#000';
  const bgColor = theme === 'dark' ? '#121212' : '#f5f5f5';
  const inputBg = theme === 'dark' ? '#333' : '#fff';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
        
        {/* SECCIÓN 1: AJUSTES */}
        <View style={styles.section}>
          <Text style={[styles.header, { color: textColor }]}>Apariencia</Text>
          <View style={styles.row}>
            <Text style={{ color: textColor }}>Modo Oscuro</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </View>
        </View>

        {/* SECCIÓN 2: CREAR PELÍCULA */}
        <View style={styles.section}>
          <Text style={[styles.header, { color: textColor }]}>Crear Película</Text>
          
          <Text style={[styles.label, { color: textColor }]}>1. Título de la película:</Text>
          <TextInput
            style={[styles.input, { backgroundColor: inputBg, color: textColor, borderColor: textColor }]}
            placeholder="Ej: Mis Vacaciones 2024"
            placeholderTextColor="gray"
            value={movieTitle}
            onChangeText={setMovieTitle}
          />

          <Text style={[styles.label, { color: textColor }]}>2. Portada:</Text>
          <Button title="Seleccionar de Galería" onPress={pickImage} />
          
          {image && (
            <View style={styles.previewContainer}>
              <Image source={{ uri: image }} style={styles.preview} />
            </View>
          )}

          <View style={styles.saveButton}>
             <Button 
               title="Guardar Película" 
               onPress={createMyMovie} 
               color="#E50914" 
               disabled={!image || !movieTitle}
             />
          </View>
        </View>

        {/* SECCIÓN 3: SENSORES */}
        <View style={styles.section}>
          <Text style={[styles.header, { color: textColor }]}>Sensores</Text>
          <Text style={{ color: textColor, marginBottom: 5 }}>Agita para cambiar tema</Text>
          <Text style={{ color: 'gray', fontSize: 12, marginBottom: 10 }}>
            X: {data.x.toFixed(2)} Y: {data.y.toFixed(2)}
          </Text>
          <Button title={active ? "Desactivar Sensor" : "Activar Sensor Shake"} onPress={toggleSensor} />
        </View>

        <View style={{height: 50}} /> 
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  section: { marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 20 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 8, marginTop: 10, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  previewContainer: { alignItems: 'center', marginVertical: 15 },
  preview: { width: 120, height: 180, borderRadius: 10, borderWidth: 2, borderColor: '#ddd' },
  saveButton: { marginTop: 10 }
});