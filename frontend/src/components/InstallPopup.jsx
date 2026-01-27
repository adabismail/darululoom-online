import React, { useEffect, useState } from 'react';

const InstallPopup = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Listen for the browser saying "Hey, this can be installed!"
    const handler = (e) => {
      // Prevent the mini-infobar from appearing automatically
      e.preventDefault();
      // Stash the event so we can trigger it later
      setDeferredPrompt(e);
      setTimeout(() =>{
        setIsVisible(true);
      }, 2000)
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // 2. Show the native browser install prompt
    deferredPrompt.prompt();

    // 3. Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // 4. Reset everything
    setDeferredPrompt(null);
    setIsVisible(false);

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed-bottom p-3 shadow-lg" 
      style={{ 
        backgroundColor: 'white', 
        borderTop: '4px solid #00332a', 
        zIndex: 9999,
        animation: 'slideUp 0.5s ease-out'
      }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          {/* Logo Icon */}
          <div style={{ 
            width: '56px', 
            height: '56px', 
            background: '#fffff', 
            borderRadius: '14px',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' ,
            boxShadow: `
              0 4px 10px rgba(0, 0, 0, 0.25),
              0 1px 3px rgba(0, 0, 0, 0.25)
            `,
            overflow: 'hidden'

          }}>
            <img
              src="/images/favicon.png"
              alt="App icon"
              style={{
                width: '28px',
                height: '28px',
                objectFit: 'contain',
                transform: 'scale(2.7)'
              }}
            />
          </div>
          
          <div>
            <h6 className="fw-bold mb-0">Install Darul Uloom App</h6>
            <small className="text-muted">Get faster access & generic updates!</small>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setIsVisible(false)} // Dismiss for this session
          >
            Not Now
          </button>
          <button 
            className="btn btn-success btn-sm fw-bold"
            onClick={handleInstallClick}
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPopup;