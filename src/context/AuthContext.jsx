import React, { createContext, useState, useEffect } from 'react';
import axios from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userData = JSON.parse(sessionStorage.getItem('user'));
    if (token && userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify({ id: data.userId, username: data.username }));
      setUser({ id: data.userId, username: data.username });
    } catch (err) {
      console.error('Errore nel login:', err.response?.data?.message || err.message);
    }
  };

  const socialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/${provider}`;
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, socialLogin, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
