import express from 'express';
import {
  getAllProjects,
  getFeaturedProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  toggleFeatured
} from '../controllers/projectController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas públicas
router.get('/', getAllProjects);
router.get('/destacados', getFeaturedProjects);
router.get('/:id', getProjectById);

// Rutas protegidas (requieren autenticación de admin)
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);
router.patch('/:id/destacar', authMiddleware, toggleFeatured);

export default router;
