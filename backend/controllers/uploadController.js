import { supabase, BUCKETS } from '../config/supabase.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper: Subir archivo a Supabase Storage
const uploadToSupabase = async (file, bucket) => {
  if (!supabase) {
    throw new Error('Supabase Storage no está configurado');
  }

  // Generar nombre único para el archivo
  const timestamp = Date.now();
  const randomStr = Math.round(Math.random() * 1E9);
  const ext = path.extname(file.originalname);
  const nameWithoutExt = path.basename(file.originalname, ext);
  const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const fileName = `${sanitizedName}-${timestamp}-${randomStr}${ext}`;

  // Subir archivo a Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error al subir a Supabase Storage:', error);
    throw new Error(`Error al subir archivo: ${error.message}`);
  }

  // Obtener URL pública del archivo
  const { data: publicUrlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return {
    path: data.path,
    url: publicUrlData.publicUrl,
    fileName: fileName,
  };
};

// Helper: Subir archivo a filesystem local
const uploadToLocal = (file, folder) => {
  // Crear carpeta si no existe
  const uploadsPath = path.join(__dirname, '..', 'uploads', folder);
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }

  // Generar nombre único
  const timestamp = Date.now();
  const randomStr = Math.round(Math.random() * 1E9);
  const ext = path.extname(file.originalname);
  const nameWithoutExt = path.basename(file.originalname, ext);
  const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const fileName = `${sanitizedName}-${timestamp}-${randomStr}${ext}`;

  // Guardar archivo
  const filePath = path.join(uploadsPath, fileName);
  fs.writeFileSync(filePath, file.buffer);

  return {
    path: `/uploads/${folder}/${fileName}`,
    url: `/uploads/${folder}/${fileName}`,
    fileName: fileName,
  };
};

// Subir imagen
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    let result;

    // Intentar Supabase primero, si falla usar local
    if (supabase) {
      try {
        result = await uploadToSupabase(req.file, BUCKETS.IMAGES);
        console.log('✅ Imagen subida a Supabase Storage');
      } catch (error) {
        console.warn('⚠️  Supabase falló, usando almacenamiento local:', error.message);
        result = uploadToLocal(req.file, 'imagenes');
        console.log('✅ Imagen subida a almacenamiento local');
      }
    } else {
      result = uploadToLocal(req.file, 'imagenes');
      console.log('✅ Imagen subida a almacenamiento local');
    }

    res.status(200).json({
      message: 'Imagen subida exitosamente',
      url: result.url,
      filename: result.fileName,
      size: req.file.size,
      mimetype: req.file.mimetype,
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

    let result;

    // Intentar Supabase primero, si falla usar local
    if (supabase) {
      try {
        result = await uploadToSupabase(req.file, BUCKETS.DOCUMENTS);
        console.log('✅ Documento subido a Supabase Storage');
      } catch (error) {
        console.warn('⚠️  Supabase falló, usando almacenamiento local:', error.message);
        result = uploadToLocal(req.file, 'documentos');
        console.log('✅ Documento subido a almacenamiento local');
      }
    } else {
      result = uploadToLocal(req.file, 'documentos');
      console.log('✅ Documento subido a almacenamiento local');
    }

    res.status(200).json({
      message: 'Documento subido exitosamente',
      url: result.url,
      filename: result.fileName,
      size: req.file.size,
      mimetype: req.file.mimetype,
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

    // Detectar si es URL de Supabase o ruta local
    if (filepath.includes('supabase.co')) {
      // Eliminar de Supabase Storage
      if (!supabase) {
        return res.status(500).json({ error: 'Supabase Storage no está configurado' });
      }

      const urlParts = filepath.split('/');
      const bucket = urlParts[urlParts.length - 2];
      const fileName = urlParts[urlParts.length - 1];

      if (bucket !== BUCKETS.IMAGES && bucket !== BUCKETS.DOCUMENTS) {
        return res.status(400).json({ error: 'Bucket inválido' });
      }

      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);

      if (error) {
        console.error('Error al eliminar archivo de Supabase:', error);
        return res.status(500).json({ error: 'Error al eliminar archivo', message: error.message });
      }

      console.log('✅ Archivo eliminado de Supabase Storage');
    } else if (filepath.startsWith('/uploads/')) {
      // Eliminar de filesystem local
      const fullPath = path.join(__dirname, '..', filepath);

      if (!fs.existsSync(fullPath)) {
        return res.status(404).json({ error: 'Archivo no encontrado' });
      }

      fs.unlinkSync(fullPath);
      console.log('✅ Archivo eliminado del almacenamiento local');
    } else {
      return res.status(400).json({ error: 'Ruta de archivo inválida' });
    }

    res.json({ message: 'Archivo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};


