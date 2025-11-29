import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_cambiame_en_produccion_2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Login
export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ 
        error: 'Datos incompletos', 
        message: 'Usuario y contraseña son requeridos' 
      });
    }

    // Buscar usuario
    const result = await pool.query(
      'SELECT * FROM usuario WHERE usuario = $1 AND baja = $2',
      [usuario, 'NO']
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas', 
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    const user = result.rows[0];

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.pass);

    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas', 
        message: 'Usuario o contraseña incorrectos' 
      });
    }

    // Generar token
    const token = jwt.sign(
      { 
        id: user.id, 
        usuario: user.usuario, 
        perfil_id: user.perfil_id 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Responder con token y datos del usuario (sin contraseña)
    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        usuario: user.usuario,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        perfil_id: user.perfil_id
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      error: 'Error del servidor', 
      message: error.message 
    });
  }
};

// Verificar token
export const verifyToken = async (req, res) => {
  try {
    // El middleware ya verificó el token
    res.json({
      valid: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error del servidor', 
      message: error.message 
    });
  }
};

// Cambiar contraseña
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: 'Datos incompletos', 
        message: 'Contraseña actual y nueva son requeridas' 
      });
    }

    // Obtener usuario
    const result = await pool.query(
      'SELECT * FROM usuario WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        error: 'Usuario no encontrado' 
      });
    }

    const user = result.rows[0];

    // Verificar contraseña actual
    const isValidPassword = await bcrypt.compare(currentPassword, user.pass);

    if (!isValidPassword) {
      return res.status(401).json({ 
        error: 'Contraseña incorrecta', 
        message: 'La contraseña actual no es correcta' 
      });
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña
    await pool.query(
      'UPDATE usuario SET pass = $1 WHERE id = $2',
      [hashedPassword, userId]
    );

    res.json({
      message: 'Contraseña actualizada exitosamente'
    });

  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ 
      error: 'Error del servidor', 
      message: error.message 
    });
  }
};
