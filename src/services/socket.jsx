import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('🟢 Connesso al WebSocket:', socket.id);
});

socket.on('disconnect', () => {
  console.log('🔴 Disconnesso dal WebSocket');
});

export default socket;
