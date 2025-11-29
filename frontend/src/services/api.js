import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../utils/constants';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar token JWT a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      const { status, data } = error.response;
      
      if (status === 401) {
        // Token inválido o expirado
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = '/admin/login';
      }
      
      // Retornar mensaje de error del servidor
      return Promise.reject(new Error(data.message || data.error || 'Error del servidor'));
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      return Promise.reject(new Error('No se pudo conectar con el servidor'));
    } else {
      // Algo pasó al configurar la petición
      return Promise.reject(error);
    }
  }
);

export default api;
