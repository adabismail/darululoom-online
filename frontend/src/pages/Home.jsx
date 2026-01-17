import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'; // Import the new Footer

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      
      {/* --- HERO SECTION --- */}
      <div 
        className="text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 50, 40, 0.85), rgba(0, 50, 40, 0.85)), url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1964')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '85vh',
        }}
      >
        <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill fw-bold">Open for 2026 Admissions</span>
        <h1 className="display-2 fw-bold mb-3">Darul Uloom Online</h1>
        <p className="lead mb-5 px-3" style={{ maxWidth: '700px', fontSize: '1.25rem' }}>
          Connect with the Quran. Learn Tajweed, Hifz, and Islamic Studies 
          with qualified tutors from the comfort of your home.
        </p>
        
        <div className="d-flex gap-3 flex-wrap justify-content-center">
          <Link to="/courses" className="btn btn-warning btn-lg px-5 fw-bold text-dark shadow hover-scale">
            View Courses
          </Link>
          <Link to="/admissions" className="btn btn-outline-light btn-lg px-5 fw-bold shadow">
            Apply Now
          </Link>
        </div>
      </div>

      {/* --- POPULAR PROGRAMS (Static Preview) --- */}
      <div className="container my-5 pt-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-success">Our Popular Programs</h2>
          <p className="text-muted">Choose a path that suits your spiritual goals</p>
        </div>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 hover-effect text-center">
              <h3 className="fw-bold">Nazira Quran</h3>
              <p className="text-muted small">For Beginners</p>
              <hr className="mx-auto w-25 text-success" />
              <p>Learn to read the Quran with proper pronunciation (Makharij) from the very basics.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 hover-effect text-center" style={{ borderBottom: '4px solid #004d40' }}>
              <h3 className="fw-bold text-success">Hifz Program</h3>
              <p className="text-muted small">Memorization</p>
              <hr className="mx-auto w-25 text-success" />
              <p>A structured program for memorizing the Holy Quran with regular revision and testing.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm p-4 hover-effect text-center">
              <h3 className="fw-bold">Islamic Studies</h3>
              <p className="text-muted small">Fiqh & Seerah</p>
              <hr className="mx-auto w-25 text-success" />
              <p>Understand the essentials of Islam, daily prayers (Salah), and the life of the Prophet (PBUH).</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to="/courses" className="btn btn-outline-success">View All Available Courses &rarr;</Link>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="bg-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
               <img 
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2070" 
                alt="Quran Study" 
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
            <div className="col-md-6 ps-md-5">
              <h2 className="fw-bold text-success mb-4">Why Students Trust Us?</h2>
              
              <div className="d-flex mb-4">
                <div className="me-3"><i className="bi bi-camera-video fs-2 text-warning"></i></div>
                <div>
                  <h5 className="fw-bold">1-on-1 Live Classes</h5>
                  <p className="text-muted">Personalized attention for every student to ensure correct recitation.</p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="me-3"><i className="bi bi-clock fs-2 text-warning"></i></div>
                <div>
                  <h5 className="fw-bold">Flexible Timings</h5>
                  <p className="text-muted">We schedule classes around your life, 24/7 availability.</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="me-3"><i className="bi bi-patch-check fs-2 text-warning"></i></div>
                <div>
                  <h5 className="fw-bold">Certified Tutors</h5>
                  <p className="text-muted">Our teachers are Huffaz and Alims with years of teaching experience.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* --- MEET THE INSTRUCTOR SECTION --- */}
      <div className="py-5" style={{ backgroundColor: '#fdfdfd' }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            
            {/* Image Column */}
            <div className="col-md-5 text-center mb-4 mb-md-0">
              <div className="instructor-img-wrapper d-inline-block position-relative">
                <div className="position-absolute top-50 start-50 translate-middle rounded-circle" 
                     style={{ width: '102%', height: '102%', border: '3px solid #FFD700', zIndex: 0 }}></div>
                
                <img 
                  src="/images/teacher.png" 
                  alt="Moulvi Sahib" 
                  className="img-fluid rounded-circle shadow-lg position-relative"
                  style={{ width: '300px', height: '300px', objectFit: 'cover', border: '5px solid white', zIndex: 1, filter: 'contrast(1.1) blur(0.5px)', transform: 'translateZ(0)'}}
                />
              </div>
            </div>

            {/* Text Column */}
            <div className="col-md-6 text-center text-md-start">
              <span className="text-uppercase fw-bold text-muted small tracking-wide">
                Head Instructor & Founder
              </span>
              <h2 className="display-6 fw-bold text-success mt-2 mb-3" style={{ fontFamily: 'Amiri, serif' }}>
                Mufti Feroze Shah
              </h2>
              <div className="mb-4" style={{ width: '60px', height: '3px', backgroundColor: '#FFD700', margin: '0 auto 0 0' }}></div>
              
              <p className="lead text-dark">
                "My goal is to make Quranic education accessible and personal for every student."
              </p>
              
              <p className="text-muted">
                With over <strong>X years of experience</strong> in teaching Tajweed and Islamic Studies, 
                <strong>Mufti Feroze</strong> is dedicated to preserving the traditional methods of teaching while embracing modern online tools.
              </p>

              {/* Qualifications List */}
              <ul className="list-unstyled mt-4 text-start d-inline-block">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-warning me-2"></i> Hafiz-ul-Quran</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-warning me-2"></i> Alim Degree from [Institution Name]</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-warning me-2"></i> Ijazah in Tajweed</li>
              </ul>
              
            </div>

          </div>
        </div>
      </div>

      {/* --- QURAN VERSE --- */}
      <div className="text-white py-5 text-center" style={{ backgroundColor: '#004d40' }}>
        <div className="container">
          <i className="bi bi-quote fs-1 text-warning"></i>
          <figure className="text-center">
            <blockquote className="blockquote">
              <p className="mb-3 fs-3 fst-italic" style={{ fontFamily: 'Amiri, serif' }}>
                "The best among you are those who learn the Quran and teach it."
              </p>
            </blockquote>
            <figcaption className="blockquote-footer text-white-50 mt-2">
              Prophet Muhammad (PBUH) <cite title="Source">Sahih Al-Bukhari</cite>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* --- FOOTER COMPONENT --- */}
      <Footer />
    </div>
  );
};

export default Home;