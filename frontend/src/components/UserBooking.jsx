import React, { useState } from 'react';
import CalendarPicker from './CalendarPicker';
import SlotSelector from './SlotSelector';
import BookingForm from './BookingForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserBooking() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
  
    return (
      <div className="d-flex flex-grow-1 flex-column vh-100">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid justify-content-between">
            <span className="navbar-brand fw-bold fs-4">Book Appointment</span>
          </div>
        </nav>
  
      <div className="container text-center flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        
        <h2 className="text-danger">Appointment Scheduler</h2>
        <CalendarPicker onDateSelect={setSelectedDate} />
        {selectedDate && !selectedSlot && (
          <SlotSelector date={selectedDate} onSlotSelect={setSelectedSlot} />
        )}
        {selectedSlot && (
          <BookingForm date={selectedDate} timeSlot={selectedSlot} />
        )}
      </div>
      <footer className="bg-dark text-white text-center py-2 mt-auto">
        <small>© {new Date().getFullYear()} Appointment Scheduler</small>
      </footer>
      </div>
    );
  }

export default UserBooking
