import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import socket from '../services/socket';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const Dashboard = () => {
  const [analytics, setAnalytics] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('analytics');
  const [loading, setLoading] = useState(true);
  const [trendPlatform, setTrendPlatform] = useState('instagram');
  const [trends, setTrends] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({ username: '', avatar: '', plan: 'base' });
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filter, setFilter] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
    fetchNotifications();
    fetchUserInfo();

    socket.on('newNotification', (data) => {
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
      toast.info('Nuova notifica ricevuta!');
    });

    return () => socket.off('newNotification');
  }, [filter]);

  const fetchAnalytics = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const { data } = await axios.get(`/api/analytics/user?filter=${filter}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(data);
    } catch (error) {
      toast.error('Errore nel caricamento delle analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const { data } = await axios.get('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      toast.error('Errore nel caricamento delle notifiche');
    }
  };

  const fetchUserInfo = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const { data } = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({ username: data.username, avatar: data.avatar || 'https://via.placeholder.com/40', plan: data.plan });
    } catch (error) {
      toast.error('Errore nel caricamento del profilo utente');
    }
  };

  const updatePlan = async (plan) => {
    try {
      const token = sessionStorage.getItem('token');
      const { data } = await axios.post('/api/user/update-plan', { plan }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser((prevUser) => ({ ...prevUser, plan: data.plan }));
      setSuccessMessage(`Piano aggiornato a ${data.plan}`);
      toast.success(`Piano aggiornato a ${data.plan}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      toast.error('Errore nell aggiornamento del piano');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const totalInteractions = analytics.reduce((sum, item) => sum + item.likes + item.comments + item.shares, 0);
  const avgEngagementRate = (analytics.reduce((sum, item) => sum + item.engagementRate, 0) / analytics.length) * 100 || 0;

  const barData = {
    labels: analytics.map((item) => item.platform),
    datasets: [
      { label: 'Likes', data: analytics.map((item) => item.likes), backgroundColor: '#0070BA' },
      { label: 'Commenti', data: analytics.map((item) => item.comments), backgroundColor: '#FF6384' },
      { label: 'Condivisioni', data: analytics.map((item) => item.shares), backgroundColor: '#FFCE56' },
    ],
  };

  const lineData = {
    labels: analytics.map((item) => item.platform),
    datasets: [
      {
        label: 'Engagement Rate (%)',
        data: analytics.map((item) => Math.round(item.engagementRate * 100)),
        borderColor: '#0070BA',
        backgroundColor: '#00457C',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  if (loading) return <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-20 text-2xl">Caricamento dati...</motion.p>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <aside className="w-64 bg-blue-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-8">🌟 Dashboard ({user.plan})</h1>
        <nav className="flex flex-col space-y-4">
          <button onClick={() => setActiveTab('analytics')} className="text-left p-2 rounded-lg">📊 Analytics</button>
          {user.plan !== 'base' && <button onClick={() => setActiveTab('notifications')} className="text-left p-2 rounded-lg">🔔 Notifiche ({unreadCount})</button>}
          {user.plan === 'enterprise' && <button onClick={() => setActiveTab('trends')} className="text-left p-2 rounded-lg">📈 Trend AI Avanzati</button>}
        </nav>
      </aside>

      <main className="p-10 flex-1">
        <h2 className="text-3xl font-bold mb-4">Benvenuto, {user.username}!</h2>
        <p>Piano attuale: <strong>{user.plan}</strong></p>
        <div className="my-6">
          <label>Filtro periodo: </label>
          <select onChange={(e) => setFilter(e.target.value)} value={filter} className="ml-2 p-2 border rounded">
            <option value="7d">Ultimi 7 giorni</option>
            <option value="30d">Ultimi 30 giorni</option>
          </select>
        </div>
        <ToastContainer />
      </main>
    </motion.div>
  );
};

export default Dashboard;

