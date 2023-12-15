import React from 'react';

function Footer() {
    const footerStyle = {
      backgroundColor: '#6f3b8c',
      color: '#fff',
      padding: '5px',
      textAlign: 'center',
      position: 'fixed',
      bottom: 0,
      width: '100%',
    };
  return (
    <footer style={footerStyle}>     
      <div>
        <p>&copy; 2023 Desenvolvido por Amanda Marques.</p>
      </div>     
    </footer>
  );
}

export default Footer;
