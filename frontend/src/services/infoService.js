import api from './api';

// Obtener información personal
export const getInfo = async () => {
  const response = await api.get('/info');
  return response.data;
};

// Actualizar información personal (requiere autenticación)
export const updateInfo = async (infoData) => {
  const response = await api.put('/info', infoData);
  return response.data;
};

// Subir CV (requiere autenticación)
export const uploadCV = async (file) => {
  const formData = new FormData();
  formData.append('cv', file);
  
  const response = await api.post('/info/cv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Descargar CV
export const downloadCV = () => {
  // Abrir en nueva pestaña
  window.open(`${api.defaults.baseURL}/info/cv`, '_blank');
};

// Eliminar CV (requiere autenticación)
export const deleteCV = async () => {
  const response = await api.delete('/info/cv');
  return response.data;
};
