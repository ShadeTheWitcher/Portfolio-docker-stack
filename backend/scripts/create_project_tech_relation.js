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

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS proyecto_tecnologia (
    id_proyecto INTEGER REFERENCES proyecto(id_proyect) ON DELETE CASCADE,
    id_tecnologia INTEGER REFERENCES tecnologia(id) ON DELETE CASCADE,
    PRIMARY KEY (id_proyecto, id_tecnologia)
  );
`;

const migrate = async () => {
  try {
    console.log('Iniciando migración de tabla proyecto_tecnologias...');
    await pool.query(createTableQuery);
    console.log('Tabla proyecto_tecnologias creada o verificada exitosamente.');
  } catch (error) {
    console.error('Error durante la migración:', error);
  } finally {
    await pool.end();
  }
};

migrate();
