-- ====================================
-- SEED DATA - Datos de Prueba
-- ====================================

-- Limpiar datos existentes (excepto catálogos y usuario admin)
TRUNCATE TABLE proyecto_tecnologia CASCADE;
TRUNCATE TABLE proyecto_imagenes CASCADE;
TRUNCATE TABLE proyecto CASCADE;
TRUNCATE TABLE tecnologia CASCADE;
DELETE FROM educacion WHERE id > 0;
DELETE FROM info_laboral WHERE id > 0;

-- ====================================
-- INFORMACIÓN PERSONAL
-- ====================================

INSERT INTO info_laboral (
    nombre, 
    apellido, 
    correo, 
    telefono,
    link_linkedin, 
    link_telegram,
    github,
    sobre_mi, 
    texto_home,
    skills, 
    imagen_perfil,
    cv_url
) VALUES (
    'Lovato',
    'Matias',
    'matii_seba_11@hotmail.com',
    '+54 9 11 1234-5678',
    'https://www.linkedin.com/in/lovato-matias-shade/',
    'https://t.me/ShadeTheWitcher',
    'https://github.com/ShadeTheWitcher',
    'Desarrollador Full Stack apasionado por crear experiencias web modernas y funcionales. Con experiencia en React, Node.js y tecnologías cloud, me especializo en construir aplicaciones escalables y de alto rendimiento.

Me encanta aprender nuevas tecnologías y enfrentar desafíos técnicos complejos. Siempre busco mejorar mis habilidades y mantenerme actualizado con las últimas tendencias en desarrollo web.',
    'Transformo ideas en aplicaciones web robustas y escalables. Especializado en desarrollo Full Stack con React, Node.js y PostgreSQL.',
    'React, Node.js, Express, PostgreSQL, Docker, JavaScript, Python, Git, REST APIs, JWT, Material-UI, SCSS',
    'https://avatars.githubusercontent.com/u/yourusername',
    ''
);

-- ====================================
-- EDUCACIÓN
-- ====================================

INSERT INTO educacion (titulo, institucion, descripcion, fecha_inicio, fecha_fin, en_curso, certificado_url) VALUES
('Título Secundario', 'Escuela de Comercio', 'Economía y Administración de Empresas - Orientación en gestión empresarial y contabilidad', '2010-03', '2015-12', 'NO', ''),
('Curso de Inglés A2.2', 'CUI-UBA', 'Curso intensivo de inglés nivel A2.2 con 120 horas totales. Enfoque en conversación y gramática.', '2020-06', '2020-12', 'NO', ''),
('Desarrollo Web Full Stack', 'Argentina Programa 4.0', 'Programa intensivo de desarrollo web con React, Node.js, bases de datos y metodologías ágiles', '2023-03', '2024-12', 'NO', ''),
('Certificación Docker & Kubernetes', 'Udemy', 'Curso completo de containerización y orquestación de aplicaciones', '2024-01', '2024-03', 'NO', '');

-- ====================================
-- TECNOLOGÍAS
-- ====================================

