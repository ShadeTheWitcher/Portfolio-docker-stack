import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px 20px', background: '#282c34', color: '#fff' }}>
      <Link to="/" style={{ margin: '0 15px', color: '#61dafb', textDecoration: 'none' }}>Home</Link>
      <Link to="/about" style={{ margin: '0 15px', color: '#61dafb', textDecoration: 'none' }}>About</Link>
      <Link to="/proyectos" style={{ margin: '0 15px', color: '#61dafb', textDecoration: 'none' }}>Proyectos</Link>
      <Link to="/contacto" style={{ margin: '0 15px', color: '#61dafb', textDecoration: 'none' }}>Contacto</Link>
    </nav>
  );
}