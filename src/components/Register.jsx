import React, { useState } from 'react';
import { FaGoogle, FaInstagram, FaTiktok } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    promoCode: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/${provider}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dati inviati:', formData);
    // Qui faremo la chiamata all'API per la registrazione manuale
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6">Registrati</h2>

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

      <p className="text-center mb-4">Oppure crea un account manualmente:</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
          required
        />
        <input
          type="text"
          name="promoCode"
          placeholder="Codice Promo (opzionale)"
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <p className="text-center text-sm text-gray-500">
          ✅ Prova gratuita di 7 giorni inclusa!
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition"
        >
          Registrati
        </button>
      </form>
    </div>
  );
};

export default Register;
