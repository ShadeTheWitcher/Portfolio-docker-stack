import pool from '../config/db.js';

const migrate = async () => {
  try {
    console.log('Iniciando migración de info_laboral...');

    await pool.query(`
      ALTER TABLE info_laboral 
      ADD COLUMN IF NOT EXISTS nombre VARCHAR(100),
      ADD COLUMN IF NOT EXISTS apellido VARCHAR(100),
      ADD COLUMN IF NOT EXISTS telefono VARCHAR(50),
      ADD COLUMN IF NOT EXISTS github VARCHAR(250),
      ADD COLUMN IF NOT EXISTS cv_url VARCHAR(500);
    `);

    console.log('Migración completada exitosamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error en la migración:', error);
    process.exit(1);
  }
};

migrate();
