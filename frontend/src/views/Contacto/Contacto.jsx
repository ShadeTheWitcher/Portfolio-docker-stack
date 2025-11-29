import React, { useState, useEffect } from 'react';
import './Contacto.scss';
import { getInfo } from '../../services/infoService';

const Contacto = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const data = await getInfo();
        setContactInfo(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar información de contacto:', err);
        setError('No se pudo cargar la información de contacto');
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('¡Correo copiado!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  if (loading) {
    return (
      <section className="seccion-contacto">
        <div className="loading-state">
          <p>Cargando información de contacto...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="seccion-contacto">
        <div className="error-state">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="seccion-contacto">
      <div className="container">
        <h1 className="contact-title">CONTÁCTAME</h1>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="contact-card">

              {/* Sección de Email */}
              {contactInfo?.email && (
                <div className="email-section">
                  <div className="icon-wrapper">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h3>Correo Electrónico</h3>
                  <p className="email-text">{contactInfo.email}</p>
                  <div className="button-group">
                    <button
                      className="btn-action btn-copy"
                      onClick={() => copyToClipboard(contactInfo.email)}
                    >
                      <i className="far fa-copy"></i>
                      <span>Copiar</span>
                    </button>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="btn-action btn-send"
                    >
                      <i className="fas fa-paper-plane"></i>
                      <span>Enviar Email</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Divisor */}
              <div className="divider">
                <span>O ENCUÉNTRAME EN</span>
              </div>

              {/* Redes Sociales */}
              <div className="social-section">
                {contactInfo?.linkedin && (
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card"
                  >
                    <div className="social-icon-wrapper linkedin">
                      <i className="fab fa-linkedin"></i>
                    </div>
                    <h4>LinkedIn</h4>
                    <p>Conéctate conmigo</p>
                  </a>
                )}

                {contactInfo?.github && (
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card"
                  >
                    <div className="social-icon-wrapper github">
                      <i className="fab fa-github"></i>
                    </div>
                    <h4>GitHub</h4>
                    <p>Ver mis proyectos</p>
                  </a>
                )}

                {contactInfo?.telefono && (
                  <a
                    href={`https://wa.me/${contactInfo.telefono.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card"
                  >
                    <div className="social-icon-wrapper whatsapp">
                      <i className="fab fa-whatsapp"></i>
                    </div>
                    <h4>WhatsApp</h4>
                    <p>Envíame un mensaje</p>
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
