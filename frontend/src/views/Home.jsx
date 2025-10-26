import React, { useEffect, useState } from 'react';
import Card from '../components/Card';

function Home() {
  const [msg, setMsg] = useState('Cargando...');

  useEffect(() => {
    const API_URL = window._env_?.REACT_APP_API_URL || 'http://localhost:4000';
    fetch(`${API_URL}/api/hello`)
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(() => setMsg('❌ No se pudo conectar al backend'));
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
      <Card>{msg}</Card>
    </div>
  );
}

export default Home;
