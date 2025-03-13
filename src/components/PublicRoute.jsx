import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Spinner from './Spinner';

const PublicRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsAuthenticated(!!(user && token));
  }, [user]);

  if (loading) return <Spinner />;

  if (isAuthenticated) {
    console.info('✅ Utente già autenticato, reindirizzamento alla dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;

