import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State to track which course ID is currently expanded (for description)
  const [expandedCourseId, setExpandedCourseId] = useState(null);

  // 1. API URL Helper
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // 2. Use the variable
        const { data } = await axios.get(`${API_URL}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [API_URL]); // Add dependency

  // Helper function to toggle the view
  const toggleDescription = (id) => {
    if (expandedCourseId === id) {
      setExpandedCourseId(null); 
    } else {
      setExpandedCourseId(id); 
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      
      {/* --- PAGE HEADER --- */}
      <div className="bg-success text-white text-center py-5" style={{ backgroundColor: '#004d40' }}>
        <h1 className="display-4 fw-bold">Our Courses</h1>
        <p className="lead">Explore our spiritual and educational programs designed for all levels.</p>
      </div>

      <div className="container my-5 flex-grow-1">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}></div>
            <p className="mt-3 text-muted">Loading courses...</p>
          </div>
        ) : (
          <div className="row g-4">
            {courses.map((course) => {
              const isExpanded = expandedCourseId === course._id;
              const isLongText = course.description && course.description.length > 100;

              return (
                <div key={course._id} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm hover-effect">
                    <div className="card-header bg-white border-0 pt-4 pb-0 text-center">
                      <div className="mb-2">
                        {course.title.toLowerCase().includes('hifz') ? <i className="bi bi-book fs-1 text-success"></i> :
                         course.title.toLowerCase().includes('tajweed') ? <i className="bi bi-mic fs-1 text-success"></i> :
                         <i className="bi bi-mortarboard fs-1 text-success"></i>}
                      </div>
                      <h4 className="card-title fw-bold text-dark">{course.title}</h4>
                    </div>
                    <div className="card-body text-center d-flex flex-column">
                      <div className="mb-3">
                        <span className="badge bg-light text-dark border me-2">
                          <i className="bi bi-clock me-1"></i> {course.duration}
                        </span>
                        <span className="badge bg-warning text-dark">
                          {course.fee}
                        </span>
                      </div>
                      <div className="card-text text-muted small flex-grow-1 text-start px-2">
                        {isExpanded ? (
                          <span>{course.description} </span>
                        ) : (
                          <span>
                            {course.description ? course.description.substring(0, 100) : ''}
                            {isLongText && "..."}
                          </span>
                        )}
                        {isLongText && (
                          <span 
                            onClick={() => toggleDescription(course._id)}
                            className="text-success fw-bold ms-1" 
                            style={{ cursor: 'pointer', fontSize: '0.9em' }}
                          >
                            {isExpanded ? "(Show Less)" : "More"}
                          </span>
                        )}
                      </div>
                      
                      <Link 
                        to="/admissions" 
                        state={{ courseTitle: course.title }} 
                        className="btn btn-outline-success mt-4 w-100 rounded-pill fw-bold"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {courses.length === 0 && (
              <div className="text-center w-100 py-5">
                <h3 className="text-muted">No courses available at the moment.</h3>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Courses;