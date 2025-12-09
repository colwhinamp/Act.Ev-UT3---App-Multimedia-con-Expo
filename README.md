

# 🎬 CineApp — Proyecto Final UT3

**Desarrollado por:** Andrés Peña & Raúl Gonzalez

## 📱 Descripción

**CineApp** es una aplicación móvil multiplataforma diseñada para los amantes del cine. Permite explorar el catálogo completo de **Studio Ghibli**, gestionar una lista de favoritos y, lo más importante, crear una **colección personal** añadiendo películas propias con fotos desde la galería del dispositivo. La app cuenta con modo oscuro automático y persistencia de datos.

## 🛠️ Tecnologías Principales

Este proyecto ha sido construido utilizando el ecosistema moderno de React Native:

  * **Core:** Expo (SDK 51) + React Native.
  * **Lenguaje:** TypeScript.
  * **Navegación:** Expo Router (Navegación basada en ficheros).
  * **Estado Global:** Zustand (con middleware `persist` para guardar datos en local).
  * **Conexión API:** Axios.
  * **Hardware/Sensores:** Expo Sensors (Acelerómetro) y Expo Image Picker (Galería).
  * **Estilos:** StyleSheet estándar de React Native.

## 🚀 Instrucciones de Ejecución

Sigue estos pasos para probar la aplicación en tu entorno local:

1.  **Instalar dependencias:**
    Abre la terminal en la carpeta del proyecto y ejecuta:

    ```bash
    npm install --legacy-peer-deps
    ```

2.  **Iniciar el servidor de desarrollo:**
    Para asegurar una ejecución limpia, recomendamos limpiar la caché al iniciar:

    ```bash
    npx expo start --clear
    ```

3.  **Ejecutar en dispositivo:**

      * **Móvil físico:** Escanea el código QR con la app **Expo Go** (Android/iOS).
      * **Emulador:** Presiona la tecla `a` en la terminal para abrir en Android Studio.

## ✨ Funcionalidades Principales

1.  **Pantalla de Bienvenida:** Landing page visual con acceso único a la aplicación.
2.  **Catálogo Online:** Consumo de API real para listar películas con sus carátulas, puntuación y año.
3.  **Gestión de Favoritos:** Puedes marcar/desmarcar películas y la lista se guarda aunque cierres la app.
4.  **Creación de Contenido (Multimedia):** Formulario en "Ajustes" que permite subir una foto de la galería y crear una ficha de película personalizada.
5.  **Modo Oscuro/Claro:** Cambio de tema manual o mediante sensores.
6.  **Persistencia:** Tanto el tema elegido como las películas creadas y favoritos se guardan en `AsyncStorage`.

## 🌐 API Externa

Hemos utilizado la **Studio Ghibli API** para obtener datos reales de películas de animación.

  * **URL Base:** `https://ghibliapi.vercel.app/films`
  * **Endpoint usado:** `GET /films`
  * **Uso en la app:** Recuperamos el JSON con la lista de films, mapeamos los datos (título, descripción, imagen, rt\_score) a nuestro modelo `Movie` y los mezclamos con las películas locales del usuario en la pantalla de Inicio.

## 🔒 Permisos Solicitados

La aplicación solicita los siguientes permisos en tiempo de ejecución:

| Permiso | Justificación |
| :--- | :--- |
| **Galería (Read External Storage)** | Necesario en la pantalla de *Ajustes* para que el usuario pueda seleccionar una imagen de su móvil y usarla como portada al crear su propia película. |
| **Acelerómetro (Sensores)** | Utilizamos el sensor de movimiento para detectar cuando el usuario **agita el dispositivo** (Shake event) y alternar automáticamente entre Modo Claro y Oscuro. |
| **Internet** | Necesario para conectar con la API de Studio Ghibli y descargar las carátulas remotas. |

## 💡 Reflexión: Expo vs. Android Nativo (Jetpack Compose)

Tras realizar este proyecto y compararlo con nuestra experiencia previa en Android Studio con Jetpack Compose, destacamos:

1.  **Velocidad de Desarrollo:** Con Expo y el *Fast Refresh*, los cambios se ven al instante en el móvil sin tener que recompilar todo el proyecto (Gradle), lo cual es mucho más rápido que en Android Studio.
2.  **Navegación:** Expo Router simplifica mucho la navegación al basarse en la estructura de carpetas (`app/index`, `app/(tabs)`), mientras que en nativo hay que configurar grafos de navegación más complejos.
3.  **Gestión de Estado:** Zustand nos ha parecido más directo y con menos "boilerplate" (código repetitivo) que configurar ViewModels y LiveData/Flow en Android, especialmente para la persistencia.
4.  **Entorno:** Usar VS Code es más ligero para el ordenador que Android Studio, aunque perdemos algunas herramientas de depuración visual nativas muy potentes.
5.  **Multiplataforma:** La mayor ventaja percibida es escribir el código una vez (TypeScript) y saber que, con pocos ajustes, podría funcionar también en iOS y Web, algo que con Jetpack Compose requiere configuración extra (Compose Multiplatform).
