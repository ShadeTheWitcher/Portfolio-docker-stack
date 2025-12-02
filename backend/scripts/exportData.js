import pg from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Configurar dotenv
dotenv.config();

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de la conexión
// Puedes editar estos valores directamente con los datos de Render/DBeaver
const pool = new Pool({
  user: 'shade125', // Tu usuario de Render
  password: '...', // Tu contraseña de Render (la que usas en DBeaver)
  host: 'dpg-d4m3afogjchc73b159q0-a.oregon-postgres.render.com', // Tu host de Render
  port: 5432,
  database: 'portfolio_m6oq', // Tu base de datos
  ssl: { rejectUnauthorized: false } // Necesario para Render
});

// Si prefieres usar la URL de entorno o argumento, descomenta esto y comenta lo de arriba:
/*
const connectionString = process.argv[2] || process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});
*/

async function exportData() {
  try {
    console.log('🔌 Conectando a la base de datos...');
    const client = await pool.connect();
    console.log('✅ Conexión exitosa');

    // Obtener todas las tablas del esquema public
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE';
    `;
    
    const { rows: tables } = await client.query(tablesQuery);
    let sqlContent = `-- Database Export\n-- Generated at: ${new Date().toISOString()}\n\n`;
    
    // Desactivar checks de foreign keys para evitar errores de orden
    sqlContent += `SET session_replication_role = 'replica';\n\n`;

    console.log(`📦 Encontradas ${tables.length} tablas. Exportando a SQL...`);

    for (const table of tables) {
      const tableName = table.table_name;
      console.log(`   ⬇️  Procesando tabla: ${tableName}`);
      
      // Agregar TRUNCATE para limpiar la tabla antes de insertar
      sqlContent += `TRUNCATE TABLE "${tableName}" CASCADE;\n`;
      
      const dataQuery = `SELECT * FROM "${tableName}"`;
      const { rows: data } = await client.query(dataQuery);
      
      if (data.length > 0) {
        sqlContent += `-- Table: ${tableName}\n`;
        
        // Obtener columnas
        const columns = Object.keys(data[0]).map(col => `"${col}"`).join(', ');
        
        for (const row of data) {
          const values = Object.values(row).map(val => {
            if (val === null) return 'NULL';
            if (typeof val === 'number') return val;
            if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
            if (val instanceof Date) return `'${val.toISOString()}'`;
            if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`; // Para JSON/Arrays
            // Escapar comillas simples para strings
            return `'${String(val).replace(/'/g, "''")}'`;
          }).join(', ');

          sqlContent += `INSERT INTO "${tableName}" (${columns}) VALUES (${values});\n`;
        }
        sqlContent += '\n';
      }
    }

    // Guardar en archivo
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outputPath = path.join(__dirname, `../../backup_full_${timestamp}.sql`);
    
    // Restaurar configuración
    sqlContent += `\nSET session_replication_role = 'origin';\n`;

    fs.writeFileSync(outputPath, sqlContent);
    
    console.log(`\n✨ Exportación SQL completada exitosamente!`);
    console.log(`📁 Archivo guardado en: ${outputPath}`);

    client.release();
  } catch (err) {
    console.error('❌ Error durante la exportación:', err);
  } finally {
    await pool.end();
  }
}

exportData();
