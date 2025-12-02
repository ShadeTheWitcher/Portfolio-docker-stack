// Mock data para cuando la API no responde
export const MOCK_INFO = {
  nombre: 'Lovato',
  apellido: 'Matias',
  email: 'demo@ejemplo.com',
  telefono: '+1234567890',
  linkedin: 'https://linkedin.com',
  github: 'https://github.com',
  descripcion: 'Esta es información de muestra. Configura tu perfil en el panel de administración para ver tus datos reales.',
  texto_home: 'Desarrollador apasionado por crear experiencias web modernas. Esta es información de ejemplo.',
  cv_url: '',
  imagen_perfil: ''
};

export const MOCK_PROJECTS = [
  {
    id_proyect: 1,
    titulo: 'Proyecto Demo 1',
    descripcion: 'Este es un proyecto de ejemplo. Agrega tus proyectos reales desde el panel de administración.',
    tecnologias: ['React', 'Node.js', 'PostgreSQL'],
    url_repositorio: 'https://github.com',
    url_demo: '',
    imagen_principal: '',
    destacado: true,
    fecha_inicio: '2024-01-01',
    fecha_fin: null
  },
  {
    id_proyect: 2,
    titulo: 'Proyecto Demo 2',
    descripcion: 'Otro proyecto de muestra para demostrar el diseño.',
    tecnologias: ['JavaScript', 'CSS', 'HTML'],
    url_repositorio: 'https://github.com',
    url_demo: '',
    imagen_principal: '',
    destacado: true,
    fecha_inicio: '2024-02-01',
    fecha_fin: null
  },
  {
    id_proyect: 3,
    titulo: 'Proyecto Demo 3',
    descripcion: 'Tercer proyecto de ejemplo.',
    tecnologias: ['Vue.js', 'Express'],
    url_repositorio: 'https://github.com',
    url_demo: '',
    imagen_principal: '',
    destacado: true,
    fecha_inicio: '2024-03-01',
    fecha_fin: null
  }
];

export const MOCK_SKILLS = [
  { id: 1, nombre: 'JavaScript', nivel: 'Avanzado', categoria: 'Frontend' },
  { id: 2, nombre: 'React', nivel: 'Avanzado', categoria: 'Frontend' },
  { id: 3, nombre: 'Node.js', nivel: 'Intermedio', categoria: 'Backend' },
  { id: 4, nombre: 'PostgreSQL', nivel: 'Intermedio', categoria: 'Database' },
  { id: 5, nombre: 'Docker', nivel: 'Básico', categoria: 'DevOps' }
];

export const MOCK_CERTIFICATES = [
  {
    id: 1,
    titulo: 'Certificado Demo',
    institucion: 'Plataforma de Ejemplo',
    fecha_obtencion: '2024-01-01',
    url_certificado: '',
    imagen_certificado: ''
  }
];

// Componente de advertencia para datos mock
export const MockDataBanner = () => (
  <div style={{
    background: 'linear-gradient(135deg, #ff9800, #ff5722)',
    color: '#fff',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '0 4px 12px rgba(255, 152, 0, 0.3)',
    animation: 'pulse 2s infinite'
  }}>
    <i className="fas fa-exclamation-triangle" style={{ fontSize: '1.5rem' }}></i>
    <div>
      <strong style={{ display: 'block', marginBottom: '0.25rem' }}>
        Mostrando datos de muestra
      </strong>
      <span style={{ fontSize: '0.9rem', opacity: 0.95 }}>
        La API no está disponible. Estos son datos de ejemplo para demostración.
      </span>
    </div>
  </div>
);
