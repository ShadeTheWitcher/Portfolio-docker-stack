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
  async (error) => {
    const { config, response } = error;
    
    // Configuración de reintentos
    const RETRY_DELAY = 1500;
    const MAX_RETRIES = 3;

    // Condición para reintentar: Error de red o error 5xx (común durante el spin-up de Render)
    const shouldRetry = config && !config._retry && (
      !response || // Error de red (sin respuesta)
      (response.status >= 500 && response.status < 600)
    );

    if (shouldRetry) {
      config._retry = true; // Marcar como reintentado para el contador interno
      config._retryCount = (config._retryCount || 0) + 1;

      if (config._retryCount <= MAX_RETRIES) {
        // Esperar antes del siguiente intento
        const delay = RETRY_DELAY * config._retryCount;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Reintentar la petición
        return api(config);
      }
    }

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