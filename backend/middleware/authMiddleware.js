import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura_cambiame_en_produccion_2024';

export const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'No autorizado', 
        message: 'Token no proporcionado' 
      });
    }

    const token = authHeader.substring(7); // Remover 'Bearer '

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Agregar usuario al request
    req.user = decoded;
    
    // Verificar que sea admin
    if (decoded.perfil_id !== 1) {
      return res.status(403).json({ 
        error: 'Prohibido', 
        message: 'Se requieren permisos de administrador' 
      });
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'No autorizado', 
        message: 'Token inválido' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'No autorizado', 
        message: 'Token expirado' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Error del servidor', 
      message: error.message 
    });
  }
};

export default authMiddleware;
