import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

const ProtectedRoute = ({ children, requiredPlan }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPlan, setUserPlan] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const storedUserPlan = localStorage.getItem('userPlan');

      if (token) {
        setIsAuthenticated(true);
        setUserPlan(storedUserPlan || 'free'); // Default plan se non specificato
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Errore nel recupero dei dati:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPlan && userPlan !== requiredPlan) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
