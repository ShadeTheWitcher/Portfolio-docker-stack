// Mock data para cuando la API no responde
export const MOCK_INFO = {
  nombre: 'Lovato',
  apellido: 'Matias',
  email: 'matias.lovato.dev@gmail.com',
  telefono: '+1234567890',
  linkedin: 'https://www.linkedin.com/in/lovato-matias-shade/',
  github: 'https://github.com/ShadeTheWitcher',
  descripcion: 'Esta es información de muestra. Configura tu perfil en el panel de administración para ver tus datos reales.',
  texto_home: 'Desarrollador apasionado por crear experiencias web modernas. Esta es información de ejemplo.',
  cv_url: '',
  imagen_perfil: ''
};

export const MOCK_PROJECTS = [
  {
    id_proyect: 1,
    name_proyect: 'Proyecto Demo 1',
    descripcion: 'Este es un proyecto de ejemplo. Agrega tus proyectos reales desde el panel de administración.',
    tecnologias: [
      { nombre: 'React', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { nombre: 'Node.js', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' }
    ],
    link_github: 'https://github.com',
    link_web: '',
    imagen: '',
    destacado: 'SI',
    fecha_inicio: '2024-01-01',
    fecha_fin: null
  },
  {
    id_proyect: 2,
    name_proyect: 'Proyecto Demo 2',
    descripcion: 'Otro proyecto de muestra para demostrar el diseño.',
    tecnologias: [
      { nombre: 'JavaScript', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { nombre: 'CSS', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' }
    ],
    link_github: 'https://github.com',
    link_web: '',
    imagen: '',
    destacado: 'SI',
    fecha_inicio: '2024-02-01',
    fecha_fin: null
  },
  {
    id_proyect: 3,
    name_proyect: 'Proyecto Demo 3',
    descripcion: 'Tercer proyecto de ejemplo.',
    tecnologias: [
      { nombre: 'Vue.js', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' }
    ],
    link_github: 'https://github.com',
    link_web: '',
    imagen: '',
    destacado: 'SI',
    fecha_inicio: '2024-03-01',
    fecha_fin: null
  }
];

export const MOCK_SKILLS = [
  { id: 1, nombre_tec: 'JavaScript', nivel_nombre: 'Avanzado', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { id: 2, nombre_tec: 'React', nivel_nombre: 'Avanzado', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { id: 3, nombre_tec: 'Node.js', nivel_nombre: 'Intermedio', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { id: 4, nombre_tec: 'PostgreSQL', nivel_nombre: 'Intermedio', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { id: 5, nombre_tec: 'Docker', nivel_nombre: 'Básico', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
];

export const MOCK_EDUCATION = [
  {
    id: 1,
    titulo: 'Ingeniería en Sistemas',
    institucion: 'Universidad de Ejemplo',
    fecha_inicio: '2020-01-01',
    fecha_fin: '2024-12-01',
    en_curso: 'NO',
    descripcion: 'Formación académica completa en ciencias de la computación.',
    certificado_url: ''
  },
  {
    id: 2,
    titulo: 'Full Stack Developer',
    institucion: 'Bootcamp Demo',
    fecha_inicio: '2023-01-01',
    fecha_fin: null,
    en_curso: 'SI',
    descripcion: 'Curso intensivo de desarrollo web moderno.',
    certificado_url: ''
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
        <br />
        Por favor, reinicia la página para intentar conectar nuevamente.
      </span>
    </div>
  </div>
);
