const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/hello', (req, res) => {
  res.json({ message: '👋 Hola desde el backend con Docker!' });
});

app.listen(4000, () => {
  console.log('✅ Backend corriendo en http://localhost:4000');
});