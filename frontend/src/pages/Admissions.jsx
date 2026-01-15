import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

const Admissions = () => {
  const location = useLocation();
  const incomingCourse = location.state?.courseTitle || '';

  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    courseAppliedFor: incomingCourse 
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  // Fetch Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/courses');
        setCourses(data);
        if (!incomingCourse && data.length > 0) {
          setFormData(prev => ({ ...prev, courseAppliedFor: data[0].title }));
        }
      } catch (err) { console.error("Error fetching courses", err); }
    };
    fetchCourses();
  }, [incomingCourse]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      const res = await axios.post('http://localhost:5000/api/admissions', formData);
      setSubmittedData({ ...formData, ...res.data });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const getWhatsAppLink = () => {
    if (!submittedData) return '#';
    const adminNumber = "916006711641"; 
    const text = `Assalamu Alaikum. My name is ${submittedData.firstName}. I have just applied for the ${submittedData.courseAppliedFor} course. My registered phone is ${submittedData.phone}.`;
    return `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      
      {/* HEADER */}
      <div className="text-white text-center py-5" style={{ backgroundColor: '#004d40' }}>
        <h1 className="display-5 fw-bold">Student Admission</h1>
        <p className="lead">Join us on this blessed journey of knowledge.</p>
      </div>

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="card-header bg-white text-center py-4 border-0">
                <h3 className="fw-bold" style={{ color: '#004d40' }}>Registration Form</h3>
                <p className="text-muted small mb-0">Fill in your details below</p>
              </div>
              
              <div className="card-body p-4 p-md-5">
                {/* --- VIEW 1: SUCCESS --- */}
                {submittedData ? (
                  <div className="text-center">
                    <div className="mb-4">
                      <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <h3 className="fw-bold text-success mb-3">Application Received!</h3>
                    <p className="text-muted">Your details have been securely recorded.</p>
                    
                    <div className="alert alert-light border shadow-sm my-4 text-start">
                      <small className="text-muted d-block fw-bold">Next Step:</small>
                      Please click the button below to send a confirmation message to our Admin via WhatsApp. This will finalize your seat.
                    </div>
                    
                    <a 
                      href={getWhatsAppLink()} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-success btn-lg w-100 rounded-pill shadow-sm hover-scale"
                      style={{ backgroundColor: '#25D366', borderColor: '#25D366' }}
                    >
                      <i className="bi bi-whatsapp me-2"></i> Confirm on WhatsApp
                    </a>
                  </div>
                ) : (
                  /* --- VIEW 2: FORM --- */
                  <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger rounded-3">{error}</div>}
                    
                    <div className="mb-4">
                      <label className="form-label fw-bold text-muted small">SELECT COURSE</label>
                      <select 
                        name="courseAppliedFor" 
                        className="form-select form-select-lg bg-light border-0" 
                        value={formData.courseAppliedFor} 
                        onChange={handleChange}
                        required
                      >
                        {courses.length === 0 && <option value="">Loading courses...</option>}
                        {courses.map(course => (
                          <option key={course._id} value={course.title}>{course.title}</option>
                        ))}
                      </select>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-muted small">FIRST NAME</label>
                        <input type="text" name="firstName" className="form-control bg-light border-0 py-2" onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-bold text-muted small">LAST NAME</label>
                        <input type="text" name="lastName" className="form-control bg-light border-0 py-2" onChange={handleChange} required />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold text-muted small">EMAIL ADDRESS</label>
                      <input type="email" name="email" className="form-control bg-light border-0 py-2" onChange={handleChange} required />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold text-muted small">PHONE / WHATSAPP</label>
                      <input type="text" name="phone" className="form-control bg-light border-0 py-2" onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn btn-warning w-100 py-3 rounded-pill fw-bold shadow-sm" style={{ color: '#004d40' }}>
                      Submit Application
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admissions;