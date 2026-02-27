import express from 'express';
import rateLimit from 'express-rate-limit';
import { login, verifyToken, changePassword } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Limitar intentos de login (10 por IP cada 15 minutos)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: { error: 'Demasiados intentos de inicio de sesión, por favor intenta en 15 minutos' }
});

// Rutas públicas
router.post('/login', loginLimiter, login);

// Rutas protegidas
router.post('/verify', authMiddleware, verifyToken);
router.post('/change-password', authMiddleware, changePassword);

export default router;
