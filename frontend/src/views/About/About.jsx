import React, { useState, useEffect } from 'react';
import './About.scss';
import { getInfo } from '../../services/infoService';
import { getSkills } from '../../services/techService';
import { getAllEducation } from '../../services/educationService';

const About = () => {
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

  if (loading) {
    return (
      <section className="about-container">
        <div className="loading-state">
          <p>Cargando información...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="about-container">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="about-container">
      <div className="about-header">
        <h1 className="about-title">Sobre Mí</h1>
        <div className="title-underline"></div>
      </div>

      <div className="about-content">
        <div className="profile-section">
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
            <div className="profile-decoration"></div>
          </div>

          <div className="profile-stats">
            <div className="stat-badge">
              <i className="fas fa-code"></i>
              <span>Full Stack Developer</span>
            </div>
            <div className="stat-badge">
              <i className="fas fa-map-marker-alt"></i>
              <span>Argentina</span>
            </div>
          </div>
        </div>

        <div className="bio-section">
          {info?.sobre_mi ? (
            <p className="bio-text">{info.sobre_mi}</p>
          ) : (
            <p className="bio-text">
              Desarrollador Full Stack apasionado por crear experiencias web modernas y funcionales.
            </p>
          )}
        </div>
      </div>

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="skills-section">
          <h2 className="section-title">
            <i className="fas fa-tools"></i>
            Habilidades Técnicas
          </h2>
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
        <h3>Educación</h3>

        <div className="timeline">

          {/* Evento 1 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-card">
              <h4>Licenciatura en Sistemas de Información</h4>
              <span className="timeline-date">2021 - Actualidad</span>
              <p>Universidad Nacional del Nordeste</p>
            </div>
          </div>

          {/* Evento 2 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>

            <div className="timeline-card">
              <h4>Bachiller en Economía y Administración</h4>
              <span className="timeline-date">2016 - 2020</span>
              <p>Colegio Secundario Manuel Belgrano</p>
            </div>
          </div>

        </div>
      </div>

      {/* Contact Info */}
      {info && (
        <div className="contact-info-section">
          <h2 className="section-title">
            <i className="fas fa-envelope"></i>
            Información de Contacto
          </h2>
          <div className="contact-grid">
            {info.correo && (
              <a href={`mailto:${info.correo}`} className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>{info.correo}</span>
              </a>
            )}
            {info.link_linkedin && (
              <a href={info.link_linkedin} target="_blank" rel="noopener noreferrer" className="contact-item">
                <i className="fab fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
            )}
            {info.link_telegram && (
              <a href={info.link_telegram} target="_blank" rel="noopener noreferrer" className="contact-item">
                <i className="fab fa-telegram"></i>
                <span>Telegram</span>
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
