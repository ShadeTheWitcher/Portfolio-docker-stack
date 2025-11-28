import pool from '../config/db.js';

// Obtener toda la educación
export const getAllEducation = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM educacion
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener educación:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Obtener educación por ID
export const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM educacion WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Educación no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener educación:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Crear educación
export const createEducation = async (req, res) => {
  try {
    const { nombre, descripcion, cant_horas } = req.body;

    if (!nombre || !descripcion) {
      return res.status(400).json({ 
        error: 'Datos incompletos', 
        message: 'Nombre y descripción son requeridos' 
      });
    }

    const result = await pool.query(`
      INSERT INTO educacion (nombre, descripcion, cant_horas, certificado)
      VALUES ($1, $2, $3, NULL)
      RETURNING *
    `, [nombre, descripcion, cant_horas || null]);

    res.status(201).json({
      message: 'Educación creada exitosamente',
      education: result.rows[0]
    });

  } catch (error) {
    console.error('Error al crear educación:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Actualizar educación
export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, cant_horas } = req.body;

    const result = await pool.query(`
      UPDATE educacion 
      SET nombre = $1, descripcion = $2, cant_horas = $3
      WHERE id = $4
      RETURNING *
    `, [nombre, descripcion, cant_horas || null, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Educación no encontrada' });
    }

    res.json({
      message: 'Educación actualizada exitosamente',
      education: result.rows[0]
    });

  } catch (error) {
    console.error('Error al actualizar educación:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Eliminar educación
export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM educacion WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Educación no encontrada' });
    }

    res.json({
      message: 'Educación eliminada exitosamente',
      education: result.rows[0]
    });

  } catch (error) {
    console.error('Error al eliminar educación:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};
