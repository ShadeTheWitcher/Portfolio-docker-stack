// Mock data para cuando la API no responde
export const MOCK_INFO = {
  nombre: 'Lovato',
  apellido: 'Matias',
  email: 'matias.lovato.dev@gmail.com',
  telefono: '+1234567890',
  linkedin: 'https://www.linkedin.com/in/lovato-matias-shade/',
  github: 'https://github.com/ShadeTheWitcher',
  descripcion: 'Desarrollador Backend con experiencia en mantenimiento, soporte y mejora continua de aplicaciones existentes. Trabajo con SAP BTP, Node.js, CAP y APIs REST, realizando correcciones, optimización de rendimiento, actualización de dependencias e integración de nuevas funcionalidades sobre sistemas ya implementados. Enfocado en la calidad del código, estabilidad y resolución eficiente de incidencias para asegurar la continuidad operativa de las aplicaciones.',
  texto_home: 'Desarrollador apasionado por crear experiencias web modernas. Esta es información de ejemplo.',
  cv_url: '',
  imagen_perfil: ''
};

export const MOCK_PROJECTS = [
  {
    id_proyect: 1,
    name_proyect: 'Portfolio Docker Stack',
    descripcion: 'Portfolio profesional desplegado con Docker stack, incluyendo frontend React, backend Node.js y base de datos PostgreSQL. Implementa autenticación JWT, panel de administración completo con Material-UI, y gestión de proyectos, tecnologías y educación.',
    categoria_nombre: 'Web',
    tecnologias: [
      { nombre: 'React', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { nombre: 'Node.js', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { nombre: 'PostgreSQL', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { nombre: 'Docker', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
    ],
    link_github: 'https://github.com/ShadeTheWitcher/Portfolio-docker-stack',
    link_web: 'https://portfolio-demo.com',
    imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    destacado: 'SI',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imagenes_adicionales: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop'
    ]
  },
  {
    id_proyect: 2,
    name_proyect: 'E-commerce App',
    descripcion: 'Plataforma de comercio electrónico con carrito de compras, pagos integrados y panel de administración.',
    categoria_nombre: 'Web',
    tecnologias: [
      { nombre: 'React', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { nombre: 'Firebase', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' }
    ],
    link_github: 'https://github.com',
    link_web: '',
    imagen: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    destacado: 'SI',
    imagenes_adicionales: []
  },
  {
    id_proyect: 3,
    name_proyect: 'Task Manager XP',
    descripcion: 'Gestor de tareas avanzado con tableros kanban y notificaciones en tiempo real.',
    categoria_nombre: 'Escritorio',
    tecnologias: [
      { nombre: 'JavaScript', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { nombre: 'Electron', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg' }
    ],
    link_github: 'https://github.com',
    link_web: '',
    imagen: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    destacado: 'SI',
    imagenes_adicionales: []
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
