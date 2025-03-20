import { createContext, useEffect, useState } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      console.log("🔄 Caricamento AuthContext...");
      console.log("📡 Token trovato:", token);
      console.log("👤 Utente trovato:", storedUser);

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`; // ✅ FIX: Aggiorna il token nelle API
      }
    } catch (error) {
      console.error('❌ Errore nel caricamento utente dal localStorage:', error);
      localStorage.removeItem('user'); 
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

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
        setUser(response.data.user); // ✅ FIX: Aggiorna lo stato dell'utente
        API.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`; // ✅ FIX: Aggiorna il token nelle API

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
    setUser(null);
    API.defaults.headers.common['Authorization'] = ''; // ✅ FIX: Rimuove il token dalle richieste API
    window.location.href = '/login'; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
