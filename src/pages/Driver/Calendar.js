import React, { useEffect, useState } from 'react';
import './components/Calendar.css';
import { BASE_URL } from '../../constants/api_url';
import axios from 'axios';

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [markedDates, setMarkedDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${BASE_URL}/read_drv_request.php`;
        const userId = localStorage.getItem('userId');
  
        let formData = new FormData();
        formData.append('user_id', userId);
  
        const response = await axios.post(url, formData);
        if (Array.isArray(response.data.dateRange)) {
          const groupedDates = response.data.data.reduce((acc, obj) => {
            const dates = obj.date_range.split(',').map(date => date.trim());
            acc.push({
              dates,
              request_status: obj.request_status
            });
            return acc;
          }, []);
          console.log(groupedDates);
          setMarkedDates(groupedDates);
        }
      } catch (e) {
        alert(e);
      }
    };
    fetchData();
  }, []);

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  const handlePreviousMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const calendar = [];
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const markedDateObj = markedDates.find(obj => obj.dates.includes(date));
  
      let cellStyle = {
        borderRadius: '50px',
        width: '35px',
        height: '35px',
      };
      if (markedDateObj) {
        if (markedDateObj.request_status === 'Pending') {
          cellStyle.backgroundColor = '#ffe1a1';
        } else if (markedDateObj.request_status === 'Approved') {
          cellStyle.backgroundColor = '#BCF5BE';
        } else if (markedDateObj.request_status === 'For Approval'){
          cellStyle.backgroundColor = '#9ED1FF';
        }
      }
  
      calendar.push(
        <div key={i} style={cellStyle} className="calendar-cell">
          {i}
        </div>
      );
    }
  
    return calendar;
  };  

  const getMonthName = (month) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month - 1];
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <div className='calendar-month'>{`${getMonthName(month)} ${year}`}</div>
        <button onClick={handleNextMonth}>&gt;</button>
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
