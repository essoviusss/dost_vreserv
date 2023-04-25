import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp/>} />
        <Route path='/Login' element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
