import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.scss';
import { getInfo } from '../../services/infoService';
import { getSkills } from '../../services/techService';
import { getAllEducation } from '../../services/educationService';

const About = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [infoData, skillsData, educationData] = await Promise.all([
          getInfo(),
          getSkills(),
          getAllEducation()
        ]);

        setInfo(infoData);
        setSkills(skillsData);
        setEducation(educationData);
        setError(null);
      } catch (err) {
        console.error('Error al cargar datos:', err);
        setError('No se pudieron cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleContactClick = () => {
    navigate('/contacto');
  };

  if (loading) {
    return (
      <section className="about-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Cargando información...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="about-container">
        <div className="error-state">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="about-container">
      {/* Header */}
      <div className="about-header">
        <h1 className="about-title">Sobre Mí</h1>
        <div className="title-underline"></div>
      </div>

      {/* Profile & Bio */}
      <div className="profile-bio-wrapper">
        <div className="profile-card">
          <div className="profile-image-wrapper">
            {info?.imagen_perfil ? (
              <img
                src={info.imagen_perfil}
                alt="Lovato Matias"
                className="profile-image"
              />
            ) : (
              <div className="profile-placeholder">
                <i className="fas fa-user"></i>
              </div>
            )}
          </div>

          <div className="profile-info">
            <h2 className="profile-name">Lovato Matias</h2>
            <div className="profile-badges">
              <span className="badge">
                <i className="fas fa-code"></i>
                Full Stack Developer
              </span>
              <span className="badge">
                <i className="fas fa-map-marker-alt"></i>
                Argentina
              </span>
            </div>
          </div>
        </div>

        <div className="bio-card">
          <h3 className="bio-title">
            <i className="fas fa-user-circle"></i>
            Acerca de
          </h3>
          <p className="bio-text">
            {info?.descripcion ||
              'Desarrollador Full Stack apasionado por crear experiencias web modernas y funcionales.'}
          </p>

          <button onClick={handleContactClick} className="contact-cta-button">
            <i className="fas fa-paper-plane"></i>
            Contáctame
          </button>
        </div>
      </div>

      {/* Skills & Education Grid */}
      <div className="skills-education-grid">
        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="skills-section">
            <h3 className="section-title">
              <i className="fas fa-tools"></i>
              Habilidades Técnicas
            </h3>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill.id} className="skill-card">
                  {skill.imagen && (
                    <img src={skill.imagen} alt={skill.nombre_tec} className="skill-icon" />
                  )}
                  <span className="skill-name">{skill.nombre_tec}</span>
                  {skill.nivel_nombre && (
                    <span className="skill-level">{skill.nivel_nombre}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        <div className="education-section">
          <h3 className="section-title">
            <i className="fas fa-graduation-cap"></i>
            Educación
          </h3>
          <div className="education-list">
            {education.map((edu) => (
              <div key={edu.id} className="education-item">
                <div className="education-dot"></div>
                <div className="education-content">
                  <h4>{edu.titulo}</h4>
                  <span className="education-date">
                    {edu.fecha_inicio ? new Date(edu.fecha_inicio).getFullYear() : ''}
                    {' - '}
                    {edu.en_curso === 'SI' ? 'Actualidad' : (edu.fecha_fin ? new Date(edu.fecha_fin).getFullYear() : '')}
                  </span>
                  <p className="education-institution">{edu.institucion}</p>
                  {edu.descripcion && <p className="education-description">{edu.descripcion}</p>}
                  {edu.certificado_url && (
                    <a
                      href={edu.certificado_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="education-certificate-link"
                    >
                      <i className="fas fa-certificate"></i> Ver Certificado
                    </a>
                  )}
                </div>
              </div>
            ))}
            {education.length === 0 && (
              <p className="no-data">No hay información de educación disponible.</p>
            )}
          </div>
        </div>
      </div>

      {/* Contact Links */}
      {info && (info.email || info.linkedin || info.github) && (
        <div className="social-links">
          {info.email && (
            <a href={`mailto:${info.email}`} className="social-link" title="Email">
              <i className="fas fa-envelope"></i>
            </a>
          )}
          {info.linkedin && (
            <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {info.github && (
            <a href={info.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
              <i className="fab fa-github"></i>
            </a>
          )}
        </div>
      )}
    </section>
  );
};

export default About;