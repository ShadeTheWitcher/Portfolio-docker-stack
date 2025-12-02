import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento en memoria (para Supabase)
// El archivo se guarda en buffer en lugar de disco
const storage = multer.memoryStorage();

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
