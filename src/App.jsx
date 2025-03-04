import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './pages/Profile';
import PaymentSuccess from './pages/PaymentSuccess';
import NotificationSettings from './pages/NotificationSettings';
import NotificationHistory from './pages/NotificationHistory';
import NotFound from './pages/NotFound';
import AccessDenied from './pages/AccessDenied';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="max-w-7xl mx-auto p-8">
          <Suspense fallback={<div className="text-center p-20">Caricamento...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="*" element={<NotFound />} />

              {/* Rotte protette */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><NotificationSettings /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationHistory /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
