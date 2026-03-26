-- Agregar columna orden a la tabla proyecto
ALTER TABLE proyecto ADD COLUMN IF NOT EXISTS orden INTEGER DEFAULT 0;

-- Inicializar la columna orden con el valor de id_proyect para tener un orden inicial coherente
UPDATE proyecto SET orden = id_proyect WHERE orden = 0;

-- Crear un índice para optimizar las consultas que ordenan por este campo
CREATE INDEX IF NOT EXISTS idx_proyecto_orden ON proyecto (orden);
