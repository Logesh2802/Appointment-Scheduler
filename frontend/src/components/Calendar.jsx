
import React from 'react';

function Calendar({ onDateSelect }) {
  return <input type="date" onChange={(e) => onDateSelect(e.target.value)} className="border p-2 w-full mb-4" />;
}

export default Calendar
