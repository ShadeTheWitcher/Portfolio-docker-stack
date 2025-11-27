import React from "react";
import './Home.scss';
import ProjectCard from "../../components/ProjectCard";

function Home() {
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
      {/* Bienvenida */}
      <div className="welcome-section">
        <h1 className="title">LOVATO MATIAS</h1>
        <h2 className="subtitle">BIENVENIDO A MI PORTFOLIO</h2>

        <p className="intro">
          Si quieres ponerte en contacto conmigo, escríbeme a mi correo{" "}
          <a href="mailto:matii_seba_11@hotmail.com">
            matii_seba_11@hotmail.com
          </a>
        </p>

        <a
          href="/cv.pdf"
          target="_blank"
          className="btn-primary"
        >
          Descargar mi CV
        </a>

        {/* Redes */}
        <div className="social-box">
          <h2>Redes</h2>
          <div className="social-links">
            <a href="https://github.com/ShadeTheWitcher" target="_blank">
              <i className="fa-brands fa-square-github"></i>
            </a>

            <a
              href="https://www.linkedin.com/in/matias-sebastian-lovato-7b254a222/"
              target="_blank"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Proyectos */}
      <section className="projects-section">
        <h3>Proyectos destacados</h3>

        <div className="projects-grid">
          {proyectos
            .filter((p) => p.destacado === "SI")
            .map((proyect) => (
              <ProjectCard key={proyect.id} proyect={proyect} />
            ))}
        </div>

        <div className="center-btn">
          <a href="/projects" className="btn-primary">
            Ver Más Proyectos
          </a>
        </div>
      </section>
    </section>
  );
}

export default Home;
