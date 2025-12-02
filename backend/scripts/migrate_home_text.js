import pool from '../config/db.js';

const migrateHomeText = async () => {
  try {
    console.log('Iniciando migración de texto_home...');

    await pool.query(`
      ALTER TABLE info_laboral 
      ADD COLUMN IF NOT EXISTS texto_home TEXT;
    `);

    console.log('Migración completada exitosamente.');
    process.exit(0);
  } catch (error) {
    console.error('Error en la migración:', error);
    process.exit(1);
  }
};

migrateHomeText();
