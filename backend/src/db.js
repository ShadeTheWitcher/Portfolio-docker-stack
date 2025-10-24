const { Pool } = require('pg')
require('dotenv').config()


const pool = new Pool({
connectionString: process.env.DATABASE_URL || 'postgres://postgres:example@db:5432/portfolio'
})


module.exports = pool