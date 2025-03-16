import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');  // 🔹 Usa localStorage
    const userData = JSON.parse(localStorage.getItem('user'));  
    if (token && userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);  // 🔹 Salva nel localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      return true; // 🔹 Ritorna true se il login è riuscito
    } catch (err) {
      console.error('Errore nel login:', err.response?.data?.message || err.message);
      return false; // 🔹 Ritorna false in caso di errore
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
