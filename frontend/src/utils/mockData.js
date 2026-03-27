// Mock data para cuando la API no responde
export const MOCK_INFO = {
  nombre: 'Lovato',
  apellido: 'Matias',
  email: 'matii_seba_11@hotmail.com',
  telefono: '+54 9 11 1234-5678',
  linkedin: 'https://www.linkedin.com/in/lovato-matias-shade/',
  github: 'https://github.com/ShadeTheWitcher',
  descripcion: 'Desarrollador Backend con experiencia en mantenimiento, soporte y mejora continua de aplicaciones existentes. Trabajo con SAP BTP, Node.js, CAP y APIs REST, realizando correcciones, optimización de rendimiento, actualización de dependencias e integración de nuevas funcionalidades sobre sistemas ya implementados. Enfocado en la calidad del código, estabilidad y resolución eficiente de incidencias para asegurar la continuidad operativa de las aplicaciones.',
  texto_home: 'Transformo ideas en aplicaciones web robustas y escalables. Especializado en desarrollo Full Stack con React, Node.js y PostgreSQL.',
  cv_url: 'https://docs.google.com/document/d/1lz4GL4GQhoHt89mcD8jdZZVQ1HsJArGj/edit?usp=sharing&ouid=118116122822582630251&rtpof=true&sd=true',
  imagen_perfil: ''
};

