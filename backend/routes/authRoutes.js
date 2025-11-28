import express from 'express';
import { login, verifyToken, changePassword } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.post('/login', login);

// Rutas protegidas
router.post('/verify', authMiddleware, verifyToken);
router.post('/change-password', authMiddleware, changePassword);

export default router;
