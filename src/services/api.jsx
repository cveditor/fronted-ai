import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // VITE usa VITE_API_URL, non REACT_APP
  withCredentials: true,
});

// Interceptor per aggiungere automaticamente il token
API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor per gestire errori 401 (token scaduto)
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

// Funzioni per autenticazione
export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const getProfile = () => API.get('/users/profile');

export default API;
