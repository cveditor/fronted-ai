import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
 // vite.config.js
  server: {
    port: process.env.PORT || 4173,
    host: '0.0.0.0'
  }
,
});
console.log('Render PORT:', process.env.PORT); // Controlla la porta assegnata
