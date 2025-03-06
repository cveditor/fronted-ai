import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('https://backend-ai-pxw3.onrender.com/api/auth/register', {
        username,
        email,
        password,
      });
      setSuccess('Registrazione avvenuta con successo! Puoi effettuare il login.');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Errore durante la registrazione');
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Registrati</h2>
      {error && <p className="bg-red-500 text-white p-2 mb-2">{error}</p>}
      {success && <p className="bg-green-500 text-white p-2 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500">
          Registrati
        </button>
      </form>
    </div>
  );
};

export default Register;
