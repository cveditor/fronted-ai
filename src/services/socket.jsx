import { io } from 'socket.io-client';

const token = sessionStorage.getItem('token');

const socket = io(import.meta.env.VITE_API_URL , {
  auth: { token }, // Invia il token per autenticazione
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

export default socket;
