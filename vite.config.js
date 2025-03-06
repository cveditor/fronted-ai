import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Consente a Render di accedere al server
    port: process.env.PORT || 5173, // Usa la porta di Render o quella locale
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
  },
});
