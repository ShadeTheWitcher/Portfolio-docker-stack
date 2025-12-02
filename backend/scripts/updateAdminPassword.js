import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const updateAdminPassword = async () => {
  try {
    const password = 'admin123'; // Contraseña por defecto
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('🔐 Actualizando contraseña del admin...');
    console.log('Contraseña hasheada:', hashedPassword);

    // Actualizar tabla para soportar contraseñas largas
    await pool.query('ALTER TABLE usuario ALTER COLUMN pass TYPE VARCHAR(255)');
    console.log('✅ Tabla usuario actualizada');

    // Actualizar contraseña del admin
    const result = await pool.query(
      'UPDATE usuario SET pass = $1 WHERE usuario = $2 RETURNING id, usuario',
      [hashedPassword, 'admin']
    );

    if (result.rows.length > 0) {
      console.log('✅ Contraseña del admin actualizada exitosamente');
      console.log('Usuario:', result.rows[0].usuario);
      console.log('📝 Credenciales de acceso:');
      console.log('   Usuario: admin');
      console.log('   Contraseña: admin123');
      console.log('⚠️  IMPORTANTE: Cambiar esta contraseña en producción');
    } else {
      console.log('❌ No se encontró el usuario admin');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

updateAdminPassword();
