import React, { useState, useEffect } from 'react';
import './Contacto.scss';
import { getInfo } from '../../services/infoService';
import Skeleton from '../../components/Skeleton';
import { MOCK_INFO, MockDataBanner } from '../../utils/mockData';

const Contacto = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const data = await getInfo();
        console.log('📧 Información de contacto recibida:', data);
        console.log('📧 Email específicamente:', data?.email);
        setContactInfo(data);
        setError(null);
        setUsingMockData(false);
      } catch (err) {
        console.error('❌ Error al cargar información de contacto:', err);
        setError('No se pudo cargar la información de contacto');
        // Usar datos mock como fallback
        setContactInfo(MOCK_INFO);
        setUsingMockData(true);
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
        <div className="container">
          <div className="loading-state" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            flexDirection: 'column'
          }}>
            <div className="spinner" style={{
              border: '4px solid rgba(255, 255, 255, 0.1)',
              borderTop: '4px solid #007bff',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              animation: 'spin 1s linear infinite',
              marginBottom: '1rem'
            }}></div>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Cargando información de contacto...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="seccion-contacto">
        <div className="container">
          <div className="error-state" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
            flexDirection: 'column',
            textAlign: 'center'
          }}>
            <i className="fas fa-exclamation-circle" style={{ fontSize: '3rem', color: '#dc3545', marginBottom: '1rem' }}></i>
            <p style={{ color: '#dc3545', fontSize: '1.1rem' }}>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="seccion-contacto">
      <div className="container">
        <h1 className="contact-title">CONTÁCTAME</h1>

        {/* Banner de datos mock */}
        {usingMockData && <MockDataBanner />}

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="contact-card">

              {/* Sección de Email */}
              {contactInfo?.email ? (
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
              ) : (
                <div className="email-section" style={{ textAlign: 'center', padding: '2rem', background: '#fff3cd', borderRadius: '8px' }}>
                  <i className="fas fa-exclamation-triangle" style={{ fontSize: '2rem', color: '#856404', marginBottom: '1rem' }}></i>
                  <h3 style={{ color: '#856404' }}>Email no configurado</h3>
                  <p style={{ color: '#856404' }}>
                    Por favor, configura tu email en el panel de administración (Perfil).
                  </p>
                </div>
              )}

              {/* Divisor */}
              <div className="divider">
                <span>O ENCUÉNTRAME EN</span>
              </div>

              {/* Redes Sociales */}
              <div className="social-section social-section-responsive">
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
    </section >
  );
};

export default Contacto;
