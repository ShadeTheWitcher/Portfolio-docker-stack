import React from "react";

function ProjectCard({ proyect }) {
  return (
    <div className="project-card">
      <img className="project-img" src={proyect.imagen} alt="" />

      <div className="card-body">
        <h4 className="project-title">{proyect.name}</h4>

        <div className="tech-list">
          {proyect.tecnologias.map((t, i) => (
            <img key={i} className="tech-img" src={t.imagen} alt="" />
          ))}
        </div>

        <div className="card-buttons">
          <button
            className="btn-primary"
            onClick={() => (window.location.href = `/proyecto/${proyect.id}`)}
          >
            Más detalles
          </button>

          {proyect.link_web && (
            <a href={proyect.link_web} target="_blank" className="btn-secondary">
              🌐
            </a>
          )}

          {proyect.link_github && (
            <a href={proyect.link_github} target="_blank" className="btn-dark">
              <i className="fab fa-github"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
