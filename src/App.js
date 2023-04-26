import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './pages/Auth/Login';
import EmployeeHome from './pages/Employee/EmployeeHome';
import Track from './pages/Employee/Track';



function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Login/>} />
        <Route path='/EmployeeHome' element={<EmployeeHome/>} /> 
        {/* <Route path='/RequestForm' element={<RequestForm/>} />
        <Route path='/Track' element={<Track/>} /> */}
        <Route path='/Track' element={<Track/>} />

        

      </Routes>
    </Router>
  );
}

export default App;
