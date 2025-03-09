import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import socket from '../services/socket';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const Dashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [platform, setPlatform] = useState('');
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('analytics');
  const [trends, setTrends] = useState([]);
  const [trendPlatform, setTrendPlatform] = useState('instagram');
  const [loadingTrends, setLoadingTrends] = useState(false);

  useEffect(() => {
    fetchAnalytics();
    fetchUnreadCount();
    socket.on('newNotification', (data) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => socket.off('newNotification');
  }, [startDate, endDate, platform]);

  const fetchAnalytics = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get('api/analytics/user', {
        headers: { Authorization: `Bearer ${token}` },
        params: { startDate, endDate, platform },
      });
      setAnalytics(data);
    } catch (error) {
      console.error('Errore nel caricamento delle analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get('api/notifications/count-unread', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Errore nel conteggio delle notifiche:', error);
    }
  };

  const fetchTrends = async () => {
    setLoadingTrends(true);
    try {
      const { data } = await axios.get(`api/trends?platform=${trendPlatform}`);
      setTrends(data);
    } catch (error) {
      console.error('Errore nel caricamento dei trend:', error);
    } finally {
      setLoadingTrends(false);
    }
  };

  const labels = analytics.map((item) => item.platform);
  const barData = {
    labels,
    datasets: [
      { label: 'Likes', data: analytics.map((item) => item.likes), backgroundColor: '#36A2EB' },
      { label: 'Commenti', data: analytics.map((item) => item.comments), backgroundColor: '#FF6384' },
      { label: 'Condivisioni', data: analytics.map((item) => item.shares), backgroundColor: '#FFCE56' },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Engagement Rate (%)',
        data: analytics.map((item) => Math.round(item.engagementRate * 100)),
        borderColor: '#4BC0C0',
        backgroundColor: '#C9DE00',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  if (loading) return <p className="text-center mt-20 text-2xl">Caricamento analytics...</p>;

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Dashboard Analytics 🚀</h1>

      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`p-2 rounded ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            📊 Analytics
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`p-2 rounded flex items-center gap-2 ${
              activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            🔔 Notifiche
            {unreadCount > 0 && <span className="bg-red-500 text-white rounded-full px-2 text-xs">{unreadCount}</span>}
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`p-2 rounded ${activeTab === 'trends' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            🌟 Trend AI Predictor
          </button>
        </div>
      </div>

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">📈 Interazioni</h2>
            <Bar data={barData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">📊 Engagement Rate</h2>
            <Line data={lineData} />
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">🔔 Notifiche Recenti</h2>
          {notifications.length === 0 ? (
            <p>Nessuna nuova notifica.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification, index) => (
                <li key={index} className="p-4 bg-gray-100 rounded-md">
                  <strong>{notification.platform}:</strong> {notification.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">🌟 Trend AI Predictor</h2>
          <select
            onChange={(e) => setTrendPlatform(e.target.value)}
            value={trendPlatform}
            className="p-2 border rounded-md mb-4"
          >
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
          </select>
          <button onClick={fetchTrends} className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4">
            Carica Trend
          </button>

          {loadingTrends ? (
            <p>Caricamento trend...</p>
          ) : (
            <ul className="space-y-4">
              {trends.map((item, index) => (
                <li key={index} className="p-4 bg-gray-100 rounded-md">
                  <strong>{item.trend}</strong>: {item.idea}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
