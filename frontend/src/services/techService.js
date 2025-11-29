import api from './api';

// Obtener todas las tecnologías
export const getAllTechnologies = async () => {
  const response = await api.get('/technologies');
  return response.data;
};

// Obtener solo skills
export const getSkills = async () => {
  const response = await api.get('/technologies/skills');
  return response.data;
};

// Obtener categorías
export const getCategories = async () => {
  const response = await api.get('/technologies/categories');
  return response.data;
};

// Obtener niveles
export const getLevels = async () => {
  const response = await api.get('/technologies/levels');
  return response.data;
};

// Crear tecnología (requiere autenticación)
export const createTechnology = async (technologyData) => {
  const response = await api.post('/technologies', technologyData);
  return response.data;
};

// Actualizar tecnología (requiere autenticación)
export const updateTechnology = async (id, technologyData) => {
  const response = await api.put(`/technologies/${id}`, technologyData);
  return response.data;
};

// Eliminar tecnología (requiere autenticación)
export const deleteTechnology = async (id) => {
  const response = await api.delete(`/technologies/${id}`);
  return response.data;
};
