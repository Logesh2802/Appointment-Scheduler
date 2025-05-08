import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CalendarPicker from './components/CalendarPicker';
import SlotSelector from './components/SlotSelector';
import BookingForm from './components/BookingForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ManageAvailability from './components/ManageAvailability';
import UserBooking from './components/UserBooking';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// User Booking Flow Component


function App() {
  // State to handle login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on initial render
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) setIsLoggedIn(true);
  }, []);

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true); // Trigger re-render after login
  };

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<UserBooking />} />

        {/* Admin Login Route with redirect if already logged in */}
        <Route
          path="/admin/login"
          element={
            isLoggedIn ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={handleLogin} />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            isLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" />
          }
        />
        <Route
          path="/admin/manage-availability"
          element={
            isLoggedIn ? <ManageAvailability /> : <Navigate to="/admin/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
