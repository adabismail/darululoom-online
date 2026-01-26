import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // 1. Import the Context

const Navbar = () => {
  // 2. Get the admin state from the "Global Brain" (Context)
  const { admin } = useContext(AuthContext);

  // Function to collapse the navbar when a link is clicked
  const handleLinkClick = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: true
      });
      bsCollapse.hide();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow" style={{ backgroundColor: '#004d40' }}> 
      <div className="container">
        {/* BRAND LOGO */}
        <Link className="navbar-brand fw-bold fs-3" to="/" onClick={handleLinkClick} style={{ fontFamily: 'Amiri, serif', color: '#FFD700' }}>
           DARUL ULOOM ONLINE
        </Link>
        
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center align-items-center">
            
            <li className="nav-item">
              <Link className="nav-link text-white mx-2" to="/" onClick={handleLinkClick}>Home</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link text-white mx-2" to="/courses" onClick={handleLinkClick}>Courses</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link text-white mx-2" to="/admissions" onClick={handleLinkClick}>Admissions</Link>
            </li>

            {/* 3. CONDITIONAL BUTTON LOGIC */}
            <li className="nav-item">
              {admin ? (
                // IF LOGGED IN: SHOW DASHBOARD BUTTON
                <Link 
                  className="btn btn-warning text-dark fw-bold px-4 ms-lg-3 rounded-pill" 
                  to="/admin/dashboard" 
                  onClick={handleLinkClick}
                  style={{ backgroundColor: '#FFD700', border: 'none' }}
                >
                  Dashboard
                </Link>
              ) : (
                // IF LOGGED OUT: SHOW LOGIN BUTTON
                <Link 
                  className="btn btn-warning text-dark fw-bold px-4 ms-lg-3 rounded-pill" 
                  to="/login" 
                  onClick={handleLinkClick}
                  style={{ backgroundColor: '#FFD700', border: 'none' }}
                >
                  Admin Login
                </Link>
              )}
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;