import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando carga de datos de prueba...\n');

    // Leer el archivo seed_data.sql
    const seedFilePath = path.join(__dirname, '../../db/seed_data.sql');
    
    if (!fs.existsSync(seedFilePath)) {
      console.error('❌ No se encontró el archivo seed_data.sql en:', seedFilePath);
      process.exit(1);
    }

    const seedSQL = fs.readFileSync(seedFilePath, 'utf8');

    // Ejecutar el script SQL
    console.log('📝 Ejecutando seed_data.sql...');
    await pool.query(seedSQL);

    // Verificar datos insertados
    console.log('\n✅ Datos de prueba cargados exitosamente!\n');
    console.log('📊 Resumen de datos insertados:\n');

    const result = await pool.query(`
      SELECT 'Proyectos' as tipo, COUNT(*) as total FROM proyecto
      UNION ALL
      SELECT 'Tecnologías', COUNT(*) FROM tecnologia
      UNION ALL
      SELECT 'Educación', COUNT(*) FROM educacion
      UNION ALL
      SELECT 'Info Personal', COUNT(*) FROM info_laboral
      ORDER BY tipo;
    `);

    result.rows.forEach(row => {
      console.log(`   ${row.tipo}: ${row.total}`);
    });

    console.log('\n🎉 ¡Listo! Puedes acceder a tu portfolio con datos de prueba.');
    console.log('   Usuario: admin');
    console.log('   Contraseña: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al cargar los datos de prueba:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();
