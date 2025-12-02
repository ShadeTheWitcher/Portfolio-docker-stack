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
      const timeout = setTimeout(() => {
        console.warn('⏱️ API tardó demasiado, usando datos mock en Contacto');
        setContactInfo(MOCK_INFO);
        setUsingMockData(true);
        setLoading(false);
      }, 10000);

      try {
        setLoading(true);
        const data = await getInfo();
        clearTimeout(timeout);
        console.log('📧 Información de contacto recibida:', data);
        if (data) {
          setContactInfo(data);
          setError(null);
          setUsingMockData(false);
        }
      } catch (err) {
        clearTimeout(timeout);
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
          <div className="contact-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <Skeleton variant="title" width="300px" height="40px" />
            </div>

            <div className="email-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Skeleton variant="circle" width="60px" height="60px" />
              <Skeleton variant="text" width="200px" height="24px" />
              <Skeleton variant="text" width="250px" height="20px" />
              <div className="button-group" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <Skeleton variant="button" width="120px" height="40px" />
                <Skeleton variant="button" width="140px" height="40px" />
              </div>
            </div>

            <div className="divider" style={{ margin: '2rem 0' }}>
              <Skeleton variant="text" width="150px" />
            </div>

            <div className="social-section social-section-responsive" style={{ display: 'grid', gap: '1rem' }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ padding: '1rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <Skeleton variant="circle" width="50px" height="50px" />
                    <Skeleton variant="text" width="100px" />
                    <Skeleton variant="text" width="120px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && !usingMockData) {
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
