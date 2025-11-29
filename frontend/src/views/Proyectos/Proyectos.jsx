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
          <div className="loader"></div>
          <p>Cargando proyectos...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-folder-open"></i>
          <p>No hay proyectos disponibles</p>
          <a href="/contacto" className="btn-contact">
            Contáctame para crear uno
          </a>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id_proyect} proyect={project} />
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