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
    console.log('Create Education Request Body:', req.body);
    const { titulo, institucion, descripcion, fecha_inicio, fecha_fin, en_curso, certificado_url } = req.body;

    if (!titulo || !institucion) {
      return res.status(400).json({ 
        error: 'Datos incompletos', 
        message: 'Título e institución son requeridos' 
      });
    }

    const result = await pool.query(`
      INSERT INTO educacion (titulo, institucion, descripcion, fecha_inicio, fecha_fin, en_curso, certificado_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [
      titulo, 
      institucion, 
      descripcion || null, 
      fecha_inicio || null, 
      fecha_fin || null, 
      en_curso || 'NO',
      certificado_url || null
    ]);

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
    const { titulo, institucion, descripcion, fecha_inicio, fecha_fin, en_curso, certificado_url } = req.body;

    const result = await pool.query(`
      UPDATE educacion 
      SET titulo = $1, 
          institucion = $2, 
          descripcion = $3, 
          fecha_inicio = $4, 
          fecha_fin = $5, 
          en_curso = $6,
          certificado_url = $7,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *
    `, [
      titulo, 
      institucion, 
      descripcion || null, 
      fecha_inicio || null, 
      fecha_fin || null, 
      en_curso || 'NO', 
      certificado_url || null,
      id
    ]);

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

    res.json({ message: 'Educación eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar educación:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};
