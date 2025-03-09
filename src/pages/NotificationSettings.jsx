import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    likeThreshold: 100,
    engagementRateThreshold: 0.2,
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`api/users/${userId}/notification-settings`);
        setSettings(response.data);
      } catch (error) {
        console.error('Errore nel caricamento delle impostazioni:', error);
      }
    };

    fetchSettings();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('api/users/update-notification-settings', { userId, ...settings });
      alert('Impostazioni aggiornate!');
    } catch (error) {
      console.error('Errore nell’aggiornamento delle impostazioni:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">Configura le Soglie delle Notifiche 📊</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium">Minimo di Like per Notifica</label>
          <input
            type="number"
            name="likeThreshold"
            value={settings.likeThreshold}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Engagement Rate minimo (%)</label>
          <input
            type="number"
            name="engagementRateThreshold"
            step="0.01"
            value={settings.engagementRateThreshold}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white p-3 rounded-md">Salva Impostazioni</button>
      </form>
    </div>
  );
};

export default NotificationSettings;
