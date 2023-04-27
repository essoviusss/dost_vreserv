import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Auth/Login';
import EmployeeHome from './pages/Employee/EmployeeHome';
import Track from './pages/Employee/Track';
import DriverHome from './pages/Driver/DriverHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EmployeeHome" element={<EmployeeHome />} />
        <Route path="/DriverHome" element={<DriverHome />} />
        {/* <Route path='/RequestForm' element={<RequestForm/>} /> */}
        <Route path="/Track" element={<Track />} />
      </Routes>
    </Router>
  );
}

export default App;
