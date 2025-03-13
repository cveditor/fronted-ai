import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

const Onboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSocialConnect = async (platform) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      const { data } = await axios.post(`/api/auth/connect/${platform}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`${platform} collegato:`, data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Errore nel collegamento social');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Collega i tuoi social</h2>
        <p className="mb-6 text-gray-600">Connetti i tuoi account per sfruttare al massimo la tua dashboard.</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">
          <button onClick={() => handleSocialConnect('google')} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">Connetti Google</button>
          <button onClick={() => handleSocialConnect('instagram')} className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600">Connetti Instagram</button>
          <button onClick={() => handleSocialConnect('tiktok')} className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">Connetti TikTok</button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Vuoi saltare questo passaggio? <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate('/dashboard')}>Vai alla Dashboard</span>
        </p>
      </div>
    </div>
  );
};

export default Onboard;
