import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-ai.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per aggiungere automaticamente il token alle richieste
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("📡 Token attuale inviato:", token); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ Nessun token trovato nel localStorage!");
    }

    return config;
  },
  (error) => {
    console.error('❌ Errore nella richiesta API:', error);
    return Promise.reject(error);
  }
);

// Funzioni API per autenticazione
export const loginUser = async (data) => {
  try {
    const response = await API.post('/api/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('❌ Errore nel login:', error.response?.data?.message || error.message);
    throw error;
  }
};

export default API;
