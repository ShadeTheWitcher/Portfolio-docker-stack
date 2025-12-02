import express from 'express';
import {
  getAllTechnologies,
  getSkills,
  getTechnologyById,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  getCategories,
  getLevels
} from '../controllers/techController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', getAllTechnologies);
router.get('/skills', getSkills);
router.get('/categories', getCategories);
router.get('/levels', getLevels);
router.get('/:id', getTechnologyById);

// Rutas protegidas
router.post('/', authMiddleware, createTechnology);
router.put('/:id', authMiddleware, updateTechnology);
router.delete('/:id', authMiddleware, deleteTechnology);

export default router;
