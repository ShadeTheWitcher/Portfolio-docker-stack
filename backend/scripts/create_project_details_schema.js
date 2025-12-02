import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde el directorio padre
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const migrate = async () => {
  const client = await pool.connect();
  try {
    console.log('Iniciando migración de detalles de proyecto...');
    await client.query('BEGIN');

    // 1. Agregar columna video_url a la tabla proyecto si no existe
    console.log('Verificando columna video_url en tabla proyecto...');
    await client.query(`
      ALTER TABLE proyecto 
      ADD COLUMN IF NOT EXISTS video_url TEXT;
    `);

    // 2. Crear tabla proyecto_imagenes para screenshots
    console.log('Creando tabla proyecto_imagenes...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS proyecto_imagenes (
        id SERIAL PRIMARY KEY,
        id_proyecto INTEGER REFERENCES proyecto(id_proyect) ON DELETE CASCADE,
        url_imagen TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('COMMIT');
    console.log('Migración completada exitosamente.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error durante la migración:', error);
  } finally {
    client.release();
    await pool.end();
  }
};

migrate();
