/**
 * Calcula la experiencia freelance desde una fecha de inicio
 * @param {Date} startDate - Fecha de inicio como freelance
 * @returns {Object} - Objeto con value (número/string) y label (texto descriptivo)
 */
export const calculateFreelanceExperience = (startDate) => {
  const currentDate = new Date();
  
  const yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - startDate.getMonth();
  
  const totalMonths = yearsDiff * 12 + monthsDiff;
  
  // Si tiene menos de 1 mes, mostrar 1 mes
  if (totalMonths < 1) {
    return { value: '1', label: 'Mes Freelance' };
  }
  
  // Si tiene 12 meses o más, mostrar en años
  if (totalMonths >= 12) {
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;
    
    // Si tiene años completos sin meses extra
    if (remainingMonths === 0) {
      return { 
        value: years.toString(), 
        label: years === 1 ? 'Año Freelance' : 'Años Freelance' 
      };
    }
    
    // Si tiene años y meses, mostrar solo años con +
    return { 
      value: `${years}+`, 
      label: 'Años Freelance' 
    };
  }
  
  // Si tiene menos de 12 meses, mostrar en meses
  return { 
    value: totalMonths.toString(), 
    label: totalMonths === 1 ? 'Mes Freelance' : 'Meses Freelance' 
  };
};

/**
 * Formatea una fecha en formato legible
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Calcula la diferencia en días entre dos fechas
 * @param {Date} date1 - Primera fecha
 * @param {Date} date2 - Segunda fecha
 * @returns {number} - Diferencia en días
 */
export const getDaysDifference = (date1, date2) => {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
