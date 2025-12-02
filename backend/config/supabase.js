import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Usar service key para operaciones de backend

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️  Supabase Storage no configurado. Usando almacenamiento local.');
}

// Cliente de Supabase para Storage
export const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Nombres de los buckets
export const BUCKETS = {
  IMAGES: process.env.SUPABASE_IMAGES_BUCKET || 'imagenes',
  DOCUMENTS: process.env.SUPABASE_DOCUMENTS_BUCKET || 'documentos',
};

export default supabase;
