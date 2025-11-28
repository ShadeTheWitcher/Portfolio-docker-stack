-- Converted from MySQL dump

-- Table: categoriatec
CREATE TABLE IF NOT EXISTS categoriatec (
  id SERIAL PRIMARY KEY,
  descripcion VARCHAR(30) NOT NULL
);

INSERT INTO categoriatec (id, descripcion) VALUES
(1, 'Lenguajes de programación'),
(2, 'FRAMEWORKS Y LIBRERÍAS'),
(3, 'SOFTWARE Y HERRAMIENTAS');

-- Table: educacion
CREATE TABLE IF NOT EXISTS educacion (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion VARCHAR(100) NOT NULL,
  cant_horas VARCHAR(60) DEFAULT NULL,
  certificado BYTEA DEFAULT NULL
);

INSERT INTO educacion (id, nombre, descripcion, cant_horas, certificado) VALUES
(1, 'Titulo Secundario', 'Economia y Administracion de empresa', '5 años', NULL),
(2, 'Curso ingles', 'CUI-UBA A2.2', '120 hs', NULL);

-- Table: info_laboral
CREATE TABLE IF NOT EXISTS info_laboral (
  id SERIAL PRIMARY KEY,
  cv_pdf BYTEA DEFAULT NULL,
  sobre_mi TEXT DEFAULT NULL,
  correo VARCHAR(60) DEFAULT NULL,
  link_telegram VARCHAR(150) DEFAULT NULL,
  link_linkedin VARCHAR(250) DEFAULT NULL,
  skills TEXT DEFAULT NULL,
  imagen_perfil VARCHAR(250) DEFAULT NULL
);

-- Table: nivel_tecnologia
CREATE TABLE IF NOT EXISTS nivel_tecnologia (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(30) NOT NULL
);

INSERT INTO nivel_tecnologia (id, nombre) VALUES
(1, 'Learning/trainee'),
(2, 'Junior'),
(3, 'Intermediate'),
(4, 'Advanced');

-- Table: tipo_proyecto
CREATE TABLE IF NOT EXISTS tipo_proyecto (
  id_categoria SERIAL PRIMARY KEY,
  descripcion VARCHAR(30) NOT NULL
);

INSERT INTO tipo_proyecto (id_categoria, descripcion) VALUES
(1, 'Web'),
(2, 'Desktop');

-- Table: tipo_usuario
CREATE TABLE IF NOT EXISTS tipo_usuario (
  id_tipo SERIAL PRIMARY KEY,
  descripcion VARCHAR(20) NOT NULL
);

INSERT INTO tipo_usuario (id_tipo, descripcion) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'extra');

-- Table: proyecto
CREATE TABLE IF NOT EXISTS proyecto (
  id_proyect SERIAL PRIMARY KEY,
  name_proyect VARCHAR(30) NOT NULL,
  descripcion VARCHAR(300) NOT NULL,
  categoria_id INTEGER NOT NULL,
  link_github VARCHAR(200) DEFAULT NULL,
  link_web VARCHAR(200) DEFAULT NULL,
  baja VARCHAR(2) NOT NULL DEFAULT 'NO',
  imagen VARCHAR(300) NOT NULL,
  destacado VARCHAR(2) NOT NULL DEFAULT 'NO',
  CONSTRAINT proyecto_ibfk_1 FOREIGN KEY (categoria_id) REFERENCES tipo_proyecto (id_categoria) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: screenshot
CREATE TABLE IF NOT EXISTS screenshot (
  id SERIAL PRIMARY KEY,
  nombre_img VARCHAR(60) NOT NULL,
  url_imagen VARCHAR(300) NOT NULL
);

-- Table: proyecto_screenshot
CREATE TABLE IF NOT EXISTS proyecto_screenshot (
  id_proyecto INTEGER NOT NULL,
  id_screenshot INTEGER NOT NULL,
  PRIMARY KEY (id_proyecto, id_screenshot),
  CONSTRAINT proyecto_screenshot_ibfk_1 FOREIGN KEY (id_screenshot) REFERENCES screenshot (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT proyecto_screenshot_ibfk_2 FOREIGN KEY (id_proyecto) REFERENCES proyecto (id_proyect) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: tecnologia
CREATE TABLE IF NOT EXISTS tecnologia (
  id SERIAL PRIMARY KEY,
  nombre_tec VARCHAR(20) NOT NULL,
  categoria_id INTEGER DEFAULT NULL,
  nivel_id INTEGER DEFAULT NULL,
  imagen VARCHAR(200) NOT NULL,
  es_skill VARCHAR(2) NOT NULL DEFAULT 'NO',
  baja VARCHAR(2) NOT NULL DEFAULT 'NO',
  CONSTRAINT tecnologia_ibfk_1 FOREIGN KEY (categoria_id) REFERENCES categoriatec (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT tecnologia_ibfk_2 FOREIGN KEY (nivel_id) REFERENCES nivel_tecnologia (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: proyecto_tecnologia
CREATE TABLE IF NOT EXISTS proyecto_tecnologia (
  id_proyecto INTEGER NOT NULL,
  id_tecnologia INTEGER NOT NULL,
  PRIMARY KEY (id_proyecto, id_tecnologia),
  CONSTRAINT proyecto_tecnologia_ibfk_1 FOREIGN KEY (id_proyecto) REFERENCES proyecto (id_proyect) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT proyecto_tecnologia_ibfk_2 FOREIGN KEY (id_tecnologia) REFERENCES tecnologia (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table: usuario
CREATE TABLE IF NOT EXISTS usuario (
  id SERIAL PRIMARY KEY,
  usuario VARCHAR(25) NOT NULL,
  pass VARCHAR(25) NOT NULL,
  perfil_id INTEGER NOT NULL,
  baja VARCHAR(2) NOT NULL DEFAULT 'NO',
  email VARCHAR(30) NOT NULL,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(20) NOT NULL,
  CONSTRAINT usuario_ibfk_1 FOREIGN KEY (perfil_id) REFERENCES tipo_usuario (id_tipo) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO usuario (id, usuario, pass, perfil_id, baja, email, nombre, apellido) VALUES
(9, 'admin', '2yyZ33Whxyeoo', 1, 'NO', '', '', '');

-- Reset sequences to max id (important for postgres after manual inserts with IDs)
SELECT setval('categoriatec_id_seq', (SELECT MAX(id) FROM categoriatec));
SELECT setval('educacion_id_seq', (SELECT MAX(id) FROM educacion));
SELECT setval('nivel_tecnologia_id_seq', (SELECT MAX(id) FROM nivel_tecnologia));
SELECT setval('tipo_proyecto_id_categoria_seq', (SELECT MAX(id_categoria) FROM tipo_proyecto));
SELECT setval('tipo_usuario_id_tipo_seq', (SELECT MAX(id_tipo) FROM tipo_usuario));
SELECT setval('usuario_id_seq', (SELECT MAX(id) FROM usuario));
