const express = require('express')
const pool = require('./db')
require('dotenv').config()


const app = express()
app.use(express.json())


app.get('/api/hello', async (req, res) => {
try{
const now = await pool.query('SELECT NOW()')
res.json({ message: `Hola desde el backend — DB: ${now.rows[0].now}` })
}catch(err){
console.error(err)
res.json({ message: 'Backend conectado pero DB fallo' })
}
})


// ejemplo: endpoint para guardar datos de contacto del portfolio
app.post('/api/contact', async (req, res) => {
const { name, email, message } = req.body
try{
await pool.query('CREATE TABLE IF NOT EXISTS contacts(id SERIAL PRIMARY KEY, name TEXT, email TEXT, message TEXT)')
await pool.query('INSERT INTO contacts(name,email,message) VALUES($1,$2,$3)', [name,email,message])
res.json({ ok: true })
}catch(err){
console.error(err)
res.status(500).json({ ok:false })
}
})


const port = process.env.PORT || 4000
app.listen(port, ()=>console.log(`Backend escuchando en ${port}`))