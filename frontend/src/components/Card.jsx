import React from 'react';

function Card({ children }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.1)',
      padding: '20px 30px',
      borderRadius: '15px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
    }}>
      {children}
    </div>
  );
}

export default Card;
