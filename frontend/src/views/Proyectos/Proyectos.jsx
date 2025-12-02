import React, { useState, useEffect } from "react";
import './Proyectos.scss';
import ProjectCard from "../../components/ProjectCard";
import Skeleton from "../../components/Skeleton";
import { getAllProjects } from "../../services/projectService";
import { MOCK_PROJECTS, MockDataBanner } from "../../utils/mockData";

function Proyectos() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const timeout = setTimeout(() => {
        console.warn('⏱️ API tardó demasiado, usando datos mock en Proyectos');
        setProjects(MOCK_PROJECTS);
        setUsingMockData(true);
        setLoading(false);
      }, 5000);

      try {
        setLoading(true);
        const data = await getAllProjects();
        clearTimeout(timeout);
        setProjects(data);
        setError(null);
        setUsingMockData(false);
      } catch (err) {
        clearTimeout(timeout);
        console.error('Error al cargar proyectos:', err);
        setError('No se pudieron cargar los proyectos');
        // Fallback a mock data
        setProjects(MOCK_PROJECTS);
        setUsingMockData(true);
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

      {usingMockData && <MockDataBanner />}

      {loading && (
        <div className="projects-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{ padding: '1rem' }}>
              <Skeleton variant="card" height="300px" />
              <Skeleton variant="title" width="80%" />
              <Skeleton variant="text" width="100%" count={2} />
            </div>
          ))}
        </div>
      )}

      {error && !usingMockData && (
        <div className="error-state">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && projects.length === 0 && !usingMockData && (
        <div className="empty-state">
          <i className="fas fa-folder-open"></i>
          <p>No hay proyectos disponibles</p>
          <a href="/contacto" className="btn-contact">
            Contáctame para crear uno
          </a>
        </div>
      )}

      {!loading && projects.length > 0 && (
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