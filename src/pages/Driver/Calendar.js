import React, { useState } from 'react';
import './components/Calendar.css'

const Calendar = () => {
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(6);
  const [markedDates, setMarkedDates] = useState(['2023-06-28', '2023-06-29']);

  const renderCalendar = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const calendar = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const isMarked = markedDates.includes(date);
      const cellStyle = isMarked ? { backgroundColor: 'green' } : {};

      calendar.push(
        <div key={i} style={cellStyle} className="calendar-cell">
          {i}
        </div>
      );
    }

    return calendar;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setMonth(month - 1)}>&lt;</button>
        <h2>{`${year}-${month.toString().padStart(2, '0')}`}</h2>
        <button onClick={() => setMonth(month + 1)}>&gt;</button>
      </div>
      <div className="calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
    </div>
  );
};

export default Calendar;
