import express from 'express';
import {
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
} from '../controllers/educationController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', getAllEducation);
router.get('/:id', getEducationById);

// Rutas protegidas
router.post('/', authMiddleware, createEducation);
router.put('/:id', authMiddleware, updateEducation);
router.delete('/:id', authMiddleware, deleteEducation);

export default router;
