import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaGoogle, FaInstagram, FaTiktok } from 'react-icons/fa';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/${provider}`;
  };

  // Dopo il login social, catturiamo token e dati utente
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userId = params.get('userId');
    const username = params.get('username');

    if (token && userId && username) {
      login({ id: userId, username }, token);
      navigate('/dashboard');
    }
  }, [login, navigate]);

  return (
    <div className="p-10 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Accedi</h2>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => handleSocialLogin('google')}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          <FaGoogle /> Google
        </button>
        <button
          onClick={() => handleSocialLogin('instagram')}
          className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
        >
          <FaInstagram /> Instagram
        </button>
        <button
          onClick={() => handleSocialLogin('tiktok')}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <FaTiktok /> TikTok
        </button>
      </div>

      <p className="text-center mb-4 text-gray-500">Oppure accedi con la tua email:</p>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded-md"
        />
        <input
          type="password"
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
