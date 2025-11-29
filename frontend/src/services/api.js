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
      const { status } = error.response;
      
      // Solo redirigir a login si:
      // 1. Es un error 401
      // 2. NO estamos ya en la página de login
      // 3. NO es la ruta de login (para evitar loop en credenciales incorrectas)
      if (status === 401 && 
          !window.location.pathname.includes('/login') &&
          !error.config.url.includes('/auth/login')) {
        // Token inválido o expirado en una página protegida
        localStorage.removeItem(TOKEN_KEY);
        window.location.href = '/admin/login';
      }
    }
    
    // Siempre rechazar el error para que el componente lo maneje
    return Promise.reject(error);
  }
);

export default api;