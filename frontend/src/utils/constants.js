// API Base URL
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Local Storage Keys
export const TOKEN_KEY = 'portfolio_admin_token';
export const USER_KEY = 'portfolio_admin_user';

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/proyectos',
  CONTACT: '/contacto',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard'
};
