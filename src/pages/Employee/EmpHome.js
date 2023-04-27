import React from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
<<<<<<< Updated upstream:src/pages/Employee/EmployeeHome.js
import '../Employee/components/EmployeeHome.css';

export default function EmployeeHome(){
    // const navigate = useNavigate();
=======
import { useEffect } from 'react';
import '../Employee/components/EmpHome.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; 

export default function EmpHome(){
    const navigate = useNavigate();
    const isLoggedIn = useAuth(); // Use the useAuth hook

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!isLoggedIn && token === null) {
          navigate('/');
        }
      }, [isLoggedIn, navigate]);

      const logout = () => {
        localStorage.removeItem("token");
        alert("You have been logged out!");
        navigate("/", { replace: true });
      };
    
>>>>>>> Stashed changes:src/pages/Employee/EmpHome.js

    return(
        <div className="wrapper">
            <div className="sidebar">
                <h2>LOGO</h2>
                <ul>
                    <li>
                        <Link to="/EmpDashboard">Dashboard</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/EmpTravelRequest">Request</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/EmpTrack">Track</Link>
                    </li>
                </ul>

            </div>
            <div className="main_content">
<<<<<<< Updated upstream:src/pages/Employee/EmployeeHome.js
                <div className="header">Request for Use of Vehicle</div>
            <div className="info">
                <h4>Step 1: Choosing Date & Time, Vehicle and Driver</h4>
                <div className="container">
                    <div className="con-datetime"></div>
                    <p>DATE AND TIME</p>
                </div>
            </div>
=======
                <div className="header">
                    <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
                </div>
>>>>>>> Stashed changes:src/pages/Employee/EmpHome.js
            </div>
        </div>
    );
}

