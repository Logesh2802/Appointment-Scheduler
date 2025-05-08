import React, { useState } from 'react';

const BookingForm = ({ date, timeSlot, availabilityId, onBookingSuccess }) => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState(null);
  const [isBooked, setIsBooked] = useState(false); // ✅ flag to hide form

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      availability_id: availabilityId,
      name: form.name,
      email: form.email,
      date,
      time_slot: timeSlot,
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('Booking confirmed!');
        setForm({ name: '', email: '' });
        setIsBooked(true); // ✅ hide form
        onBookingSuccess(); // 🔄 refresh slots
      } else {
        const error = await res.json();
        setStatus(error.error || 'Booking failed.');
      }
    } catch (err) {
      setStatus('Something went wrong.');
    }
  };

  return (
    <div className="mt-3">
      <h5>Book Slot at {timeSlot}</h5>

      {!isBooked ? (
        <>
          <input
            className="form-control my-2"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
          />
          <input
            className="form-control my-2"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
          />
          <button className="btn btn-success" onClick={handleSubmit}>
            Confirm Booking
          </button>
        </>
      ) : (
        <div className="alert alert-success mt-2">{status}</div> // ✅ show only success message
      )}

      {!isBooked && status && <div className="mt-2 alert alert-info">{status}</div>}
    </div>
  );
};

export default BookingForm;
