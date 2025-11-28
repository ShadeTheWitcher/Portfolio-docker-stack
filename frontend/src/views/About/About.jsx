import React from 'react';
import './About.scss';

const About = () => {
  // Mock data - en producción esto vendría de una API
  const myDatos = {
    imagen_perfil: '',
    sobre_mi: '',
  };

  return (
    <section className="about-container">
      <div className="about-header">
        <h1 className="about-title">Sobre Mí</h1>
        <div className="title-underline"></div>
      </div>

      <div className="about-content">
        <div className="profile-section">
          <div className="profile-image-wrapper">
            {myDatos?.imagen_perfil ? (
              <img
                src={`/assets/uploads/${myDatos.imagen_perfil}`}
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
          {myDatos?.sobre_mi ? (
            <div dangerouslySetInnerHTML={{ __html: myDatos.sobre_mi }} />
          ) : (
            <div className="bio-content">
              <div className="bio-intro">
                <h2>¡Hola! 👋</h2>
                <p className="intro-text">
                  Soy <span className="highlight">Lovato Matias</span>, un apasionado desarrollador
                  buscando experiencia en desarrollo web y software.
                </p>
              </div>

              <div className="bio-details">
                <div className="detail-card">
                  <div className="card-icon">
                    <i className="fas fa-laptop-code"></i>
                  </div>
                  <div className="card-content">
                    <h3>Pasión por la Tecnología</h3>
                    <p>
                      Me encanta la informática y siempre estoy buscando nuevas
                      oportunidades para aprender y crecer en el mundo del desarrollo.
                    </p>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="card-icon">
                    <i className="fas fa-gamepad"></i>
                  </div>
                  <div className="card-content">
                    <h3>Más Allá del Código</h3>
                    <p>
                      En mi tiempo libre, disfruto de videojuegos y explorar
                      nuevas tecnologías que me ayuden a mejorar mis habilidades.
                    </p>
                  </div>
                </div>

                <div className="detail-card">
                  <div className="card-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div className="card-content">
                    <h3>Colaboración</h3>
                    <p>
                      Siempre estoy abierto a nuevas conexiones y oportunidades
                      de colaboración. ¡No dudes en contactarme!
                    </p>
                  </div>
                </div>
              </div>

              <div className="skills-section">
                <h3>Tecnologías que manejo</h3>
                <div className="skills-grid">
                  <div className="skill-item">
                    <i className="fab fa-react"></i>
                    <span>React</span>
                  </div>
                  <div className="skill-item">
                    <i className="fab fa-node"></i>
                    <span>Node.js</span>
                  </div>
                  <div className="skill-item">
                    <i className="fab fa-docker"></i>
                    <span>Docker</span>
                  </div>
                  <div className="skill-item">
                    <i className="fab fa-js"></i>
                    <span>JavaScript</span>
                  </div>
                  <div className="skill-item">
                    <i className="fab fa-python"></i>
                    <span>Python</span>
                  </div>
                  <div className="skill-item">
                    <i className="fas fa-database"></i>
                    <span>SQL</span>
                  </div>
                </div>
              </div>

              <div className="cta-section">
                <a href="/contacto" className="btn-contact">
                  <i className="fas fa-envelope"></i>
                  Contáctame
                </a>
                <a href="/proyectos" className="btn-projects">
                  <i className="fas fa-briefcase"></i>
                  Ver Proyectos
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
