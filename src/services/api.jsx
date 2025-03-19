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
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('❌ Errore API:', error); // 🔍 Debug generale

    if (error.response) {
      console.log('📢 Errore risposta API:', error.response.status, error.response.data);
    } else if (error.request) {
      console.log('⚠️ Nessuna risposta dal server:', error.request);
    } else {
      console.log('🚨 Errore generico:', error.message);
    }

    if (error.response?.status === 401) {
      console.warn('🔒 Token scaduto, effettuare il logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

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
