import React, { useEffect, useState } from 'react';

function App() {
  const [msg, setMsg] = useState('Cargando...');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/hello`)
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