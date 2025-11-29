import express from 'express';
import multer from 'multer';
import {
  getInfo,
  updateInfo,
  uploadCV,
  downloadCV,
  deleteCV
} from '../controllers/infoController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Configurar multer para upload de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `cv-${Date.now()}.pdf`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos PDF'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  }
});

// Rutas públicas
router.get('/', getInfo);
router.get('/cv', downloadCV);

// Rutas protegidas
router.put('/', authMiddleware, updateInfo);
router.post('/cv', authMiddleware, upload.single('cv'), uploadCV);
router.delete('/cv', authMiddleware, deleteCV);

export default router;
