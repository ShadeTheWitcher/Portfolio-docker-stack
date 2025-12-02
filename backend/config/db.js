import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

// Configuración de conexión
// Prioriza DATABASE_URL (Supabase) sobre variables individuales (Docker local)
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false, // Necesario para Supabase
        },
      }
    : {
        user: process.env.DB_USER || "postgres",
        host: process.env.DB_HOST || "db",
        database: process.env.DB_NAME || "portfolio",
        password: process.env.DB_PASSWORD || "example",
        port: process.env.DB_PORT || 5432,
      }
);

// Test connection
pool.on("connect", () => {
  const dbSource = process.env.DATABASE_URL ? "Supabase" : "Local";
  console.log(`✅ Conectado a PostgreSQL (${dbSource})`);
});

pool.on("error", (err) => {
  console.error("❌ Error en PostgreSQL:", err);
});

export default pool;
