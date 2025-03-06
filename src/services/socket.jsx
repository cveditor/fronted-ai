import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

socket.on('connect', () => {
  console.log('✅ Connesso a Socket.io:', socket.id);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnesso da Socket.io');
});

export default socket;
