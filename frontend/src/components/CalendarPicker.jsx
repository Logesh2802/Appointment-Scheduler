
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPicker = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());

  const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (value) => {
    setDate(value);
    onDateSelect(formatDateLocal(value));
  };

  return (
    <div className="mb-3">
      <h5>Select a Date</h5>
      <Calendar onChange={handleChange} value={date} />
    </div>
  );
};

export default CalendarPicker;
