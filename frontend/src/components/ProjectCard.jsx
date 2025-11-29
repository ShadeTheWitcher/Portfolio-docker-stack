import React from "react";

function ProjectCard({ proyect }) {
  // Manejar tecnologías que pueden venir como array de objetos o null
  const tecnologias = Array.isArray(proyect.tecnologias)
    ? proyect.tecnologias.filter(t => t && t.imagen)
    : [];

  return (
    <div className="project-card">
      <img className="project-img" src={proyect.imagen || '/img/placeholder.jpg'} alt={proyect.name_proyect} />

      <div className="card-body">
        <h4 className="project-title">{proyect.name_proyect}</h4>

        {tecnologias.length > 0 && (
          <div className="tech-list">
            {tecnologias.map((t, i) => (
              <img key={i} className="tech-img" src={t.imagen} alt={t.nombre || ''} />
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
