import React from 'react';

const WhatsAppBtn = () => {
  // Your real number
  const phoneNumber = "916006711641"; 
  const message = "Assalamu Alaikum, I am interested in joining Darul Uloom Online. Please guide me.";

  // Create the link
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with Admin"
      style={{ 
        position: 'fixed', 
        bottom: '30px', 
        right: '30px', 
        zIndex: 1000,
        textDecoration: 'none'
      }}
    >
      <div 
        className="rounded-circle d-flex align-items-center justify-content-center shadow-lg hover-effect"
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366', // Official WhatsApp Green
          color: 'white',
          border: '2px solid white'
        }}
      >
        <i className="bi bi-whatsapp fs-2"></i>
      </div>
    </a>
  );
};

export default WhatsAppBtn;