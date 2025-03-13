import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaGoogle, FaInstagram, FaTiktok } from 'react-icons/fa';

const Register = () => {
  const { login, socialLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Errore nella registrazione');
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Registrati</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => socialLogin('google')}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          <FaGoogle /> Google
        </button>
        <button
          onClick={() => socialLogin('instagram')}
          className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
        >
          <FaInstagram /> Instagram
        </button>
        <button
          onClick={() => socialLogin('tiktok')}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <FaTiktok /> TikTok
        </button>
      </div>

      <p className="text-center mb-4 text-gray-500">Oppure registrati con la tua email:</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition"
        >
          Registrati
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Hai già un account? <a href="/login" className="text-blue-600 hover:underline">Accedi</a>
      </p>
    </div>
  );
};

export default Register;
