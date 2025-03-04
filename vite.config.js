import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
 // vite.config.js
 server: {
  port: process.env.PORT || 4173,
  host: true
},
preview: {
  port: process.env.PORT || 4173,
  host: true,
  allowedHosts: ["fronted-ai.onrender.com"] // Sostituisci con il tuo dominio Render
}
,
});
console.log('Render PORT:', process.env.PORT); // Controlla la porta assegnata
