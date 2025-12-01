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

// Subir imagen
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }

    const result = await uploadToSupabase(req.file, BUCKETS.IMAGES);

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

    const result = await uploadToSupabase(req.file, BUCKETS.DOCUMENTS);

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

    if (!supabase) {
      return res.status(500).json({ error: 'Supabase Storage no está configurado' });
    }

    // Extraer bucket y filename de la URL de Supabase
    // URL format: https://xxxxx.supabase.co/storage/v1/object/public/BUCKET/FILENAME
    const urlParts = filepath.split('/');
    const bucket = urlParts[urlParts.length - 2];
    const fileName = urlParts[urlParts.length - 1];

    // Validar que el bucket sea válido
    if (bucket !== BUCKETS.IMAGES && bucket !== BUCKETS.DOCUMENTS) {
      return res.status(400).json({ error: 'Bucket inválido' });
    }

    // Eliminar archivo de Supabase Storage
    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      console.error('Error al eliminar archivo:', error);
      return res.status(500).json({ error: 'Error al eliminar archivo', message: error.message });
    }

    res.json({ message: 'Archivo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

