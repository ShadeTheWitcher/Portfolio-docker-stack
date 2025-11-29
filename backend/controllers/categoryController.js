import pool from '../config/db.js';

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_categoria, descripcion 
      FROM tipo_proyecto 
      ORDER BY descripcion ASC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Obtener categoría por ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id_categoria, descripcion FROM tipo_proyecto WHERE id_categoria = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Crear categoría
export const createCategory = async (req, res) => {
  try {
    const { descripcion } = req.body;

    if (!descripcion || !descripcion.trim()) {
      return res.status(400).json({ 
        error: 'Datos incompletos', 
        message: 'La descripción es requerida' 
      });
    }

    const result = await pool.query(
      'INSERT INTO tipo_proyecto (descripcion) VALUES ($1) RETURNING *',
      [descripcion.trim()]
    );

    res.status(201).json({
      message: 'Categoría creada exitosamente',
      category: result.rows[0]
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Actualizar categoría
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion } = req.body;

    if (!descripcion || !descripcion.trim()) {
      return res.status(400).json({ 
        error: 'Datos incompletos', 
        message: 'La descripción es requerida' 
      });
    }

    const result = await pool.query(
      'UPDATE tipo_proyecto SET descripcion = $1 WHERE id_categoria = $2 RETURNING *',
      [descripcion.trim(), id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({
      message: 'Categoría actualizada exitosamente',
      category: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Eliminar categoría
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si hay proyectos usando esta categoría
    const projectsCheck = await pool.query(
      'SELECT COUNT(*) as count FROM proyecto WHERE categoria_id = $1 AND baja = $2',
      [id, 'NO']
    );

    if (parseInt(projectsCheck.rows[0].count) > 0) {
      return res.status(400).json({ 
        error: 'No se puede eliminar', 
        message: 'Hay proyectos usando esta categoría' 
      });
    }

    const result = await pool.query(
      'DELETE FROM tipo_proyecto WHERE id_categoria = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    res.json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};
