import React, { useEffect, useState } from 'react';
import BookingForm from './BookingForm';

const SlotSelector = ({ date }) => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const fetchSlots = () => {
    if (date) {
      fetch(`http://127.0.0.1:8000/api/availabilities/${date}`)
        .then((res) => res.json())
        .then((data) => setSlots(data))
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchSlots();
    setSelectedSlot(null); // Reset selected slot on date change
  }, [date]);

  return (
    <div>
      <h5>Available Time Slots</h5>
      <div className="d-flex text-center flex-wrap gap-2 mb-3">
        {slots.length > 0 ? (
          slots.map((slot) => (
            <button
              key={slot.id}
              className={`btn ${slot.is_booked ? 'btn-outline-danger' : 'btn-outline-primary'}`}
              onClick={() => setSelectedSlot(slot)}
              disabled={slot.is_booked}
            >
              {slot.start_time} - {slot.end_time}
            </button>
          ))
        ) : (
          <p>No slots available.</p>
        )}
      </div>

      {selectedSlot && (
        <BookingForm
          date={date}
          timeSlot={`${selectedSlot.start_time} - ${selectedSlot.end_time}`}
          availabilityId={selectedSlot.id}
          onBookingSuccess={fetchSlots} // 🔁 pass refresh function
        />
      )}
    </div>
  );
};

export default SlotSelector;
