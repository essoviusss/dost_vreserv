import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Auth/Login';
import EmpHome from './pages/Employee/EmpHome';
import Track from './pages/Employee/Track';
import DriverHome from './pages/Driver/DriverHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EmpHome" element={<EmpHome />} />
        <Route path="/DriverHome" element={<DriverHome />} />
        {/* <Route path='/RequestForm' element={<RequestForm/>} /> */}
        <Route path="/Track" element={<Track />} />
      </Routes>
    </Router>
  );
}

export default App;
