import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './pages/Auth/Login';
<<<<<<< Updated upstream
import EmployeeHome from './pages/Employee/EmployeeHome';
import Track from './pages/Employee/Track';


import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';


=======
import EmpHome from './pages/Employee/EmpHome';
import EmpTravelRequest from './pages/Employee/EmpTravelRequest';
import EmpStep1 from './pages/Employee/EmpStep1';
import EmpStep2 from './pages/Employee/EmpStep2';
import EmpStep3 from './pages/Employee/EmpStep3';
import EmpStep4 from './pages/Employee/EmpStep4';
import EmpDashboard from './pages/Employee/EmpDashboard';
import EmpTrack from './pages/Employee/EmpTrack';
>>>>>>> Stashed changes
function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream

        <Route path='/' element={<Login/>} />
        <Route path='/EmployeeHome' element={<EmployeeHome/>} /> 
        {/* <Route path='/RequestForm' element={<RequestForm/>} />
        <Route path='/Track' element={<Track/>} /> */}
        <Route path='/Track' element={<Track/>} />

        <Route path='/' element={<SignUp/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Home' element={<Home/>} />

=======
        <Route path="/" element={<Login />} />
        <Route path="/EmpHome" element={<EmpHome />} />
        <Route path="/EmpDashboard" element={<EmpDashboard />} />
        <Route path="/EmpTravelRequest" element={<EmpTravelRequest />} />
        <Route path="/EmpTrack" element={<EmpTrack />} />
        <Route path="/EmpStep1" element={<EmpStep1 />} />
        <Route path="/EmpStep2" element={<EmpStep2 />} />
        <Route path="/EmpStep3" element={<EmpStep3 />} />
        <Route path="/EmpStep4" element={<EmpStep4 />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
