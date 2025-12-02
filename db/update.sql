-- Actualizar tabla usuario para soportar contraseñas hasheadas con bcrypt
ALTER TABLE usuario ALTER COLUMN pass TYPE VARCHAR(255);

-- Actualizar contraseña del admin (la contraseña es "admin123" hasheada con bcrypt)
-- IMPORTANTE: Cambiar esta contraseña en producción
UPDATE usuario 
SET pass = '$2a$10$rOzJw8qN9vZKZ8xGxGxGxO8xGxGxGxGxGxGxGxGxGxGxGxGxGxGxG'
WHERE usuario = 'admin';

-- Insertar proyectos de ejemplo
INSERT INTO proyecto (name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado) VALUES
('Portfolio Docker Stack', 'Portfolio profesional desplegado con Docker stack, incluyendo frontend React, backend Node.js y base de datos PostgreSQL.', 1, 'https://github.com/ShadeTheWitcher/Portfolio-docker-stack', '', 'portfolio.jpg', 'SI'),
('E-commerce App', 'Aplicación de comercio electrónico completa con carrito de compras, sistema de pagos y panel de administración.', 1, 'https://github.com/ShadeTheWitcher', '', 'ecommerce.jpg', 'SI'),
('Task Manager Pro', 'Gestor de tareas personal con funcionalidades avanzadas de organización y recordatorios.', 1, 'https://github.com/ShadeTheWitcher', '', 'taskmanager.jpg', 'NO'),
('Weather Dashboard', 'Dashboard interactivo del clima con pronósticos extendidos y mapas.', 1, 'https://github.com/ShadeTheWitcher', '', 'weather.jpg', 'NO')
ON CONFLICT DO NOTHING;

-- Insertar tecnologías de ejemplo
INSERT INTO tecnologia (nombre_tec, categoria_id, nivel_id, imagen, es_skill, baja) VALUES
('React', 2, 3, 'react.png', 'SI', 'NO'),
('Node.js', 2, 3, 'nodejs.png', 'SI', 'NO'),
('PostgreSQL', 3, 3, 'postgresql.png', 'SI', 'NO'),
('Docker', 3, 3, 'docker.png', 'SI', 'NO'),
('JavaScript', 1, 3, 'javascript.png', 'SI', 'NO'),
('Python', 1, 2, 'python.png', 'SI', 'NO'),
('Express', 2, 3, 'express.png', 'SI', 'NO'),
('Git', 3, 3, 'git.png', 'SI', 'NO')
ON CONFLICT DO NOTHING;

-- Insertar información personal de ejemplo
INSERT INTO info_laboral (cv_pdf, sobre_mi, correo, link_telegram, link_linkedin, skills, imagen_perfil) VALUES
('', 
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
