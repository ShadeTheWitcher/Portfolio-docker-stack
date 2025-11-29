import api from './api';
import { TOKEN_KEY, USER_KEY } from '../utils/constants';

// Login
export const login = async (usuario, password) => {
  const response = await api.post('/auth/login', { usuario, password });
  const { token, user } = response.data;
  
  // Guardar token y usuario en localStorage
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  
  return { token, user };
};

// Logout
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Obtener usuario actual
export const getCurrentUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// Verificar si está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

// Verificar token
export const verifyToken = async () => {
  try {
    const response = await api.post('/auth/verify');
    return response.data.valid;
  } catch (error) {
    logout();
    return false;
  }
};

// Cambiar contraseña
export const changePassword = async (currentPassword, newPassword) => {
  const response = await api.post('/auth/change-password', {
    currentPassword,
    newPassword
  });
  return response.data;
};
