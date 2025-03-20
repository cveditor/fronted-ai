import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://backend-ai-pxw3.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor per aggiungere automaticamente il token alle richieste
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Errore nella richiesta API:', error);
    return Promise.reject(error);
  }
);

// Interceptor per gestire errori di autenticazione
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("📡 Token attuale inviato:", token); // <-- Debug importante

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

export const registerUser = async (data) => {
  try {
    const response = await API.post('/api/auth/register', data);
    return response.data;
  } catch (error) {
    console.error('❌ Errore nella registrazione:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    console.log('📡 Invio richiesta profilo con token:', localStorage.getItem('token')); // Debug
    const response = await API.get('/api/users/profile');
    console.log('📥 Profilo utente ricevuto:', response.data); // Debug
    return response.data;
  } catch (error) {
    console.error('❌ Errore nel recupero del profilo:', error.response?.data?.message || error.message);
    return null;
  }
};


export default API;
