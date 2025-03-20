import { createContext, useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Per gestire il redirect

  // 📡 Caricamento utente dal localStorage
  useEffect(() => {
    try {
      console.log("🔄 Caricamento AuthContext...");
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("✅ Utente autenticato:", parsedUser);
      } else {
        console.warn("⚠️ Nessun utente trovato, logout forzato.");
        logout(); // Se non c'è l'utente, forziamo il logout
      }
    } catch (error) {
      console.error('❌ Errore nel caricamento utente:', error);
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔑 Funzione di login
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
        API.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        const redirectUrl = response.data.redirectUrl || '/dashboard';
        console.log('🔄 Redirecting to:', redirectUrl);
        navigate(redirectUrl); // ✅ Redirect con React Router

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

  // 🚪 Funzione di logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    API.defaults.headers.common['Authorization'] = '';
    navigate('/login'); // ✅ Redirect sicuro al login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
