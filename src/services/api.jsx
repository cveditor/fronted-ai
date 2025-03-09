import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
// Notifiche
export const getUnreadNotifications = () => API.get('api/notifications/history?status=unread');
export const getNotificationHistory = (page = 1, limit = 10) => 
  API.get(`api/notifications/history?page=${page}&limit=${limit}`);

// Analytics
export const getUserAnalytics = (startDate, endDate, platform) => 
  API.get(`api/analytics/user?startDate=${startDate}&endDate=${endDate}&platform=${platform}`);

export const loginUser = (data) => API.post('api/auth/login', data);
export const registerUser = (data) => API.post('api/auth/register', data);
export const getProfile = () => API.get('api/users/profile');

export default API;
