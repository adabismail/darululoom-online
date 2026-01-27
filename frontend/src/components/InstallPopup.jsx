import React, { useEffect, useState } from 'react';

const InstallPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      
      // Wait 4 seconds after the site loads to show the popup
      setTimeout(() => {
        setIsVisible(true);
      }, 4000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    // This hides the popup for the current session. 
    // It will only come back if the user refreshes the page.
    setIsVisible(false);
  };

  // If not visible, we return nothing (No popup and No green spacer)
  if (!isVisible) return null;

  return (
    <>
      {/* --- THE POPUP --- */}
      <div 
        className="fixed-bottom p-3" 
        style={{ 
          bottom: '20px',
          left: '20px',
          right: '20px',
          margin: '0 auto',
          maxWidth: '500px',
          
          backgroundColor: 'rgba(255, 255, 255, 0.98)', 
          borderRadius: '20px',
          border: '1px solid #e0e0e0',
          borderTop: '5px solid #00332a', 
          
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          zIndex: 10000,
          animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div style={{ 
              minWidth: '50px', width: '50px', height: '50px', 
              background: '#ffffff', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #f0f0f0'
            }}>

              <img src="/images/favicon.png" alt="Icon" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            </div>
            <div style={{ lineHeight: '1.2' }}>
              <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.95rem' }}>Install App</h6>
              <small className="text-muted" style={{ fontSize: '0.75rem' }}>Faster access to courses!</small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-sm text-secondary fw-bold"
              style={{ backgroundColor: '#f5f5f5', borderRadius: '20px', border: 'none' }}
              onClick={handleDismiss} 
            >
              Not Now
            </button>
            <button 
              className="btn btn-sm text-white fw-bold"
              style={{ 
                backgroundColor: '#00332a', 
                borderRadius: '20px', 
                padding: '6px 16px', 
                boxShadow: '0 4px 12px rgba(0, 51, 42, 0.3)' 
              }}
              onClick={handleInstallClick}
            >
              Install
            </button>
          </div>
        </div>
        <style>{`
          @keyframes slideUp { from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        `}</style>
      </div>

      {/* --- THE GREEN SPACER (Static Element) --- */}

      <div style={{ 
        height: '130px', 
        width: '100%', 
        backgroundColor: '#00332a', 
        transition: 'height 0.3s ease'
      }} />
    </>
  );
};

export default InstallPopup;