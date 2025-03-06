import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Aggiunto stato per l'errore
  const [success, setSuccess] = useState(''); // Aggiunto stato per il successo
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data.user, res.data.token);
      setSuccess('Login effettuato con successo!');
      navigate('/dashboard'); // Reindirizza alla dashboard
    } catch (err) {
      setError('Email o password non corretti');
      console.error('Errore nel login:', err);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {/* Messaggi di feedback */}
      {error && <p className="bg-red-500 text-white p-2 mb-2">{error}</p>}
      {success && <p className="bg-green-500 text-white p-2 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
