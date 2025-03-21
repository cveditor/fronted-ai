import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API, { getProfile } from '../services/api'; // ✅ Import corretto
import { FaGoogle, FaInstagram, FaTiktok } from 'react-icons/fa';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!email.trim() || !password.trim()) {
      setError('⚠️ Inserisci email e password.');
      return;
    }
  
    try {
      setLoading(true);
      const redirectUrl = await login(email, password); 
  
      if (redirectUrl) {
        console.log('🔄 Redirecting to:', redirectUrl);
        
        // 🔹 Assicurati che l'URL non venga concatenato in modo errato
        if (!redirectUrl.startsWith('http')) {
          navigate(redirectUrl);
        } else {
          window.location.href = redirectUrl;
        }
      } else {
        setError('Errore durante il login.');
      }
    } catch (err) {
      console.error('❌ Errore login:', err.message);
      setError('Credenziali errate.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-10 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Accedi</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-center gap-4 mb-6">
        <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
          <FaGoogle /> Google
        </button>
        <button className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition">
          <FaInstagram /> Instagram
        </button>
        <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
          <FaTiktok /> TikTok
        </button>
      </div>

      <p className="text-center mb-4 text-gray-500">Oppure accedi con la tua email:</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Accesso in corso...' : 'Accedi'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        Non hai un account? <a href="/register" className="text-blue-600 hover:underline">Registrati</a>
      </p>
    </div>
  );
};

export default Login;