export const MOCK_PROJECTS = [
  {
    id_proyect: 1,
    name_proyect: 'Portfolio Docker Stack',
    descripcion: 'Portfolio profesional desplegado con Docker stack, incluyendo frontend React, backend Node.js y base de datos PostgreSQL. Implementa autenticación JWT, panel de administración completo con Material-UI, y gestión de proyectos, tecnologías y educación. Incluye lightbox para galería de imágenes y soporte para videos de YouTube.',
    categoria_nombre: 'Web',
    tecnologias: [
      { nombre: 'React', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { nombre: 'Node.js', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { nombre: 'PostgreSQL', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { nombre: 'Docker', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { nombre: 'JavaScript', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { nombre: 'Material-UI', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
      { nombre: 'Express', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { nombre: 'Git', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
    ],
    link_github: 'https://github.com/ShadeTheWitcher/Portfolio-docker-stack',
    link_web: 'https://portfolio-demo.com',
    imagen: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    destacado: 'SI',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imagenes_adicionales: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop'
    ]
  },
  {
    id_proyect: 2,
    name_proyect: 'E-commerce Full Stack',
    descripcion: 'Plataforma de comercio electrónico completa con carrito de compras, sistema de pagos integrado con Stripe, panel de administración para gestión de productos, órdenes y usuarios. Incluye autenticación, búsqueda avanzada, filtros por categoría, y sistema de reviews. Responsive design con Material-UI.',
    categoria_nombre: 'Web',
    tecnologias: [
      { nombre: 'React', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { nombre: 'TypeScript', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { nombre: 'Material-UI', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
      { nombre: 'Node.js', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { nombre: 'Express', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { nombre: 'PostgreSQL', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { nombre: 'Docker', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' }
    ],
    link_github: 'https://github.com/ShadeTheWitcher/ecommerce-app',
    link_web: 'https://ecommerce-demo.com',
    imagen: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    destacado: 'SI',
    video_url: '',
    imagenes_adicionales: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
    ]
  },
  {
    id_proyect: 3,
    name_proyect: 'Task Manager Pro',
    descripcion: 'Gestor de tareas personal con funcionalidades avanzadas de organización, recordatorios y colaboración en equipo. Incluye tableros Kanban, etiquetas personalizables, fechas límite, prioridades, y notificaciones en tiempo real. Integración con Google Calendar.',
    categoria_nombre: 'Web',
    tecnologias: [
      { nombre: 'React', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { nombre: 'JavaScript', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { nombre: 'Node.js', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { nombre: 'Express', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { nombre: 'MongoDB', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { nombre: 'Git', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
    ],
    link_github: 'https://github.com/ShadeTheWitcher/task-manager',
    link_web: 'https://taskmanager-demo.com',
    imagen: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    destacado: 'SI',
    video_url: '',
    imagenes_adicionales: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop'
    ]
  }
];

export const MOCK_SKILLS = [
  { id: 1, nombre_tec: '.NET', nivel_nombre: 'Junior', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
  { id: 2, nombre_tec: 'C#', nivel_nombre: 'Junior', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { id: 3, nombre_tec: 'Codeigniter', nivel_nombre: 'Junior', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg' },
  { id: 4, nombre_tec: 'CSS3', nivel_nombre: 'Junior', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { id: 5, nombre_tec: 'Docker', nivel_nombre: 'Junior', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { id: 6, nombre_tec: 'Electron', nivel_nombre: 'Learning/trainee', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg' },
  { id: 7, nombre_tec: 'Express', nivel_nombre: 'Intermediate', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { id: 8, nombre_tec: 'Git', nivel_nombre: 'Intermediate', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { id: 9, nombre_tec: 'GitHub', nivel_nombre: 'Intermediate', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { id: 10, nombre_tec: 'HTML5', nivel_nombre: 'Intermediate', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { id: 11, nombre_tec: 'JavaScript', nivel_nombre: 'Intermediate', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { id: 12, nombre_tec: 'Material-UI', nivel_nombre: 'Learning/trainee', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg' },
  { id: 13, nombre_tec: 'MongoDB', nivel_nombre: 'Learning/trainee', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { id: 14, nombre_tec: 'MySQL', nivel_nombre: 'Intermediate', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { id: 15, nombre_tec: 'Next.js', nivel_nombre: 'Junior', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { id: 16, nombre_tec: 'Node.js', nivel_nombre: 'Intermediate', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { id: 17, nombre_tec: 'PHP', nivel_nombre: 'Learning/trainee', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { id: 18, nombre_tec: 'PostgreSQL', nivel_nombre: 'Intermediate', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { id: 19, nombre_tec: 'Python', nivel_nombre: 'Junior', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { id: 20, nombre_tec: 'React', nivel_nombre: 'Junior', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { id: 21, nombre_tec: 'React Native', nivel_nombre: 'Junior', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { id: 22, nombre_tec: 'SASS', nivel_nombre: 'Learning/trainee', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { id: 23, nombre_tec: 'Supabase', nivel_nombre: 'Junior', imagen: 'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg' },
  { id: 24, nombre_tec: 'TypeScript', nivel_nombre: 'Junior', imagen: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' }
];

export const MOCK_EDUCATION = [
  {
    id: 1,
    titulo: 'Licenciatura en sistemas de información',
    institucion: 'Universidad Nacional del Nordeste',
    fecha_inicio: '2021-02-01',
    fecha_fin: null,
    en_curso: 'SI',
    descripcion: 'Formación académica de grado en sistemas de información.',
    certificado_url: ''
  },
  {
    id: 2,
    titulo: 'Learn SAP® CAPM (Cloud Application Programming Model)',
    institucion: 'Udemy',
    fecha_inicio: '2025-02-01',
    fecha_fin: '2025-06-01',
    en_curso: 'NO',
    descripcion: 'Curso completo de SAP BTP de Udemy.',
    certificado_url: 'https://btnilyrlviaptbsyfwmh.supabase.co/storage/v1/object/public/documentos/sapm-uc-815de069-82aa-4bda-a6a2-b52beffeffc2-1764647775973-476851041.pdf'
  },
  {
    id: 3,
    titulo: 'Curso de Inglés A2.2',
    institucion: 'CUI-UBA',
    fecha_inicio: '2020-02-01',
    fecha_fin: '2020-12-01',
    en_curso: 'NO',
    descripcion: 'Curso intensivo de inglés nivel A2.2 con 120 horas totales. Enfoque en conversación y gramática.',
    certificado_url: 'https://btnilyrlviaptbsyfwmh.supabase.co/storage/v1/object/public/documentos/certificado-ingles-cui-uba-1764644451505-151629357.pdf'
  },
  {
    id: 4,
    titulo: 'Título Secundario',
    institucion: 'Escuela de Comercio',
    fecha_inicio: '2015-02-01',
    fecha_fin: '2020-12-01',
    en_curso: 'NO',
    descripcion: 'Economía y Administración de Empresas - Orientación en gestión empresarial y contabilidad',
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
