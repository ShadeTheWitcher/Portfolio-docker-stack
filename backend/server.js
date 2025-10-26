import express from "express";
import cors from "cors";      // 🔹 agregar esto
import pool from "./db.js";

const app = express();
const PORT = 4000;

// Permitir todas las solicitudes desde cualquier origen
app.use(cors());

// o limitar solo a tu frontend:
// app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error en la base de datos");
  }
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "👋 Hola desde el backend con Docker!" });
});

app.get("/", (req, res) => {
  res.json({ message: "Backend corriendo correctamente!" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend corriendo en http://0.0.0.0:${PORT}`);
});
