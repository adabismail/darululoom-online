import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow" style={{ backgroundColor: '#004d40' }}> 
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/" style={{ fontFamily: 'Amiri, serif', color: '#FFD700' }}>
           DARUL ULOOM ONLINE
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-center align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white mx-2" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white mx-2" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white mx-2" to="/admissions">Admissions</Link>
            </li>
            <li className="nav-item">
              {/* Login Button */}
              <Link className="nav-link btn btn-warning text-dark fw-bold px-4 ms-lg-3 rounded-pill" to="/login" style={{ backgroundColor: '#FFD700', border: 'none' }}>
                Login (Admin)
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;