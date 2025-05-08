<<<<<<< HEAD
import React from 'react';

function Calendar({ onDateSelect }) {
  return <input type="date" onChange={(e) => onDateSelect(e.target.value)} className="border p-2 w-full mb-4" />;
}

=======
import React from 'react';

function Calendar({ onDateSelect }) {
  return <input type="date" onChange={(e) => onDateSelect(e.target.value)} className="border p-2 w-full mb-4" />;
}

>>>>>>> 18fc00155739646002e3b9450692c8122992d2a7
export default Calendar