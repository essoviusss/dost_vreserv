import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Auth/Login';
import EmpHome from './pages/Employee/EmpHome';
import EmpTrack from './pages/Employee/EmpTrack';
import DriverHome from './pages/Driver/DriverHome';
import EmpDashboard from './pages/Employee/EmpDashboard';
import EmpTravelRequest from './pages/Employee/EmpTravelRequest';
import EmpStep1 from './pages/Employee/EmpStep1';
import EmpStep2 from './pages/Employee/EmpStep2';
import EmpStep3 from './pages/Employee/EmpStep3';
import EmpStep4 from './pages/Employee/EmpStep4';
import EmpSummary from './pages/Employee/EmpSummary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/EmpHome" element={<EmpHome />} />
        <Route path="/DriverHome" element={<DriverHome />} />
        <Route path="/EmpDashboard" element={<EmpDashboard />} />
        <Route path="/EmpTravelRequest" element={<EmpTravelRequest />} />
        <Route path="/EmpStep1" element={<EmpStep1 />} />
        <Route path="/EmpStep2" element={<EmpStep2 />} />
        <Route path="/EmpStep3" element={<EmpStep3 />} />
        <Route path="/EmpStep4" element={<EmpStep4 />} />
        <Route path="/EmpTrack" element={<EmpTrack />} />
        <Route path="/EmpSummary" element={<EmpSummary />} />
        
      </Routes>
    </Router>
  );
}

export default App;
