import React from 'react';
import './Contacto.scss';

const Contacto = () => {
  // Datos de contacto - en producción vendrían de una API
  const myDatos = {
    correo: 'matii_seba_11@hotmail.com',
    link_linkedin: 'https://www.linkedin.com/in/lovato-matias-shade/',
    link_telegram: 'https://t.me/ShadeTheWitcher'
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('¡Correo copiado!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <section className="seccion-contacto">
      <div className="container">
        <h1 className="contact-title">CONTÁCTAME</h1>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="contact-card">

              {/* Sección de Email */}
              <div className="email-section">
                <div className="icon-wrapper">
                  <i className="fas fa-envelope"></i>
                </div>
                <h3>Correo Electrónico</h3>
                <p className="email-text">{myDatos.correo}</p>
                <div className="button-group">
                  <button
                    className="btn-action btn-copy"
                    onClick={() => copyToClipboard(myDatos.correo)}
                  >
                    <i className="far fa-copy"></i>
                    <span>Copiar</span>
                  </button>
                  <a
                    href={`mailto:${myDatos.correo}`}
                    className="btn-action btn-send"
                  >
                    <i className="fas fa-paper-plane"></i>
                    <span>Enviar Email</span>
                  </a>
                </div>
              </div>

              {/* Divisor */}
              <div className="divider">
                <span>O ENCUÉNTRAME EN</span>
              </div>

              {/* Redes Sociales */}
              <div className="social-section">
                <a
                  href={myDatos.link_linkedin}
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

                <a
                  href={myDatos.link_telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                >
                  <div className="social-icon-wrapper telegram">
                    <i className="fab fa-telegram"></i>
                  </div>
                  <h4>Telegram</h4>
                  <p>Envíame un mensaje</p>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
