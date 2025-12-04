import React, { useState, useEffect } from "react";
import './Home.scss';
import ProjectCard from "../../components/ProjectCard";
import Skeleton from "../../components/Skeleton";
import { calculateFreelanceExperience } from "../../utils/dateUtils";
import { getAllProjects } from "../../services/projectService";
import { getInfo } from "../../services/infoService";
import { normalizeFileUrl } from "../../utils/urlUtils";
import { MOCK_INFO, MOCK_PROJECTS, MockDataBanner } from "../../utils/mockData";

function Home() {
  // Fecha de inicio como freelance: 1 de Marzo de 2025
  const FREELANCE_START_DATE = new Date(2025, 2, 1);
  const freelanceExp = calculateFreelanceExperience(FREELANCE_START_DATE);

  // Estados para proyectos
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockProjects, setUsingMockProjects] = useState(false);

  // Cargar proyectos destacados
  useEffect(() => {
    const fetchProjects = async () => {
      const timeout = setTimeout(() => {
        // Si tarda más de 15 segundos, usar mock data
        console.warn('⏱️ API tardó demasiado, usando datos mock');
        setProjects(MOCK_PROJECTS);
        setUsingMockProjects(true);
        setLoading(false);
      }, 15000);

      try {
        setLoading(true);
        const data = await getAllProjects();
        clearTimeout(timeout);
        setProjects(data);
        setError(null);
        setUsingMockProjects(false);
      } catch (err) {
        clearTimeout(timeout);
        console.error('Error al cargar proyectos:', err);
        setError('No se pudieron cargar los proyectos');
        // Usar mock data como fallback
        setProjects(MOCK_PROJECTS);
        setUsingMockProjects(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Estado para información personal
  const [info, setInfo] = useState(null);
  const [usingMockInfo, setUsingMockInfo] = useState(false);

  // Cargar información personal
  useEffect(() => {
    const fetchInfo = async () => {
      const timeout = setTimeout(() => {
        // Si tarda más de 15 segundos, usar mock data
        console.warn('⏱️ API tardó demasiado, usando datos mock para info');
        setInfo(MOCK_INFO);
        setUsingMockInfo(true);
      }, 15000);

      try {
        const data = await getInfo();
        clearTimeout(timeout);
        console.log('🏠 Información personal cargada en Home:', data);
        if (data) {
          setInfo(data);
          setUsingMockInfo(false);
        }
      } catch (err) {
        clearTimeout(timeout);
        console.error('❌ Error al cargar información en Home:', err);
        // Usar mock data como fallback
        setInfo(MOCK_INFO);
        setUsingMockInfo(true);
      }
    };
    fetchInfo();
  }, []);

  // Filtrar proyectos destacados para la vista
  const featuredProjects = projects.filter(p => p.destacado === 'SI' || p.destacado === true);

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
            <span className="name-highlight">
              {info ? `${info.nombre} ${info.apellido}` : 'Lovato Matias'}
            </span>
          </h1>

          <h2 className="hero-subtitle">
            <span className="typing-effect">Desarrollador Full Stack</span>
          </h2>

          <p className="hero-description">
            {info?.texto_home || "Apasionado por crear experiencias web modernas y funcionales. Especializado en React, Node.js y tecnologías cloud."}
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
            {info?.cv_url && (
              <a href={normalizeFileUrl(info.cv_url)} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-cv">
                <i className="fas fa-eye"></i>
                Ver CV
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">{freelanceExp.value}</div>
              <div className="stat-label">{freelanceExp.label}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{projects.length || 0}+</div>
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
        {info?.github && (
          <a href={info.github} target="_blank" rel="noopener noreferrer" className="social-link github">
            <i className="fa-brands fa-github"></i>
          </a>
        )}
        {info?.linkedin && (
          <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
            <i className="fab fa-linkedin"></i>
          </a>
        )}
        {info?.email && (
          <a href={`mailto:${info.email}`} className="social-link email">
            <i className="fas fa-envelope"></i>
          </a>
        )}
      </div>

      {/* Proyectos Destacados */}
      <section className="projects-section">
        <div className="section-header">
          <h3>Proyectos Destacados</h3>
          <p className="section-subtitle">Algunos de mis trabajos más recientes</p>
        </div>

        {/* Banner de datos mock */}
        {usingMockProjects && <MockDataBanner />}

        {/* Skeleton mientras carga */}
        {loading && (
          <div className="projects-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ padding: '1rem' }}>
                <Skeleton variant="card" height="300px" />
                <Skeleton variant="title" width="80%" />
                <Skeleton variant="text" width="100%" count={2} />
              </div>
            ))}
          </div>
        )}

        {/* Proyectos cargados */}
        {!loading && featuredProjects.length > 0 && (
          <>
            <div className="projects-grid">
              {featuredProjects.map((proyect) => (
                <ProjectCard key={proyect.id_proyect} proyect={proyect} />
              ))}
            </div>

            <div className="center-btn">
              <a href="/proyectos" className="btn-view-more">
                Ver Todos los Proyectos
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </>
        )}

        {/* Sin proyectos */}
        {!loading && featuredProjects.length === 0 && !usingMockProjects && (
          <div className="empty-state">
            <p>No hay proyectos destacados disponibles</p>
          </div>
        )}
      </section>
    </section>
  );
}

export default Home;
