import api from './api';

// Obtener toda la educación
export const getAllEducation = async () => {
  const response = await api.get('/education');
  return response.data;
};

// Crear educación (requiere autenticación)
export const createEducation = async (educationData) => {
  const response = await api.post('/education', educationData);
  return response.data;
};

// Actualizar educación (requiere autenticación)
export const updateEducation = async (id, educationData) => {
  const response = await api.put(`/education/${id}`, educationData);
  return response.data;
};

// Eliminar educación (requiere autenticación)
export const deleteEducation = async (id) => {
  const response = await api.delete(`/education/${id}`);
  return response.data;
};
