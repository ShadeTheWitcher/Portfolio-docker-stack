-- Script para actualizar la tabla educacion a una estructura más completa
-- Ejecutar en PostgreSQL

-- 1. Eliminar la tabla antigua (CUIDADO: esto borrará los datos existentes)
DROP TABLE IF EXISTS educacion CASCADE;

-- 2. Crear la nueva tabla con campos mejorados
CREATE TABLE educacion (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,                  -- Título/Carrera
  institucion VARCHAR(200) NOT NULL,             -- Institución educativa
  descripcion TEXT,                              -- Descripción detallada
  fecha_inicio VARCHAR(7),                       -- Formato: YYYY-MM
  fecha_fin VARCHAR(7),                          -- Formato: YYYY-MM
  en_curso VARCHAR(2) DEFAULT 'NO',              -- 'SI' o 'NO'
  certificado_url TEXT,                          -- URL del certificado
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insertar datos de ejemplo (basados en los anteriores)
INSERT INTO educacion (titulo, institucion, descripcion, fecha_inicio, fecha_fin, en_curso) VALUES
('Título Secundario', 'Escuela de Comercio', 'Economía y Administración de Empresas', '2010-03', '2015-12', 'NO'),
('Curso de Inglés A2.2', 'CUI-UBA', 'Curso intensivo de inglés nivel A2.2 con 120 horas totales', '2020-06', '2020-12', 'NO');

-- 4. Resetear la secuencia del ID
SELECT setval('educacion_id_seq', (SELECT MAX(id) FROM educacion));

-- Verificar la nueva estructura
SELECT * FROM educacion;
