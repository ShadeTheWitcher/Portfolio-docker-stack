import React from 'react';

const Card = ({ children }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      maxWidth: '400px',
      textAlign: 'center',
      fontFamily: 'sans-serif'
    }}>
      {children}
    </div>
  );
};

export default Card;
