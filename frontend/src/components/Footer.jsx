import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white pt-5 pb-3" style={{ backgroundColor: '#00332a' }}>
      <div className="container">
        <div className="row">
          {/* Column 1: About */}
          <div className="col-md-4 mb-4">
            <h4 className="text-warning mb-3">Darul Uloom Online</h4>
            <p className="small text-white-50">
              Dedicated to spreading the light of Quran and Sunnah through modern technology.
              Join us to learn from qualified teachers from the comfort of your home.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white-50 text-decoration-none hover-white">Home</Link></li>
              <li><Link to="/courses" className="text-white-50 text-decoration-none hover-white">All Courses</Link></li>
              <li><Link to="/admissions" className="text-white-50 text-decoration-none hover-white">Admissions</Link></li>
              <li><Link to="/login" className="text-white-50 text-decoration-none hover-white">Admin Login</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Contact Us</h5>
            <p className="small text-white-50 mb-1">
              <i className="bi bi-whatsapp me-2 text-success"></i> +{process.env.REACT_APP_ADMIN_PHONE}
            </p>
            <p className="small text-white-50 mb-1">
              <i className="bi bi-envelope me-2 text-warning"></i> admissions@darululoom.online
            </p>
            <p className="small text-white-50">
              <i className="bi bi-geo-alt me-2 text-info"></i> Online Campus
            </p>
          </div>
        </div>

        <hr className="border-secondary" />
        
        {/* <div className="text-center small text-white-50">
          &copy; {new Date().getFullYear()} Darul Uloom Online. All Rights Reserved.
        </div> */}
        {/* --- COPYRIGHT & CREDIT SECTION --- */}
        <div className="text-center small text-white-50">
          <p className="mb-1">
            &copy; {new Date().getFullYear()} Darul Uloom Online. All Rights Reserved.
          </p>
          <p className="mb-0">
            Developed by{' '}
            <a 
              href="https://github.com/adabismail" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-decoration-none fw-semibold footer-credit"
            >
              Adab Ismail
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;