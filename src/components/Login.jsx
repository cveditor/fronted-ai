import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaGoogle, FaInstagram, FaTiktok } from 'react-icons/fa';

const Login = () => {
  const { login, socialLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="p-10 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Accedi</h2>

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

      <p className="text-center mb-4 text-gray-500">Oppure accedi con la tua email:</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-2 rounded-md"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border p-2 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition"
        >
          Accedi
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Non hai un account? <a href="/register" className="text-blue-600 hover:underline">Registrati</a>
      </p>
    </div>
  );
};

export default Login;
