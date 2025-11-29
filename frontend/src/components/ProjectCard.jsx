import React, { useState } from "react";
import "./ProjectCard.scss";

function ProjectCard({ proyect }) {
  const [imageError, setImageError] = useState(false);
  const [techImageErrors, setTechImageErrors] = useState({});

  // Manejar tecnologías que pueden venir como array de objetos o null
  const tecnologias = Array.isArray(proyect.tecnologias)
    ? proyect.tecnologias.filter(t => t && t.imagen)
    : [];

  // Función para manejar error de carga de imagen principal
  const handleImageError = () => {
    setImageError(true);
  };

  // Función para manejar error de carga de imagen de tecnología
  const handleTechImageError = (index) => {
    setTechImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="project-card">
      <div className="project-img-container">
        {!imageError && proyect.imagen ? (
          <img
            className="project-img"
            src={proyect.imagen}
            alt={proyect.name_proyect}
            onError={handleImageError}
          />
        ) : (
          <div className="project-img-placeholder">
            <i className="fas fa-code"></i>
            <span>{proyect.name_proyect}</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <h4 className="project-title">{proyect.name_proyect}</h4>

        {tecnologias.length > 0 && (
          <div className="tech-list">
            {tecnologias.map((t, i) => (
              <React.Fragment key={i}>
                {!techImageErrors[i] ? (
                  <img
                    className="tech-img"
                    src={t.imagen}
                    alt={t.nombre || 'Tecnología'}
                    onError={() => handleTechImageError(i)}
                  />
                ) : (
                  <div className="tech-img-placeholder" title={t.nombre || 'Tecnología'}>
                    <i className="fas fa-code"></i>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="card-buttons">
          <button
            className="btn-primary"
            onClick={() => (window.location.href = `/proyecto/${proyect.id_proyect}`)}
          >
            Más detalles
          </button>

          {proyect.link_web && (
            <a href={proyect.link_web} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              🌐
            </a>
          )}

          {proyect.link_github && (
            <a href={proyect.link_github} target="_blank" rel="noopener noreferrer" className="btn-dark">
              <i className="fab fa-github"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;