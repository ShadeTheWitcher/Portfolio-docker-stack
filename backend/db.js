import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "db",          // <- nombre del servicio Docker
  database: "portfolio",
  password: "example",
  port: 5432,
});

export default pool;
