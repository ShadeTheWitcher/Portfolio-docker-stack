import pool from '../config/db.js';

// Obtener todas las tecnologías
export const getAllTechnologies = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, c.descripcion as categoria_nombre, n.nombre as nivel_nombre
      FROM tecnologia t
      LEFT JOIN categoriatec c ON t.categoria_id = c.id
      LEFT JOIN nivel_tecnologia n ON t.nivel_id = n.id
      WHERE t.baja = 'NO'
      ORDER BY t.nombre_tec ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener tecnologías:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Obtener solo skills
export const getSkills = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, c.descripcion as categoria_nombre, n.nombre as nivel_nombre
      FROM tecnologia t
      LEFT JOIN categoriatec c ON t.categoria_id = c.id
      LEFT JOIN nivel_tecnologia n ON t.nivel_id = n.id
      WHERE t.baja = 'NO' AND t.es_skill = 'SI'
      ORDER BY t.nombre_tec ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener skills:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Obtener tecnología por ID
export const getTechnologyById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT t.*, c.descripcion as categoria_nombre, n.nombre as nivel_nombre
      FROM tecnologia t
      LEFT JOIN categoriatec c ON t.categoria_id = c.id
      LEFT JOIN nivel_tecnologia n ON t.nivel_id = n.id
      WHERE t.id = $1 AND t.baja = 'NO'
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tecnología no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener tecnología:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Crear tecnología
export const createTechnology = async (req, res) => {
  try {
    const { nombre_tec, categoria_id, nivel_id, imagen, es_skill } = req.body;

    if (!nombre_tec) {
      return res.status(400).json({ 
        error: 'Datos incompletos', 
        message: 'El nombre de la tecnología es requerido' 
      });
    }

    const result = await pool.query(`
      INSERT INTO tecnologia (nombre_tec, categoria_id, nivel_id, imagen, es_skill)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [nombre_tec, categoria_id || null, nivel_id || null, imagen || '', es_skill || 'NO']);

    res.status(201).json({
      message: 'Tecnología creada exitosamente',
      technology: result.rows[0]
    });

  } catch (error) {
    console.error('Error al crear tecnología:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Actualizar tecnología
export const updateTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tec, categoria_id, nivel_id, imagen, es_skill } = req.body;

    const result = await pool.query(`
      UPDATE tecnologia 
      SET nombre_tec = $1, categoria_id = $2, nivel_id = $3, imagen = $4, es_skill = $5
      WHERE id = $6 AND baja = 'NO'
      RETURNING *
    `, [nombre_tec, categoria_id || null, nivel_id || null, imagen || '', es_skill || 'NO', id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tecnología no encontrada' });
    }

    res.json({
      message: 'Tecnología actualizada exitosamente',
      technology: result.rows[0]
    });

  } catch (error) {
    console.error('Error al actualizar tecnología:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Eliminar tecnología (soft delete)
export const deleteTechnology = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      UPDATE tecnologia SET baja = 'SI' WHERE id = $1 AND baja = 'NO' RETURNING *
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tecnología no encontrada' });
    }

    res.json({
      message: 'Tecnología eliminada exitosamente',
      technology: result.rows[0]
    });

  } catch (error) {
    console.error('Error al eliminar tecnología:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Obtener categorías de tecnologías
export const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categoriatec ORDER BY descripcion ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Obtener niveles de tecnologías
export const getLevels = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM nivel_tecnologia ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener niveles:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};
