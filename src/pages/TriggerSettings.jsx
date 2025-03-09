import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TriggerSettings = () => {
  const [triggers, setTriggers] = useState([]);
  const [formData, setFormData] = useState({
    platform: 'instagram',
    triggerType: 'new_follower',
    keyword: '',
    responseType: 'dm',
    responseMessage: '',
  });

  useEffect(() => {
    fetchTriggers();
  }, []);

  const fetchTriggers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('api/triggers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTriggers(response.data);
    } catch (err) {
      console.error('Errore:', err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('api/triggers', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Trigger aggiunto!');
      fetchTriggers();
      setFormData({ platform: 'instagram', triggerType: 'new_follower', keyword: '', responseType: 'dm', responseMessage: '' });
    } catch (err) {
      toast.error('Errore nel trigger.');
      console.error(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Gestisci le Automazioni ⚡</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <label>Piattaforma:</label>
        <select value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })}>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
        </select>

        <label>Risposta:</label>
        <input
          type="text"
          value={formData.responseMessage}
          onChange={(e) => setFormData({ ...formData, responseMessage: e.target.value })}
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Aggiungi Trigger
        </button>
      </form>
    </div>
  );
};

export default TriggerSettings;
