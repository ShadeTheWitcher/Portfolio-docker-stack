import pool from '../config/db.js';

// Obtener todos los proyectos (públicos)
export const getAllProjects = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, tp.descripcion as categoria_nombre,
             array_agg(json_build_object('id', t.id, 'nombre', t.nombre_tec, 'imagen', t.imagen)) as tecnologias
      FROM proyecto p
      LEFT JOIN tipo_proyecto tp ON p.categoria_id = tp.id_categoria
      LEFT JOIN proyecto_tecnologia pt ON p.id_proyect = pt.id_proyecto
      LEFT JOIN tecnologia t ON pt.id_tecnologia = t.id
      WHERE p.baja = 'NO'
      GROUP BY p.id_proyect, tp.descripcion
      ORDER BY p.destacado DESC, p.id_proyect DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Obtener proyectos destacados
export const getFeaturedProjects = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, tp.descripcion as categoria_nombre,
             array_agg(json_build_object('id', t.id, 'nombre', t.nombre_tec, 'imagen', t.imagen)) as tecnologias
      FROM proyecto p
      LEFT JOIN tipo_proyecto tp ON p.categoria_id = tp.id_categoria
      LEFT JOIN proyecto_tecnologia pt ON p.id_proyect = pt.id_proyecto
      LEFT JOIN tecnologia t ON pt.id_tecnologia = t.id
      WHERE p.baja = 'NO' AND p.destacado = 'SI'
      GROUP BY p.id_proyect, tp.descripcion
      ORDER BY p.id_proyect DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener proyectos destacados:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Obtener proyecto por ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      SELECT p.*, tp.descripcion as categoria_nombre,
             array_agg(json_build_object('id', t.id, 'nombre', t.nombre_tec, 'imagen', t.imagen)) as tecnologias
      FROM proyecto p
      LEFT JOIN tipo_proyecto tp ON p.categoria_id = tp.id_categoria
      LEFT JOIN proyecto_tecnologia pt ON p.id_proyect = pt.id_proyecto
      LEFT JOIN tecnologia t ON pt.id_tecnologia = t.id
      WHERE p.id_proyect = $1 AND p.baja = 'NO'
      GROUP BY p.id_proyect, tp.descripcion
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Crear proyecto
export const createProject = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado, tecnologias } = req.body;

    if (!name_proyect || !descripcion || !categoria_id) {
      return res.status(400).json({ 
        error: 'Datos incompletos', 
        message: 'Nombre, descripción y categoría son requeridos' 
      });
    }

    await client.query('BEGIN');

    // Insertar proyecto
    const projectResult = await client.query(`
      INSERT INTO proyecto (name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [name_proyect, descripcion, categoria_id, link_github || null, link_web || null, imagen || '', destacado || 'NO']);

    const newProject = projectResult.rows[0];

    // Insertar tecnologías si se proporcionaron
    if (tecnologias && Array.isArray(tecnologias) && tecnologias.length > 0) {
      for (const techId of tecnologias) {
        await client.query(`
          INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia)
          VALUES ($1, $2)
        `, [newProject.id_proyect, techId]);
      }
    }

    await client.query('COMMIT');

    res.status(201).json({
      message: 'Proyecto creado exitosamente',
      project: newProject
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al crear proyecto:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  } finally {
    client.release();
  }
};

// Actualizar proyecto
export const updateProject = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { name_proyect, descripcion, categoria_id, link_github, link_web, imagen, destacado, tecnologias } = req.body;

    await client.query('BEGIN');

    // Actualizar proyecto
    const result = await client.query(`
      UPDATE proyecto 
      SET name_proyect = $1, descripcion = $2, categoria_id = $3, 
          link_github = $4, link_web = $5, imagen = $6, destacado = $7
      WHERE id_proyect = $8 AND baja = 'NO'
      RETURNING *
    `, [name_proyect, descripcion, categoria_id || 1, link_github || null, link_web || null, imagen || '', destacado || 'NO', id]);

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    // Actualizar tecnologías si se proporcionaron
    if (tecnologias && Array.isArray(tecnologias)) {
      // Eliminar tecnologías existentes
      await client.query('DELETE FROM proyecto_tecnologia WHERE id_proyecto = $1', [id]);
      
      // Insertar nuevas tecnologías
      for (const techId of tecnologias) {
        await client.query(`
          INSERT INTO proyecto_tecnologia (id_proyecto, id_tecnologia)
          VALUES ($1, $2)
        `, [id, techId]);
      }
    }

    await client.query('COMMIT');

    res.json({
      message: 'Proyecto actualizado exitosamente',
      project: result.rows[0]
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  } finally {
    client.release();
  }
};

// Eliminar proyecto (soft delete)
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      UPDATE proyecto SET baja = 'SI' WHERE id_proyect = $1 AND baja = 'NO' RETURNING *
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json({
      message: 'Proyecto eliminado exitosamente',
      project: result.rows[0]
    });

  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Marcar/desmarcar proyecto como destacado
export const toggleFeatured = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`
      UPDATE proyecto 
      SET destacado = CASE WHEN destacado = 'SI' THEN 'NO' ELSE 'SI' END
      WHERE id_proyect = $1 AND baja = 'NO'
      RETURNING *
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    res.json({
      message: `Proyecto ${result.rows[0].destacado === 'SI' ? 'marcado como destacado' : 'desmarcado como destacado'}`,
      project: result.rows[0]
    });

  } catch (error) {
    console.error('Error al cambiar estado destacado:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};
