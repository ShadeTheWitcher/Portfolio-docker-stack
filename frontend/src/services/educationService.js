import api from './api';

// Obtener toda la educación
export const getAllEducation = async () => {
  const response = await api.get('/education');
  return response.data;
};
