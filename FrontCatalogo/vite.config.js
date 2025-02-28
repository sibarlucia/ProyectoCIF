import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Si la aplicación está en el dominio raíz
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/libros': 'http://localhost:3001', // Proxy para redirigir las solicitudes de '/libros' al backend
    },
    cors: true, // Habilitar CORS
    hmr: false, // Desactivar Hot Module Replacement si es necesario
    port: 3000, // Puedes configurar el puerto si es necesario
  },
})


