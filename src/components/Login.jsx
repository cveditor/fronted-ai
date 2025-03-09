import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/api'; // Import corretto

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetta eventuali errori precedenti

    try {
      const res = await loginUser({ email, password });
      console.log('📦 Risposta del server:', res.data);

      if (res.data && res.data.userId && res.data.token) {
        login({ id: res.data.userId, username: res.data.username }, res.data.token);
        navigate('/dashboard'); // Reindirizza alla dashboard
      } else {
        setError('Dati mancanti nella risposta del server.');
      }
    } catch (err) {
      console.error('❌ Errore nel login:', err.response ? err.response.data.message : err.message);
      setError(err.response?.data?.message || 'Errore durante il login. Riprova.');
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {error && <p className="bg-red-500 text-white p-2 mb-2">{error}</p>}

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
