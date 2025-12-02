import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './About.scss';
import { getInfo } from '../../services/infoService';
import { getSkills } from '../../services/techService';
import { getAllEducation } from '../../services/educationService';
import { normalizeFileUrl } from '../../utils/urlUtils';
import Skeleton from '../../components/Skeleton';
import { MOCK_INFO, MOCK_SKILLS, MOCK_EDUCATION, MockDataBanner } from '../../utils/mockData';

const About = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const timeout = setTimeout(() => {
        console.warn('⏱️ API tardó demasiado, usando datos mock en About');
        setInfo(MOCK_INFO);
        setSkills(MOCK_SKILLS);
        setEducation(MOCK_EDUCATION);
        setUsingMockData(true);
        setLoading(false);
      }, 5000);

      try {
        setLoading(true);
        const [infoData, skillsData, educationData] = await Promise.all([
          getInfo(),
          getSkills(),
          getAllEducation()
        ]);

        clearTimeout(timeout);
        setInfo(infoData);
        setSkills(skillsData);
        setEducation(educationData);
        setError(null);
        setUsingMockData(false);
      } catch (err) {
        clearTimeout(timeout);
        console.error('Error al cargar datos:', err);
        setError('No se pudieron cargar los datos');
        // Fallback a mock data
        setInfo(MOCK_INFO);
        setSkills(MOCK_SKILLS);
        setEducation(MOCK_EDUCATION);
        setUsingMockData(true);
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
        <div className="about-header">
          <Skeleton variant="title" width="200px" />
        </div>

        <div className="profile-bio-wrapper">
          <div className="profile-card">
            <div className="profile-image-wrapper">
              <Skeleton variant="circle" width="150px" height="150px" />
            </div>
            <div className="profile-info" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Skeleton variant="text" width="60%" height="30px" />
              <div className="profile-badges" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <Skeleton variant="button" width="100px" />
                <Skeleton variant="button" width="100px" />
              </div>
            </div>
          </div>

          <div className="bio-card">
            <Skeleton variant="title" width="150px" />
            <div style={{ marginTop: '1rem' }}>
              <Skeleton variant="text" count={4} />
            </div>
            <div className="bio-actions" style={{ marginTop: '2rem' }}>
              <Skeleton variant="button" width="140px" />
              <Skeleton variant="button" width="140px" />
            </div>
          </div>
        </div>

        <div className="skills-education-grid">
          <div className="skills-section">
            <Skeleton variant="title" width="200px" />
            <div className="skills-grid" style={{ marginTop: '1.5rem' }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} variant="card" height="100px" />
              ))}
            </div>
          </div>
          <div className="education-section">
            <Skeleton variant="title" width="200px" />
            <div className="education-list" style={{ marginTop: '1.5rem' }}>
              <Skeleton variant="card" height="120px" />
              <Skeleton variant="card" height="120px" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && !usingMockData) {
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

      {usingMockData && <MockDataBanner />}

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

          <div className="bio-actions">
            <button onClick={handleContactClick} className="contact-cta-button">
              <i className="fas fa-paper-plane"></i>
              Contáctame
            </button>
            {info?.cv_url && (
              <a href={normalizeFileUrl(info.cv_url)} target="_blank" rel="noopener noreferrer" className="cv-download-button">
                <i className="fas fa-eye"></i>
                Ver CV
              </a>
            )}
          </div>
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
                      href={normalizeFileUrl(edu.certificado_url)}
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