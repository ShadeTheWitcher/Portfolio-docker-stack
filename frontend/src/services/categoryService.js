import api from './api';

// Obtener todas las categorías
export const getAllCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

// Obtener categoría por ID
export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

// Crear categoría (requiere autenticación)
export const createCategory = async (categoryData) => {
  const response = await api.post('/categories', categoryData);
  return response.data;
};

// Actualizar categoría (requiere autenticación)
export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/categories/${id}`, categoryData);
  return response.data;
};

// Eliminar categoría (requiere autenticación)
export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
