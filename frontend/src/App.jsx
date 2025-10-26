import React, { useEffect, useState } from 'react';

function App() {
  const [msg, setMsg] = useState('Cargando...');

  useEffect(() => {
    // Tomar la URL del backend desde window._env_ en vez de process.env
    const API_URL = window._env_?.REACT_APP_API_URL || 'http://localhost:4000';

    fetch(`${API_URL}/api/hello`)
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(() => setMsg('❌ No se pudo conectar al backend'));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'sans-serif' }}>
      <h1>🌐 React + Node + Docker</h1>
      <p>{msg}</p>
    </div>
  );
}

export default App;
