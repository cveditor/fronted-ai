import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    historyApiFallback: true,
    chunkSizeWarningLimit: 1000, // 🔥 Aumenta il limite a 1000kb (puoi aumentarlo ancora se necessario)
  },
  
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    allowedHosts: ['fronted-ai.onrender.com'], // Aggiungi il tuo host 
  },
});
