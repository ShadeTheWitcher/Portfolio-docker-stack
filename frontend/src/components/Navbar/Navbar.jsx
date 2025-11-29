import { Link } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">SHADE</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/proyectos">Proyectos</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        {/* Admin Access - Semi Oculto */}
        <Link to="/admin/login" className="admin-access" title="Admin">
          <i className="fas fa-shield-alt"></i>
        </Link>
      </div>
    </nav>
  );
}