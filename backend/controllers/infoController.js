import pool from '../config/db.js';
import fs from 'fs';
import path from 'path';

// Obtener información personal
export const getInfo = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM info_laboral LIMIT 1');

    if (result.rows.length === 0) {
      return res.json({
        sobre_mi: '',
        correo: '',
        link_telegram: '',
        link_linkedin: '',
        skills: '',
        imagen_perfil: '',
        cv_pdf: null
      });
    }

    const info = result.rows[0];
    
    // No enviar el BYTEA del CV, solo indicar si existe
    res.json({
      id: info.id,
      sobre_mi: info.sobre_mi,
      correo: info.correo,
      link_telegram: info.link_telegram,
      link_linkedin: info.link_linkedin,
      skills: info.skills,
      imagen_perfil: info.imagen_perfil,
      has_cv: info.cv_pdf !== null
    });

  } catch (error) {
    console.error('Error al obtener información:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Actualizar información personal
export const updateInfo = async (req, res) => {
  try {
    const { sobre_mi, correo, link_telegram, link_linkedin, skills, imagen_perfil } = req.body;

    // Verificar si existe un registro
    const checkResult = await pool.query('SELECT id FROM info_laboral LIMIT 1');

    let result;
    
    if (checkResult.rows.length === 0) {
      // Crear nuevo registro
      result = await pool.query(`
        INSERT INTO info_laboral (cv_pdf, sobre_mi, correo, link_telegram, link_linkedin, skills, imagen_perfil)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `, ['', sobre_mi || '', correo || '', link_telegram || '', link_linkedin || '', skills || '', imagen_perfil || '']);
    } else {
      // Actualizar registro existente
      result = await pool.query(`
        UPDATE info_laboral 
        SET sobre_mi = $1, correo = $2, link_telegram = $3, link_linkedin = $4, skills = $5, imagen_perfil = $6
        WHERE id = $7
        RETURNING *
      `, [sobre_mi || '', correo || '', link_telegram || '', link_linkedin || '', skills || '', imagen_perfil || '', checkResult.rows[0].id]);
    }

    const info = result.rows[0];

    res.json({
      message: 'Información actualizada exitosamente',
      info: {
        id: info.id,
        sobre_mi: info.sobre_mi,
        correo: info.correo,
        link_telegram: info.link_telegram,
        link_linkedin: info.link_linkedin,
        skills: info.skills,
        imagen_perfil: info.imagen_perfil,
        has_cv: info.cv_pdf !== null
      }
    });

  } catch (error) {
    console.error('Error al actualizar información:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Subir CV (PDF)
export const uploadCV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó archivo' });
    }

    // Leer el archivo
    const cvBuffer = fs.readFileSync(req.file.path);

    // Verificar si existe un registro
    const checkResult = await pool.query('SELECT id FROM info_laboral LIMIT 1');

    if (checkResult.rows.length === 0) {
      // Crear nuevo registro con CV
      await pool.query(`
        INSERT INTO info_laboral (cv_pdf, sobre_mi, correo, link_telegram, link_linkedin, skills, imagen_perfil)
        VALUES ($1, '', '', '', '', '', '')
      `, [cvBuffer]);
    } else {
      // Actualizar CV
      await pool.query(`
        UPDATE info_laboral SET cv_pdf = $1 WHERE id = $2
      `, [cvBuffer, checkResult.rows[0].id]);
    }

    // Eliminar archivo temporal
    fs.unlinkSync(req.file.path);

    res.json({
      message: 'CV subido exitosamente',
      filename: req.file.originalname
    });

  } catch (error) {
    console.error('Error al subir CV:', error);
    
    // Limpiar archivo temporal en caso de error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Descargar CV
export const downloadCV = async (req, res) => {
  try {
    const result = await pool.query('SELECT cv_pdf FROM info_laboral LIMIT 1');

    if (result.rows.length === 0 || !result.rows[0].cv_pdf) {
      return res.status(404).json({ error: 'CV no encontrado' });
    }

    const cvBuffer = result.rows[0].cv_pdf;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=cv.pdf');
    res.send(cvBuffer);

  } catch (error) {
    console.error('Error al descargar CV:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};

// Eliminar CV
export const deleteCV = async (req, res) => {
  try {
    const result = await pool.query(`
      UPDATE info_laboral SET cv_pdf = NULL
      RETURNING id
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Información no encontrada' });
    }

    res.json({
      message: 'CV eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar CV:', error);
    res.status(500).json({ error: 'Error del servidor', message: error.message });
  }
};
