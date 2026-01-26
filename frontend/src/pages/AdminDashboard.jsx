import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const AdminDashboard = () => {
  const { admin, logout } = useContext(AuthContext);
  
  const [activeTab, setActiveTab] = useState('admissions'); 

  // --- ADMISSIONS STATE ---
  const [students, setStudents] = useState([]);
  
  // --- COURSES STATE ---
  const [courses, setCourses] = useState([]);
  
  // --- EDITING STATE ---
  const [editingCourseId, setEditingCourseId] = useState(null);

  const [newCourse, setNewCourse] = useState({ 
    title: '', 
    description: '', 
    duration: '', 
    fee: '' 
  });

  // SECURITY HELPER
  const getAuthConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${admin?.token}`, 
      },
    };
  };

  // API URL Helper
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Load Data
  useEffect(() => {
    if (admin) {
      fetchStudents();
      fetchCourses();
    }
    // eslint-disable-next-line
  }, [admin]);

  const fetchStudents = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/admissions`, getAuthConfig());
      setStudents(data);
    } catch (err) { 
      console.error("Error loading students", err);
      if (err.response?.status === 401) {
        logout();
      }
    }
  };

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/courses`);
      setCourses(data);
    } catch (err) { console.error("Error loading courses", err); }
  };

  // --- ACTIONS ---
  const updateStatus = async (student, newStatus) => {
    // FIX 1: Use 'studentName' instead of 'firstName'
    if(!window.confirm(`Mark ${student.studentName} as ${newStatus}?`)) return;
    try {
      await axios.put(
        `${API_URL}/admissions/${student._id}`, 
        { status: newStatus }, 
        getAuthConfig()
      );
      fetchStudents(); 
      if (newStatus === 'Approved') {
        // FIX 2: Correct variable in WhatsApp message
        const message = `Assalamu Alaikum ${student.studentName}, your admission for ${student.courseAppliedFor} has been APPROVED.`;
        window.open(`https://wa.me/${student.phone}?text=${encodeURIComponent(message)}`, '_blank');
      }
    } catch (error) { alert("Error updating status"); }
  };

  const handleDeleteStudent = async (id) => {
    if(!window.confirm('Delete this application?')) return;
    try {
      await axios.delete(`${API_URL}/admissions/${id}`, getAuthConfig());
      fetchStudents();
    } catch (error) { 
      console.error(error);
      alert('Error deleting.'); 
    }
  };

  // --- UNIFIED SUBMIT (ADD OR UPDATE) ---
  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourseId) {
        // UPDATE MODE
        await axios.put(
          `${API_URL}/courses/${editingCourseId}`, 
          newCourse, 
          getAuthConfig()
        );
        alert('Course Updated Successfully!');
      } else {
        // ADD MODE
        await axios.post(`${API_URL}/courses`, newCourse, getAuthConfig());
        alert('Course Added Successfully!');
      }
      
      // Reset Form
      setNewCourse({ title: '', description: '', duration: '', fee: '' }); 
      setEditingCourseId(null);
      fetchCourses(); 
    } catch (error) { 
      console.error(error);
      alert(error.response?.data?.message || 'Error saving course'); 
    }
  };

  // --- PREPARE EDIT ---
  const handleEditClick = (course) => {
    setEditingCourseId(course._id);
    setNewCourse({
      title: course.title,
      description: course.description,
      duration: course.duration,
      fee: course.fee
    });
  };

  // --- CANCEL EDIT ---
  const handleCancelEdit = () => {
    setEditingCourseId(null);
    setNewCourse({ title: '', description: '', duration: '', fee: '' });
  };

  const handleDeleteCourse = async (id) => {
    if(!window.confirm('Delete this course?')) return;
    try {
      await axios.delete(`${API_URL}/courses/${id}`, getAuthConfig());
      if (editingCourseId === id) handleCancelEdit();
      fetchCourses();
    } catch (error) { alert('Error deleting course'); }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        
        {/* SIDEBAR */}
        <div className="col-md-3 col-lg-2 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white text-center">
              <h5>Admin Menu</h5>
            </div>
            <div className="list-group list-group-flush">
              <button className={`list-group-item list-group-item-action ${activeTab === 'admissions' ? 'active bg-success border-success' : ''}`} onClick={() => setActiveTab('admissions')}>
                <i className="bi bi-people me-2"></i> Student Admissions
              </button>
              <button className={`list-group-item list-group-item-action ${activeTab === 'courses' ? 'active bg-success border-success' : ''}`} onClick={() => setActiveTab('courses')}>
                <i className="bi bi-book me-2"></i> Manage Courses
              </button>
              <button onClick={logout} className="list-group-item list-group-item-action text-danger fw-bold">
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="col-md-9 col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>{activeTab === 'admissions' ? 'Admissions Dashboard' : 'Course Management'}</h2>
            <span>Welcome, <strong>{admin?.name}</strong></span>
          </div>

          {/* VIEW 1: STUDENTS */}
          {activeTab === 'admissions' && (
            <div className="card shadow">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        {/* UPDATE: New Table Headers */}
                        <th>Student Details</th>
                        <th>Address</th>
                        <th>Course</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Chat</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((std) => (
                        <tr key={std._id}>
                          {/* COLUMN 1: Name, Father's Name, Phone */}
                          <td>
                            <div className="fw-bold">{std.studentName}</div>
                            <small className="text-muted d-block">Father: {std.fatherName}</small>
                            <small className="text-success"><i className="bi bi-telephone"></i> {std.phone}</small>
                          </td>
                          
                          {/* COLUMN 2: Address */}
                          <td style={{ maxWidth: '200px' }}>
                            <small className="text-secondary">{std.address}</small>
                          </td>

                          <td><span className="badge bg-info text-dark">{std.courseAppliedFor}</span></td>
                          <td>
                            <span className={`badge ${std.status === 'Approved' ? 'bg-success' : std.status === 'Rejected' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                              {std.status || 'Pending'}
                            </span>
                          </td>
                          <td>
                            <button onClick={() => updateStatus(std, 'Approved')} className="btn btn-sm btn-outline-success me-1" title="Approve">✓</button>
                            <button onClick={() => updateStatus(std, 'Rejected')} className="btn btn-sm btn-outline-danger" title="Reject">✗</button>
                          </td>
                          <td>
                            <a href={`https://wa.me/${std.phone}`} target="_blank" rel="noreferrer" className="btn btn-success btn-sm">
                              <i className="bi bi-whatsapp"></i> Chat
                            </a>
                          </td>
                          <td>
                            <button onClick={() => handleDeleteStudent(std._id)} className="btn btn-danger btn-sm">
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && <tr><td colSpan="7" className="text-center py-4 text-muted">No student applications yet.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: COURSES */}
          {activeTab === 'courses' && (
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className={`card shadow ${editingCourseId ? 'border-primary' : 'border-success'}`}>
                  
                  {/* Dynamic Header */}
                  <div className={`card-header text-white ${editingCourseId ? 'bg-primary' : 'bg-success'}`}>
                    {editingCourseId ? 'Edit Course' : 'Add New Course'}
                  </div>
                  
                  <div className="card-body">
                    <form onSubmit={handleCourseSubmit}>
                      <div className="mb-2">
                        <label>Course Title</label>
                        <input type="text" className="form-control" required value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} />
                      </div>
                      
                      <div className="mb-2">
                        <label>Course Fee</label>
                        <input type="text" className="form-control" placeholder="e.g. Free or $50" required value={newCourse.fee} onChange={(e) => setNewCourse({...newCourse, fee: e.target.value})} />
                      </div>
                      
                      <div className="mb-2">
                        <label>Duration</label>
                        <input type="text" className="form-control" placeholder="e.g. 6 Months" required value={newCourse.duration} onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})} />
                      </div>
                      <div className="mb-2">
                        <label>Description</label>
                        <textarea className="form-control" rows="3" required value={newCourse.description} onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}></textarea>
                      </div>
                      
                      {/* Dynamic Button */}
                      <button type="submit" className={`btn w-100 ${editingCourseId ? 'btn-primary' : 'btn-success'}`}>
                        {editingCourseId ? 'Update Course' : 'Add Course'}
                      </button>

                      {/* Cancel Button */}
                      {editingCourseId && (
                        <button type="button" onClick={handleCancelEdit} className="btn btn-secondary w-100 mt-2">
                          Cancel Edit
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="card shadow">
                  <div className="card-header bg-dark text-white">Existing Courses</div>
                  <ul className="list-group list-group-flush">
                    {courses.map(course => (
                      <li key={course._id} className={`list-group-item d-flex justify-content-between align-items-center ${editingCourseId === course._id ? 'bg-light border-start border-4 border-primary' : ''}`}>
                        <div>
                          <strong>{course.title}</strong>
                          <br /><small className="text-muted">{course.duration} • {course.fee}</small>
                        </div>
                        <div>
                          <button onClick={() => handleEditClick(course)} className="btn btn-sm btn-outline-primary me-2">
                             Edit
                          </button>
                          <button onClick={() => handleDeleteCourse(course._id)} className="btn btn-sm btn-danger">
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                    {courses.length === 0 && <li className="list-group-item text-muted">No courses added yet.</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;