-- Frontend
INSERT INTO tecnologia (nombre_tec, categoria_id, nivel_id, imagen, es_skill, baja) VALUES
('React', 2, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'SI', 'NO'),
('JavaScript', 1, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'SI', 'NO'),
('TypeScript', 1, 2, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 'SI', 'NO'),
('HTML5', 1, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', 'SI', 'NO'),
('CSS3', 1, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', 'SI', 'NO'),
('SASS', 2, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', 'SI', 'NO'),
('Material-UI', 2, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg', 'SI', 'NO'),

-- Backend
('Node.js', 2, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 'SI', 'NO'),
('Express', 2, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', 'SI', 'NO'),
('Python', 1, 2, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'SI', 'NO'),

-- Bases de Datos
('PostgreSQL', 3, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 'SI', 'NO'),
('MongoDB', 3, 2, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', 'SI', 'NO'),

-- DevOps & Tools
('Docker', 3, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 'SI', 'NO'),
('Git', 3, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'SI', 'NO'),
('GitHub', 3, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', 'SI', 'NO'),
('VS Code', 3, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', 'NO', 'NO'),
('Postman', 3, 3, 'https://www.svgrepo.com/show/354202/postman-icon.svg', 'NO', 'NO'),
('Nginx', 3, 2, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', 'NO', 'NO');

-- ====================================
-- PROYECTOS DE PRUEBA
-- ====================================

-- Proyecto 1: Portfolio Docker Stack (Destacado)
INSERT INTO proyecto (name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado, video_url) VALUES
(
    'Portfolio Docker Stack',
    'Portfolio profesional desplegado con Docker stack, incluyendo frontend React, backend Node.js y base de datos PostgreSQL. Implementa autenticación JWT, panel de administración completo con Material-UI, y gestión de proyectos, tecnologías y educación. Incluye lightbox para galería de imágenes y soporte para videos de YouTube.',
    1,
    'https://github.com/ShadeTheWitcher/Portfolio-docker-stack',
    'https://portfolio-demo.com',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'SI',
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
);

-- Imágenes adicionales del Portfolio
INSERT INTO proyecto_imagenes (id_proyecto, url_imagen) VALUES
(1, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop'),
(1, 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop'),
(1, 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop');

-- Tecnologías del Portfolio
INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia) VALUES
(1, 1),  -- React
(1, 2),  -- JavaScript
(1, 7),  -- Material-UI
(1, 8),  -- Node.js
(1, 9),  -- Express
(1, 11), -- PostgreSQL
(1, 13), -- Docker
(1, 14); -- Git

-- Proyecto 2: E-commerce Full Stack (Destacado)
INSERT INTO proyecto (name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado, video_url) VALUES
(
    'E-commerce Full Stack',
    'Plataforma de comercio electrónico completa con carrito de compras, sistema de pagos integrado con Stripe, panel de administración para gestión de productos, órdenes y usuarios. Incluye autenticación, búsqueda avanzada, filtros por categoría, y sistema de reviews. Responsive design con Material-UI.',
    1,
    'https://github.com/ShadeTheWitcher/ecommerce-app',
    'https://ecommerce-demo.com',
    'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    'SI',
    ''
);

INSERT INTO proyecto_imagenes (id_proyecto, url_imagen) VALUES
(2, 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'),
(2, 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop');

INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia) VALUES
(2, 1),  -- React
(2, 3),  -- TypeScript
(2, 7),  -- Material-UI
(2, 8),  -- Node.js
(2, 9),  -- Express
(2, 11), -- PostgreSQL
(2, 13); -- Docker

-- Proyecto 3: Task Manager Pro (Destacado)
INSERT INTO proyecto (name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado, video_url) VALUES
(
    'Task Manager Pro',
    'Gestor de tareas personal con funcionalidades avanzadas de organización, recordatorios y colaboración en equipo. Incluye tableros Kanban, etiquetas personalizables, fechas límite, prioridades, y notificaciones en tiempo real. Integración con Google Calendar.',
    1,
    'https://github.com/ShadeTheWitcher/task-manager',
    'https://taskmanager-demo.com',
    'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    'SI',
    ''
);

INSERT INTO proyecto_imagenes (id_proyecto, url_imagen) VALUES
(3, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop'),
(3, 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop');

INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia) VALUES
(3, 1),  -- React
(3, 2),  -- JavaScript
(3, 8),  -- Node.js
(3, 9),  -- Express
(3, 12), -- MongoDB
(3, 14); -- Git

-- Proyecto 4: Weather Dashboard
INSERT INTO proyecto (name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado, video_url) VALUES
(
    'Weather Dashboard',
    'Dashboard interactivo del clima con pronósticos extendidos, mapas meteorológicos y alertas en tiempo real. Integración con OpenWeatherMap API. Incluye gráficos de temperatura, humedad y precipitaciones. Geolocalización automática y búsqueda por ciudad.',
    1,
    'https://github.com/ShadeTheWitcher/weather-dashboard',
    'https://weather-demo.com',
    'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
    'NO',
    ''
);

INSERT INTO proyecto_imagenes (id_proyecto, url_imagen) VALUES
(4, 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop');

INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia) VALUES
(4, 1),  -- React
(4, 2),  -- JavaScript
(4, 6),  -- SASS
(4, 14); -- Git

-- Proyecto 5: Social Media Analytics
INSERT INTO proyecto (name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado, video_url) VALUES
(
    'Social Media Analytics',
    'Herramienta de análisis de redes sociales con métricas detalladas, gráficos interactivos y reportes automatizados. Integración con APIs de Twitter, Instagram y Facebook. Dashboard con visualizaciones en tiempo real usando Chart.js. Exportación de reportes en PDF.',
    1,
    'https://github.com/ShadeTheWitcher/social-analytics',
    '',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    'NO',
    ''
);

INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia) VALUES
(5, 1),  -- React
(5, 3),  -- TypeScript
(5, 8),  -- Node.js
(5, 11), -- PostgreSQL
(5, 13); -- Docker

-- Proyecto 6: Blog Platform
INSERT INTO proyecto (name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado, video_url) VALUES
(
    'Blog Platform CMS',
    'Plataforma de blogs con editor Markdown, sistema de comentarios, categorías y tags. Panel de administración para gestión de posts, usuarios y comentarios. SEO optimizado con meta tags dinámicos. Sistema de búsqueda full-text.',
    1,
    'https://github.com/ShadeTheWitcher/blog-platform',
    'https://blog-demo.com',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
    'NO',
    ''
);

INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia) VALUES
(6, 1),  -- React
(6, 2),  -- JavaScript
(6, 8),  -- Node.js
(6, 9),  -- Express
(6, 11); -- PostgreSQL

-- ====================================
-- RESETEAR SECUENCIAS
-- ====================================

SELECT setval('educacion_id_seq', (SELECT MAX(id) FROM educacion));
SELECT setval('tecnologia_id_seq', (SELECT MAX(id) FROM tecnologia));
SELECT setval('proyecto_id_proyect_seq', (SELECT MAX(id_proyect) FROM proyecto));
SELECT setval('proyecto_imagenes_id_seq', (SELECT MAX(id) FROM proyecto_imagenes));
SELECT setval('info_laboral_id_seq', (SELECT MAX(id) FROM info_laboral));

-- Verificar datos insertados
SELECT 'Proyectos insertados:' as mensaje, COUNT(*) as total FROM proyecto;
SELECT 'Tecnologías insertadas:' as mensaje, COUNT(*) as total FROM tecnologia;
SELECT 'Educación insertada:' as mensaje, COUNT(*) as total FROM educacion;
SELECT 'Info laboral insertada:' as mensaje, COUNT(*) as total FROM info_laboral;
