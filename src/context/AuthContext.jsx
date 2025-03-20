import { createContext, useEffect, useState } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null); // Stato per WebSocket

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      console.log("🔄 Caricamento AuthContext...");
      console.log("📡 Token trovato:", token);
      console.log("👤 Utente trovato:", storedUser);

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('❌ Errore nel caricamento utente dal localStorage:', error);
      localStorage.removeItem('user'); 
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Connetti WebSocket solo quando l'utente è autenticato
  useEffect(() => {
    if (user) {
      console.log('📡 Connessione al WebSocket...');
      const newSocket = new WebSocket(`wss://backend-ai-pxw3.onrender.com/socket.io/?EIO=4&transport=websocket&token=${localStorage.getItem('token')}`);

      newSocket.onopen = () => console.log('✅ WebSocket connesso!');
      newSocket.onerror = (error) => console.error('❌ Errore WebSocket:', error);
      newSocket.onclose = () => console.warn('⚠️ WebSocket chiuso.');

      setSocket(newSocket);

      return () => newSocket.close(); // Chiudi WebSocket quando l'utente si disconnette
    }
  }, [user]); 

  const login = async (email, password) => {
    if (!email || !password) {
      console.error('❌ Email e password sono richiesti');
      return false;
    }
  
    try {
      const response = await API.post('/api/auth/login', { email, password });
  
      console.log('📥 Risposta API login:', response.data);
  
      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
  
        console.log('🔄 Redirecting to:', response.data.redirectUrl || '/dashboard');
        window.location.href = response.data.redirectUrl || '/dashboard'; // 🔄 Redirect sicuro

        return true;
      } else {
        console.error('❌ Errore login: token o user non ricevuti');
        return false;
      }
    } catch (error) {
      console.error('❌ Errore login:', error.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    setUser(null);
    if (socket) {
      socket.close(); // Chiude WebSocket
    }
    window.location.href = '/login'; // 🔄 Redirect al login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
