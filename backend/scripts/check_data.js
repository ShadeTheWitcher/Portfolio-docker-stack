import pool from '../config/db.js';

const checkData = async () => {
  try {
    const result = await pool.query('SELECT * FROM info_laboral');
    console.log('Data in info_laboral:', result.rows);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkData();
