-- Insertar proyectos de ejemplo
INSERT INTO proyecto (name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado) VALUES
('Portfolio Docker Stack', 'Portfolio profesional desplegado con Docker stack, incluyendo frontend React, backend Node.js y base de datos PostgreSQL.', 1, 'https://github.com/ShadeTheWitcher/Portfolio-docker-stack', '', 'https://via.placeholder.com/400x300/1a1a1a/ff0077?text=Portfolio', 'SI'),
('E-commerce App', 'Aplicación de comercio electrónico completa con carrito de compras, sistema de pagos y panel de administración.', 1, 'https://github.com/ShadeTheWitcher', '', 'https://via.placeholder.com/400x300/1a1a1a/7700ff?text=E-commerce', 'SI'),
('Task Manager Pro', 'Gestor de tareas personal con funcionalidades avanzadas de organización, recordatorios y colaboración en equipo.', 1, 'https://github.com/ShadeTheWitcher', '', 'https://via.placeholder.com/400x300/1a1a1a/00d9ff?text=Task+Manager', 'NO'),
('Weather Dashboard', 'Dashboard interactivo del clima con pronósticos extendidos, mapas y alertas meteorológicas en tiempo real.', 1, 'https://github.com/ShadeTheWitcher', '', 'https://via.placeholder.com/400x300/1a1a1a/ff0077?text=Weather', 'SI'),
('Social Media Analytics', 'Herramienta de análisis de redes sociales con métricas detalladas, gráficos y reportes automatizados.', 1, 'https://github.com/ShadeTheWitcher', '', 'https://via.placeholder.com/400x300/1a1a1a/7700ff?text=Analytics', 'NO');

-- Insertar tecnologías de ejemplo
INSERT INTO tecnologia (nombre_tec, categoria_id, nivel_id, imagen, es_skill, baja) VALUES
('React', 2, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 'SI', 'NO'),
('Node.js', 2, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 'SI', 'NO'),
('PostgreSQL', 3, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', 'SI', 'NO'),
('Docker', 3, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 'SI', 'NO'),
('JavaScript', 1, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 'SI', 'NO'),
('Python', 1, 2, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 'SI', 'NO'),
('Express', 2, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', 'SI', 'NO'),
('Git', 3, 3, 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', 'SI', 'NO')
ON CONFLICT DO NOTHING;

-- Insertar información personal de ejemplo
INSERT INTO info_laboral (cv_pdf, sobre_mi, correo, link_telegram, link_linkedin, skills, imagen_perfil) VALUES
(NULL, 
'Desarrollador Full Stack apasionado por crear experiencias web modernas y funcionales. Con experiencia en React, Node.js y tecnologías cloud, me especializo en construir aplicaciones escalables y de alto rendimiento.

Me encanta aprender nuevas tecnologías y enfrentar desafíos técnicos complejos. Siempre busco mejorar mis habilidades y mantenerme actualizado con las últimas tendencias en desarrollo web.', 
'matii_seba_11@hotmail.com', 
'https://t.me/ShadeTheWitcher', 
'https://www.linkedin.com/in/lovato-matias-shade/', 
'React, Node.js, Express, PostgreSQL, Docker, JavaScript, Python, Git, REST APIs, JWT', 
'')
ON CONFLICT DO NOTHING;

-- Resetear secuencias
SELECT setval('proyecto_id_proyect_seq', (SELECT COALESCE(MAX(id_proyect), 1) FROM proyecto));
SELECT setval('tecnologia_id_seq', (SELECT COALESCE(MAX(id), 1) FROM tecnologia));
SELECT setval('info_laboral_id_seq', (SELECT COALESCE(MAX(id), 1) FROM info_laboral));
