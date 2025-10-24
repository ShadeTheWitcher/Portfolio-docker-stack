import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function App(){
const [message, setMessage] = useState('Cargando...')


useEffect(()=>{
const api = process.env.REACT_APP_API_URL || 'http://localhost:4000'
axios.get(`${api}/api/hello`)
.then(r=>setMessage(r.data.message))
.catch(e=>setMessage('No se pudo conectar al backend'))
}, [])


return (
<div style={{fontFamily:'Arial', padding:30}}>
<h1>Mi Portfolio</h1>
<p>{message}</p>
<section>
<h2>Proyectos</h2>
<ul>
<li>Proyecto A</li>
<li>Proyecto B</li>
</ul>
</section>
</div>
)
}