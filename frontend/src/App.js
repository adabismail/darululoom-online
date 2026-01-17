import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import WhatsAppBtn from './components/WhatsAppBtn';
import Admissions from './pages/Admissions';
import Login from './pages/Login';
import Courses from './pages/Courses';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import './App.css';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/courses" element={<Courses />} />
            
            {/* --- FIX IS HERE: Change "/login" to "/admin/login" --- */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />
            {/* ----------------------------------------------------- */}

            {/* PROTECTED ADMIN ROUTE */}
            <Route element={<PrivateRoute />}>
               <Route path="/admin" element={<AdminDashboard />} />
               <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

          </Routes>
          <WhatsAppBtn />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;