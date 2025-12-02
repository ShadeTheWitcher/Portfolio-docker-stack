-- ====================================
-- PORTFOLIO DATABASE SCHEMA - SUPABASE
-- ====================================
-- Adaptado de init.sql para Supabase con Row Level Security (RLS)

-- ====================================
-- TABLAS DE CATÁLOGOS
-- ====================================

-- Categorías de Tecnologías
CREATE TABLE IF NOT EXISTS categoriatec (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(30) NOT NULL
);

INSERT INTO categoriatec (id, descripcion) VALUES
(1, 'Lenguajes de programación'),
(2, 'FRAMEWORKS Y LIBRERÍAS'),
(3, 'SOFTWARE Y HERRAMIENTAS')
ON CONFLICT (id) DO NOTHING;

-- Niveles de Tecnologías
CREATE TABLE IF NOT EXISTS nivel_tecnologia (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL
);

INSERT INTO nivel_tecnologia (id, nombre) VALUES
(1, 'Learning/trainee'),
(2, 'Junior'),
(3, 'Intermediate'),
(4, 'Advanced')
ON CONFLICT (id) DO NOTHING;

-- Tipos de Proyecto (Categorías)
CREATE TABLE IF NOT EXISTS tipo_proyecto (
  id_categoria SERIAL PRIMARY KEY,
  descripcion VARCHAR(30) NOT NULL
);

INSERT INTO tipo_proyecto (id_categoria, descripcion) VALUES
(1, 'Web'),
(2, 'Desktop')
ON CONFLICT (id_categoria) DO NOTHING;

-- Tipos de Usuario
CREATE TABLE IF NOT EXISTS tipo_usuario (
  id_tipo SERIAL PRIMARY KEY,
  descripcion VARCHAR(20) NOT NULL
);

INSERT INTO tipo_usuario (id_tipo, descripcion) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'extra')
ON CONFLICT (id_tipo) DO NOTHING;

-- ====================================
-- TABLA DE USUARIOS
-- ====================================

CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL PRIMARY KEY,
  usuario VARCHAR(25) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  perfil_id INTEGER NOT NULL,
  baja VARCHAR(2) NOT NULL DEFAULT 'NO',
  email VARCHAR(100) DEFAULT '',
  nombre VARCHAR(50) DEFAULT '',
  apellido VARCHAR(50) DEFAULT '',
  CONSTRAINT usuario_ibfk_1 FOREIGN KEY (perfil_id) REFERENCES tipo_usuario (id_tipo) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Usuario admin por defecto (contraseña: admin123)
