import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

// Determinar si se usa Supabase por la URL o el host
const isSupabase = process.env.DATABASE_URL?.includes("supabase.co") || 
                   process.env.DB_HOST?.includes("supabase.co");

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
    }
  : {
      user: process.env.DB_USER || "postgres",
      host: process.env.DB_HOST || "db",
      database: process.env.DB_NAME || "portfolio",
      password: process.env.DB_PASSWORD || "example",
      port: process.env.DB_PORT || 5432,
    };

// Optimizaciones de Pool
const pool = new Pool({
  ...poolConfig,
  max: 10, // Límite de conexiones para evitar agotar el plan de Supabase
  idleTimeoutMillis: 10000, // Cerrar conexiones inactivas tras 10s
  connectionTimeoutMillis: 5000, // Tiempo máximo para obtener una conexión
  ...(isSupabase && {
    ssl: {
      rejectUnauthorized: false, // Requerido para Supabase
    },
  }),
});

// Test connection
pool.on("connect", (client) => {
  const dbSource = isSupabase ? "Supabase" : "Local/Docker";
  // console.log(`✅ Conexión establecida con PostgreSQL (${dbSource})`);
});

pool.on("error", (err) => {
  console.error("❌ Error inesperado en el pool de PostgreSQL:", err);
});

export default pool;
