import React from "react";
import './Home.scss';
import ProjectCard from "../../components/ProjectCard";
import { calculateFreelanceExperience } from "../../utils/dateUtils";

function Home() {
  // Fecha de inicio como freelance: 1 de Marzo de 2025
  const FREELANCE_START_DATE = new Date(2025, 2, 1);
  const freelanceExp = calculateFreelanceExperience(FREELANCE_START_DATE);

  const proyectos = [
    {
      id: 1,
      name: "Proyecto 1",
      imagen: "/img/proyecto1.jpg",
      tecnologias: [{ imagen: "/img/react.png" }],
      destacado: "SI",
      link_web: "https://example.com",
      link_github: "https://github.com"
    },
    {
      id: 2,
      name: "Proyecto 2",
      imagen: "/img/proyecto2.jpg",
      tecnologias: [{ imagen: "/img/node.png" }],
      destacado: "SI",
      link_web: "",
      link_github: "https://github.com"
    }
  ];

  return (
    <section className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="greeting">
            <span className="wave">👋</span>
            <span>Hola, soy</span>
          </div>

          <h1 className="hero-title">
            <span className="name-highlight">Lovato Matias</span>
          </h1>

          <h2 className="hero-subtitle">
            <span className="typing-effect">Desarrollador Full Stack</span>
          </h2>

          <p className="hero-description">
            Apasionado por crear experiencias web modernas y funcionales.
            Especializado en React, Node.js y tecnologías cloud.
          </p>

          <div className="cta-buttons">
            <a href="/proyectos" className="btn-primary">
              <i className="fas fa-briefcase"></i>
              Ver Proyectos
            </a>
            <a href="/contacto" className="btn-secondary">
              <i className="fas fa-envelope"></i>
              Contactar
            </a>
          </div>

          {/* Stats */}
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">{freelanceExp.value}</div>
              <div className="stat-label">{freelanceExp.label}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Proyectos Realizados</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Tecnologías</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hero-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>

      {/* Social Links */}
      <div className="social-floating">
        <a href="https://github.com/ShadeTheWitcher" target="_blank" rel="noopener noreferrer" className="social-link github">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://www.linkedin.com/in/lovato-matias-shade/" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="mailto:matii_seba_11@hotmail.com" className="social-link email">
          <i className="fas fa-envelope"></i>
        </a>
      </div>

      {/* Proyectos Destacados */}
      <section className="projects-section">
        <div className="section-header">
          <h3>Proyectos Destacados</h3>
          <p className="section-subtitle">Algunos de mis trabajos más recientes</p>
        </div>

        <div className="projects-grid">
          {proyectos
            .filter((p) => p.destacado === "SI")
            .map((proyect) => (
              <ProjectCard key={proyect.id} proyect={proyect} />
            ))}
        </div>

        <div className="center-btn">
          <a href="/proyectos" className="btn-view-more">
            Ver Todos los Proyectos
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </section>
    </section>
  );
}

export default Home;
