import { API_URL } from './constants';

/**
 * Normaliza una URL de archivo para que funcione correctamente
 * - Si es una URL absoluta válida (http:// o https://), la devuelve tal cual
 * - Si es una ruta relativa, la concatena con la URL base del backend
 * - Si es una URL malformada (ej: https// sin :), la trata como relativa
 * 
 * @param {string} url - URL o ruta del archivo
 * @returns {string} - URL normalizada
 */
export const normalizeFileUrl = (url) => {
  if (!url) return '';
  
  // Verificar si es una URL absoluta válida (con http:// o https://)
  const isAbsoluteUrl = /^https?:\/\//i.test(url);
  
  if (isAbsoluteUrl) {
    // Es una URL absoluta válida, devolverla tal cual
    return url;
  }
  
  // Es una ruta relativa o URL malformada, concatenar con la URL base
  const baseUrl = API_URL.replace('/api', '');
  
  // Asegurar que no haya doble slash
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
  
  return `${baseUrl}${normalizedUrl}`;
};

/**
 * Verifica si una URL es absoluta y válida
 * @param {string} url - URL a verificar
 * @returns {boolean}
 */
export const isAbsoluteUrl = (url) => {
  if (!url) return false;
  return /^https?:\/\//i.test(url);
};
