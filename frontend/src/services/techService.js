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
