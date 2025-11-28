import React from 'react';
import './Proyectos.scss';

const Proyectos = () => {
  // Mock data - en producción esto vendría de una API
  const projects = [
    {
      id_proyect: 1,
      name_proyect: 'Portfolio Docker Stack',
      descripcion: 'Un portafolio profesional desplegado con Docker stack, incluyendo frontend React, backend Node.js y base de datos PostgreSQL.',
      imagen: '',
      link_github: 'https://github.com/ShadeTheWitcher',
      link_web: '#',
      tecnologias: ['React', 'Node.js', 'Docker', 'PostgreSQL']
    },
    {
      id_proyect: 2,
      name_proyect: 'E-commerce App',
      descripcion: 'Aplicación de comercio electrónico completa con carrito de compras, sistema de pagos y panel de administración.',
      imagen: '',
      link_github: 'https://github.com/ShadeTheWitcher',
      link_web: '#',
      tecnologias: ['React', 'Express', 'MongoDB', 'Stripe']
    },
    {
      id_proyect: 3,
      name_proyect: 'Task Manager Pro',
      descripcion: 'Gestor de tareas personal con funcionalidades avanzadas de organización, recordatorios y colaboración en equipo.',
      imagen: '',
      link_github: 'https://github.com/ShadeTheWitcher',
      link_web: '#',
      tecnologias: ['Vue.js', 'Firebase', 'Tailwind']
    },
    {
      id_proyect: 4,
      name_proyect: 'Weather Dashboard',
      descripcion: 'Dashboard interactivo del clima con pronósticos extendidos, mapas y alertas meteorológicas en tiempo real.',
      imagen: '',
      link_github: 'https://github.com/ShadeTheWitcher',
      link_web: '#',
      tecnologias: ['React', 'OpenWeather API', 'Chart.js']
    },
    {
      id_proyect: 5,
      name_proyect: 'Social Media Analytics',
      descripcion: 'Herramienta de análisis de redes sociales con métricas detalladas, gráficos y reportes automatizados.',
      imagen: '',
      link_github: 'https://github.com/ShadeTheWitcher',
      link_web: '#',
      tecnologias: ['Python', 'Flask', 'D3.js', 'Redis']
    },
    {
      id_proyect: 6,
      name_proyect: 'Fitness Tracker',
      descripcion: 'Aplicación para seguimiento de ejercicios, nutrición y progreso físico con planes personalizados.',
      imagen: '',
      link_github: 'https://github.com/ShadeTheWitcher',
      link_web: '#',
      tecnologias: ['React Native', 'Node.js', 'MySQL']
    }
  ];

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

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.id_proyect}>
            <div className="project-image">
              {project.imagen ? (
                <img
                  src={`/assets/uploads/${project.imagen}`}
                  alt={project.name_proyect}
                />
              ) : (
                <div className="image-placeholder">
                  <i className="fas fa-code"></i>
                </div>
              )}
              <div className="project-overlay">
                <div className="overlay-content">
                  <a
                    href={project.link_github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="overlay-link"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  {project.link_web && project.link_web !== '#' && (
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

              {project.tecnologias && (
                <div className="project-tech">
                  {project.tecnologias.map((tech, index) => (
                    <span key={index} className="tech-badge">{tech}</span>
                  ))}
                </div>
              )}

              <div className="project-actions">
                <a
                  href={project.link_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-github"
                >
                  <i className="fab fa-github"></i>
                  GitHub
                </a>
                {project.link_web && project.link_web !== '#' && (
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
    </section>
  );
};

export default Proyectos;
