import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const NotificationHistory = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('unread');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNotifications();
  }, [activeTab, currentPage]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('api/notifications/history', {
        headers: { Authorization: `Bearer ${token}` },
        params: { status: activeTab, page: currentPage, limit: 10 },
      });
      setNotifications(response.data.notifications);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Errore nel recupero delle notifiche:', error);
    }
  };

  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`api/notifications/mark-as-read/${notificationId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification
        )
      );
    } catch (error) {
      console.error('Errore nel marcare la notifica:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">Cronologia Notifiche 📲</h1>

      <div className="flex mb-6 border-b-2">
        <button
          onClick={() => { setActiveTab('unread'); setCurrentPage(1); }}
          className={`p-3 text-lg font-medium ${
            activeTab === 'unread' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'
          }`}
        >
          Non Letti
        </button>
        <button
          onClick={() => { setActiveTab('read'); setCurrentPage(1); }}
          className={`p-3 text-lg font-medium ${
            activeTab === 'read' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-500'
          }`}
        >
          Letti
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-600">Nessuna notifica disponibile.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 rounded-md cursor-pointer transition ${
                notification.isRead ? 'bg-gray-100' : 'bg-yellow-200 font-bold'
              }`}
              onClick={() => !notification.isRead && markAsRead(notification.id)}
            >
              <strong>{notification.platform}:</strong> {notification.message} <br />
              <span className="text-sm text-gray-600">
                📅 {new Date(notification.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Paginazione */}
      <div className="flex justify-between mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Indietro
        </button>

        <span>Pagina {currentPage} di {totalPages}</span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Avanti
        </button>
      </div>
    </div>
  );
};

export default NotificationHistory;
