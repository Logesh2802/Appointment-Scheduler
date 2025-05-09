
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="d-flex flex-column vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid justify-content-between">
          <span className="navbar-brand fw-bold fs-4">Admin Dashboard</span>
          <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Full-width content */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-light">
        <div className="container-fluid px-4">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <h2 className="mb-4 text-dark text-center">Welcome, Admin 👋</h2>
              <div className="card shadow border-0">
                <div className="card-body text-center">
                  <h5 className="card-title mb-3">Manage Availability</h5>
                  <p className="text-muted">Set available dates and time slots for users to book.</p>
                  <Link to="/admin/manage-availability" className="btn btn-success px-4">Go to Availability</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-2 mt-auto">
        <small>© {new Date().getFullYear()} Appointment Scheduler Admin</small>
      </footer>
    </div>
  );
};

export default AdminDashboard;