INSERT INTO usuario (id, usuario, pass, perfil_id, baja, email, nombre, apellido) VALUES
(9, 'admin', '$2a$10$f715RzKc6B2r/wK9WmBwM./11oJ0QVU5v/D9gYPCbrRqjqmehWS6q', 1, 'NO', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- ====================================
-- TABLA DE INFORMACIÓN PERSONAL
-- ====================================

CREATE TABLE IF NOT EXISTS info_laboral (
  id SERIAL PRIMARY KEY,
  cv_pdf BYTEA DEFAULT NULL,
  sobre_mi TEXT DEFAULT NULL,
  correo VARCHAR(100) DEFAULT NULL,
  link_telegram VARCHAR(150) DEFAULT NULL,
  link_linkedin VARCHAR(250) DEFAULT NULL,
  skills TEXT DEFAULT NULL,
  imagen_perfil VARCHAR(250) DEFAULT NULL,
  nombre VARCHAR(100) DEFAULT NULL,
  apellido VARCHAR(100) DEFAULT NULL,
  telefono VARCHAR(50) DEFAULT NULL,
  github VARCHAR(250) DEFAULT NULL,
  cv_url VARCHAR(500) DEFAULT NULL,
  texto_home TEXT DEFAULT NULL
);

-- ====================================
-- TABLA DE EDUCACIÓN
-- ====================================

CREATE TABLE IF NOT EXISTS educacion (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  institucion VARCHAR(200) NOT NULL,
  descripcion TEXT,
  fecha_inicio VARCHAR(7),
  fecha_fin VARCHAR(7),
  en_curso VARCHAR(2) DEFAULT 'NO',
  certificado_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO educacion (titulo, institucion, descripcion, fecha_inicio, fecha_fin, en_curso) VALUES
('Título Secundario', 'Escuela de Comercio', 'Economía y Administración de Empresas', '2010-03', '2015-12', 'NO'),
('Curso de Inglés A2.2', 'CUI-UBA', 'Curso intensivo de inglés nivel A2.2 con 120 horas totales', '2020-06', '2020-12', 'NO')
ON CONFLICT DO NOTHING;

-- ====================================
-- TABLA DE TECNOLOGÍAS
-- ====================================

CREATE TABLE IF NOT EXISTS tecnologia (
  id SERIAL PRIMARY KEY,
  nombre_tec VARCHAR(50) NOT NULL,
  categoria_id INTEGER DEFAULT NULL,
  nivel_id INTEGER DEFAULT NULL,
  imagen VARCHAR(300) NOT NULL,
  es_skill VARCHAR(2) NOT NULL DEFAULT 'NO',
  baja VARCHAR(2) NOT NULL DEFAULT 'NO',
  CONSTRAINT tecnologia_ibfk_1 FOREIGN KEY (categoria_id) REFERENCES categoriatec (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT tecnologia_ibfk_2 FOREIGN KEY (nivel_id) REFERENCES nivel_tecnologia (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ====================================
-- TABLA DE PROYECTOS
-- ====================================

CREATE TABLE IF NOT EXISTS proyecto (
  id_proyect SERIAL PRIMARY KEY,
  name_proyect VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  categoria_id INTEGER NOT NULL,
  link_github VARCHAR(300) DEFAULT NULL,
  link_web VARCHAR(300) DEFAULT NULL,
  baja VARCHAR(2) NOT NULL DEFAULT 'NO',
  imagen VARCHAR(500) NOT NULL,
  destacado VARCHAR(2) NOT NULL DEFAULT 'NO',
  video_url TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT proyecto_ibfk_1 FOREIGN KEY (categoria_id) REFERENCES tipo_proyecto (id_categoria) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ====================================
-- TABLA DE IMÁGENES DE PROYECTOS
-- ====================================

CREATE TABLE IF NOT EXISTS proyecto_imagenes (
  id SERIAL PRIMARY KEY,
  id_proyecto INTEGER NOT NULL,
  url_imagen TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT proyecto_imagenes_ibfk_1 FOREIGN KEY (id_proyecto) REFERENCES proyecto (id_proyect) ON DELETE CASCADE
);

-- ====================================
-- TABLA RELACIÓN PROYECTO-TECNOLOGÍA
-- ====================================

CREATE TABLE IF NOT EXISTS proyecto_tecnologia (
  id_proyecto INTEGER NOT NULL,
  id_tecnologia INTEGER NOT NULL,
  PRIMARY KEY (id_proyecto, id_tecnologia),
  CONSTRAINT proyecto_tecnologia_ibfk_1 FOREIGN KEY (id_proyecto) REFERENCES proyecto (id_proyect) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT proyecto_tecnologia_ibfk_2 FOREIGN KEY (id_tecnologia) REFERENCES tecnologia (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ====================================
-- TABLAS LEGACY (Mantener por compatibilidad)
-- ====================================

CREATE TABLE IF NOT EXISTS screenshot (
  id SERIAL PRIMARY KEY,
  nombre_img VARCHAR(60) NOT NULL,
  url_imagen VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS proyecto_screenshot (
  id_proyecto INTEGER NOT NULL,
  id_screenshot INTEGER NOT NULL,
  PRIMARY KEY (id_proyecto, id_screenshot),
  CONSTRAINT proyecto_screenshot_ibfk_1 FOREIGN KEY (id_screenshot) REFERENCES screenshot (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT proyecto_screenshot_ibfk_2 FOREIGN KEY (id_proyecto) REFERENCES proyecto (id_proyect) ON DELETE CASCADE ON UPDATE CASCADE
);

-- ====================================
-- RESETEAR SECUENCIAS
-- ====================================

SELECT setval('categoriatec_id_seq', (SELECT COALESCE(MAX(id), 1) FROM categoriatec));
SELECT setval('educacion_id_seq', (SELECT COALESCE(MAX(id), 1) FROM educacion));
SELECT setval('nivel_tecnologia_id_seq', (SELECT COALESCE(MAX(id), 1) FROM nivel_tecnologia));
SELECT setval('tipo_proyecto_id_categoria_seq', (SELECT COALESCE(MAX(id_categoria), 1) FROM tipo_proyecto));
SELECT setval('tipo_usuario_id_tipo_seq', (SELECT COALESCE(MAX(id_tipo), 1) FROM tipo_usuario));
SELECT setval('usuario_id_seq', (SELECT COALESCE(MAX(id), 1) FROM usuario));
SELECT setval('proyecto_id_proyect_seq', (SELECT COALESCE(MAX(id_proyect), 1) FROM proyecto));
SELECT setval('tecnologia_id_seq', (SELECT COALESCE(MAX(id), 1) FROM tecnologia));
SELECT setval('info_laboral_id_seq', (SELECT COALESCE(MAX(id), 1) FROM info_laboral));
SELECT setval('proyecto_imagenes_id_seq', (SELECT COALESCE(MAX(id), 1) FROM proyecto_imagenes));

-- ====================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================

-- Habilitar RLS en todas las tablas
ALTER TABLE categoriatec ENABLE ROW LEVEL SECURITY;
ALTER TABLE nivel_tecnologia ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipo_proyecto ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipo_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE info_laboral ENABLE ROW LEVEL SECURITY;
ALTER TABLE educacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE tecnologia ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyecto ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyecto_imagenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyecto_tecnologia ENABLE ROW LEVEL SECURITY;
ALTER TABLE screenshot ENABLE ROW LEVEL SECURITY;
ALTER TABLE proyecto_screenshot ENABLE ROW LEVEL SECURITY;

-- ====================================
-- POLÍTICAS DE LECTURA PÚBLICA
-- ====================================
-- Permitir lectura pública para todas las tablas (portfolio público)

CREATE POLICY "Public read access" ON categoriatec FOR SELECT USING (true);
CREATE POLICY "Public read access" ON nivel_tecnologia FOR SELECT USING (true);
CREATE POLICY "Public read access" ON tipo_proyecto FOR SELECT USING (true);
CREATE POLICY "Public read access" ON tipo_usuario FOR SELECT USING (true);
CREATE POLICY "Public read access" ON info_laboral FOR SELECT USING (true);
CREATE POLICY "Public read access" ON educacion FOR SELECT USING (true);
CREATE POLICY "Public read access" ON tecnologia FOR SELECT USING (true);
CREATE POLICY "Public read access" ON proyecto FOR SELECT USING (true);
CREATE POLICY "Public read access" ON proyecto_imagenes FOR SELECT USING (true);
CREATE POLICY "Public read access" ON proyecto_tecnologia FOR SELECT USING (true);
CREATE POLICY "Public read access" ON screenshot FOR SELECT USING (true);
CREATE POLICY "Public read access" ON proyecto_screenshot FOR SELECT USING (true);

-- Usuario: Solo lectura pública (no exponemos contraseñas)
CREATE POLICY "Public read access for non-sensitive data" ON usuario 
  FOR SELECT 
  USING (true);

-- ====================================
-- POLÍTICAS DE ESCRITURA (SERVICE ROLE)
-- ====================================
-- Solo el backend con service_role key puede escribir
-- Estas políticas se aplicarán cuando uses el service_role key

CREATE POLICY "Service role can insert" ON categoriatec FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON categoriatec FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON categoriatec FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON nivel_tecnologia FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON nivel_tecnologia FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON nivel_tecnologia FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON tipo_proyecto FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON tipo_proyecto FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON tipo_proyecto FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON tipo_usuario FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON tipo_usuario FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON tipo_usuario FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON usuario FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON usuario FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON usuario FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON info_laboral FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON info_laboral FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON info_laboral FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON educacion FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON educacion FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON educacion FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON tecnologia FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON tecnologia FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON tecnologia FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON proyecto FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON proyecto FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON proyecto FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON proyecto_imagenes FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON proyecto_imagenes FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON proyecto_imagenes FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON proyecto_tecnologia FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON proyecto_tecnologia FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON proyecto_tecnologia FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON screenshot FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON screenshot FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON screenshot FOR DELETE USING (true);

CREATE POLICY "Service role can insert" ON proyecto_screenshot FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update" ON proyecto_screenshot FOR UPDATE USING (true);
CREATE POLICY "Service role can delete" ON proyecto_screenshot FOR DELETE USING (true);
