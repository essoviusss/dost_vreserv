import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Login from './pages/Auth/Login';
import EmpHome from './pages/Employee/EmpHome';
import EmpRequestLogs from './pages/Employee/EmpRequestLogs';
import DriverHome from './pages/Driver/DriverHome';
import RoleGuard from './hooks/RoleGuard';
import EmpDashboard from './pages/Employee/EmpDashboard';
import EmpVehicleRequest from './pages/Employee/EmpVehicleRequest';
import EmpStep1 from './pages/Employee/EmpStep1';
import EmpStep2 from './pages/Employee/EmpStep2';
import EmpStep3 from './pages/Employee/EmpStep3';
import EmpStep4 from './pages/Employee/EmpStep4';
import EmpSummary from './pages/Employee/EmpSummary';
import DrvDashboard from './pages/Driver/DrvDashboard';
import DrvRequestLogs from './pages/Driver/DrvRequestLogs';
import EmpEditStep1 from './pages/Employee/EmpEditStep1';
import EmpEditStep2 from './pages/Employee/EmpEditStep2';
import { FormDataProvider } from './pages/Employee/FormDataContext';
import Sidebar from './Sidebar/Sidebar';
import DriverSidebar from './Sidebar/DriverSidebar';

function MainContent() {
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');

  if (location.pathname === '/') {
    return <Login />;
  }

  return (
    <div className="App" style={{ display: 'flex', backgroundColor: '#F4F7FE', minHeight: '100vh',}}>
      <div className="sidebar">
        {userRole === "Employee" ? <Sidebar /> : userRole === "Driver" ? <DriverSidebar /> : null} 
      </div>
      <div className="main-content" 
        style={{ 
        flex: 1,
        overflow: 'auto',
        paddingTop: 75,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        backgroundColor: '#F4F7FE',
        boxSizing: 'border-box',
        minHeight: '100%',
      }}>
        <Routes>
          <Route path="/EmpHome" element={<RoleGuard requiredRole="Employee" />}>
            <Route index element={<EmpHome />} />
          </Route>
          <Route path="/DriverHome" element={<RoleGuard requiredRole="Driver" />}>
            <Route index element={<DriverHome />} />
          </Route>

          <Route path="/EmpDashboard" element={<EmpDashboard />} />
          <Route path="/EmpVehicleRequest" element={<EmpVehicleRequest />} />
          <Route path="/EmpStep1" element={<EmpStep1 />} />
          <Route path="/EmpStep2" element={<EmpStep2 />} />
          <Route path="/EmpStep3" element={<EmpStep3 />} />
          <Route path="/EmpStep4" element={<EmpStep4 />} />
          <Route path="/EmpRequestLogs" element={<EmpRequestLogs />} />
          <Route path="/EmpEditStep1" element={<EmpEditStep1 />} />
          <Route path="/EmpEditStep2" element={<EmpEditStep2 />} />
          <Route path="/EmpSummary" element={<EmpSummary />} />
          <Route path="/DrvDashboard" element={<DrvDashboard />} />
          <Route path="/DrvRequestLogs" element={<DrvRequestLogs />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <FormDataProvider>
        <MainContent />
      </FormDataProvider>
    </Router>
  );
}

export default App;
