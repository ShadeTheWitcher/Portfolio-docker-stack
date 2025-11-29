import React, { useState, useEffect } from "react";
import './Proyectos.scss';
import ProjectCard from "../../components/ProjectCard";
import { getAllProjects } from "../../services/projectService";

function Proyectos() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getAllProjects();
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar proyectos:', err);
        setError('No se pudieron cargar los proyectos');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="proyectos-container">
      <div className="proyectos-header">
        <h1 className="proyectos-title">Mis Proyectos</h1>
        <p className="proyectos-subtitle">
          Una colección de proyectos en los que he trabajado,
          demostrando mis habilidades en desarrollo web y software
        </p>
        <div className="title-underline"></div>
      </div>

      {loading && (
        <div className="loading-state">
          <p>Cargando proyectos...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="empty-state">
          <p>No hay proyectos disponibles</p>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <>
          <div className="projects-grid">
            {projects.map((project) => (
              <div className="project-card" key={project.id_proyect}>
                <div className="project-image">
                  {project.imagen ? (
                    <img
                      src={project.imagen}
                      alt={project.name_proyect}
                    />
                  ) : (
                    <div className="image-placeholder">
                      <i className="fas fa-code"></i>
                    </div>
                  )}
                  <div className="project-overlay">
                    <div className="overlay-content">
                      {project.link_github && (
                        <a
                          href={project.link_github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="overlay-link"
                        >
                          <i className="fab fa-github"></i>
                        </a>
                      )}
                      {project.link_web && (
                        <a
                          href={project.link_web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="overlay-link"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.name_proyect}</h3>
                  <p className="project-description">{project.descripcion}</p>

                  <div className="project-actions">
                    {project.link_github && (
                      <a
                        href={project.link_github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-github"
                      >
                        <i className="fab fa-github"></i>
                        GitHub
                      </a>
                    )}
                    {project.link_web && (
                      <a
                        href={project.link_web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-demo"
                      >
                        <i className="fas fa-external-link-alt"></i>
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="projects-footer">
            <p className="footer-text">
              ¿Tienes un proyecto en mente? <a href="/contacto">¡Hablemos!</a>
            </p>
          </div>
        </>
      )}
    </section>
  );
}

export default Proyectos;
