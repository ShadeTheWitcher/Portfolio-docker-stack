import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asegurar que existan las carpetas
const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determinar carpeta según el tipo de archivo
    let folder = 'uploads/otros';
    
    if (file.fieldname === 'imagen' || file.fieldname === 'image') {
      folder = 'uploads/imagenes';
    } else if (file.fieldname === 'cv' || file.fieldname === 'certificado') {
      folder = 'uploads/documentos';
    }

    const uploadsPath = path.join(__dirname, '..', folder);
    createFolderIfNotExists(uploadsPath);
    
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    // Generar nombre único: timestamp-nombre-original
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    
    cb(null, `${sanitizedName}-${uniqueSuffix}${ext}`);
  }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  // Tipos permitidos
  const allowedImageTypes = /jpeg|jpg|png|gif|webp|svg/;
  const allowedDocTypes = /pdf|doc|docx/;
  
  const ext = path.extname(file.originalname).toLowerCase();
  const extname = ext.replace('.', '');

  if (file.fieldname === 'imagen' || file.fieldname === 'image') {
    // Validar imágenes
    if (allowedImageTypes.test(extname)) {
      return cb(null, true);
    }
    return cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif, webp, svg)'));
  } else if (file.fieldname === 'cv' || file.fieldname === 'certificado') {
    // Validar documentos
    if (allowedDocTypes.test(extname)) {
      return cb(null, true);
    }
    return cb(new Error('Solo se permiten documentos (pdf, doc, docx)'));
  }
  
  // Permitir otros tipos por defecto
  cb(null, true);
};

// Configurar multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB máximo
  }
});

export default upload;
