import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Subir imagen
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    // Construir URL del archivo
    const fileUrl = `/uploads/imagenes/${req.file.filename}`;

    res.status(200).json({
      message: 'Imagen subida exitosamente',
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Error al subir imagen:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Subir documento (CV, certificado, etc.)
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    // Construir URL del archivo
    const fileUrl = `/uploads/documentos/${req.file.filename}`;

    res.status(200).json({
      message: 'Documento subido exitosamente',
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype
    });
  } catch (error) {
    console.error('Error al subir documento:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Eliminar archivo
export const deleteFile = async (req, res) => {
  try {
    const { filepath } = req.body;

    if (!filepath) {
      return res.status(400).json({ error: 'No se proporcionó la ruta del archivo' });
    }

    // Validar que el archivo esté en la carpeta uploads
    if (!filepath.startsWith('/uploads/')) {
      return res.status(400).json({ error: 'Ruta de archivo inválida' });
    }

    // Construir ruta completa
    const fullPath = path.join(__dirname, '..', filepath);

    // Verificar si el archivo existe
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'Archivo no encontrado' });
    }

    // Eliminar archivo
    fs.unlinkSync(fullPath);

    res.json({ message: 'Archivo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};
