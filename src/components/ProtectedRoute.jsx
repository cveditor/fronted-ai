import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsAuthenticated(!!(user && token));
  }, [user]);

  if (loading) return <Spinner />;

  if (!isAuthenticated) {
    console.warn('🔒 Accesso negato: utente non autenticato');
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
