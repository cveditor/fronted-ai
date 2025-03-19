import { createContext, useEffect, useState } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('❌ Errore nel caricamento utente dal localStorage:', error);
      localStorage.removeItem('user'); // Rimuove dati corrotti
      localStorage.removeItem('token');
    }
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
      console.error('❌ Email e password sono richiesti');
      return false;
    }

    try {
      const response = await API.post('/api/auth/login', { email, password });

      console.log('📥 Risposta API login:', response.data); // Debug

      if (response.data.token && response.data.user) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
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
    sessionStorage.clear(); // Pulisce eventuali sessioni attive
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
