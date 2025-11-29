import express from 'express';
import upload from '../middleware/upload.js';
import { uploadImage, uploadDocument, deleteFile } from '../controllers/uploadController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Rutas protegidas (requieren autenticación)
router.post('/image', authMiddleware, upload.single('imagen'), uploadImage);
router.post('/document', authMiddleware, upload.single('cv'), uploadDocument);
router.delete('/file', authMiddleware, deleteFile);

export default router;
