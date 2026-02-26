import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

// Importar rutas
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import infoRoutes from "./routes/infoRoutes.js";
import techRoutes from "./routes/techRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Configurar dotenv
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// --- Configuración de Carpetas de Uploads ---
const initializeUploads = () => {
  const uploadsDir = path.join(__dirname, 'uploads');
  const subdirs = ['imagenes', 'documentos', 'otros'];
  
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  
  subdirs.forEach(subdir => {
    const dirPath = path.join(uploadsDir, subdir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
  
  return uploadsDir;
};

const uploadsDir = initializeUploads();

// --- Middlewares ---
app.use(helmet({
  crossOriginResourcePolicy: false, // Permitir cargar imágenes desde el frontend
}));
app.use(compression()); // Comprimir respuestas Gzip
app.use(morgan('dev')); // Logs de peticiones en consola
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos de uploads
app.use('/uploads', express.static(uploadsDir));

// Rutas de la API
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/info", infoRoutes);
app.use("/api/technologies", techRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/upload", uploadRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend Portfolio API",
    version: "1.1.0",
    status: "Optimized",
    endpoints: {
      auth: "/api/auth",
      projects: "/api/projects",
      categories: "/api/categories",
      info: "/api/info",
      technologies: "/api/technologies",
      education: "/api/education"
    }
  });
});

// Ruta de health check
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString() 
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ 
    error: "Ruta no encontrada",
    path: req.path 
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🚀 Backend Portfolio API (Running)  ║
║   📡 Puerto: ${PORT}                    ║
║   🌍 Host: 0.0.0.0                   ║
║   🔒 Security: Helmet Enabled         ║
║   📦 Compression: Gzip Enabled        ║
╚═══════════════════════════════════════╝
  `);
});
