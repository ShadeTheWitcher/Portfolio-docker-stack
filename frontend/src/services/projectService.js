import api from './api';

// Obtener todos los proyectos
export const getAllProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

// Obtener proyectos destacados
export const getFeaturedProjects = async () => {
  const response = await api.get('/projects/destacados');
  return response.data;
};

// Obtener proyecto por ID
export const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

// Crear proyecto (requiere autenticación)
export const createProject = async (projectData) => {
  const response = await api.post('/projects', projectData);
  return response.data;
};

// Actualizar proyecto (requiere autenticación)
export const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

// Eliminar proyecto (requiere autenticación)
export const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

// Marcar/desmarcar como destacado (requiere autenticación)
export const toggleFeatured = async (id) => {
  const response = await api.patch(`/projects/${id}/destacar`);
  return response.data;
};
