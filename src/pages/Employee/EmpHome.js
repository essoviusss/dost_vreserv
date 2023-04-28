import React from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
                        <Link to="/EmpTravelRequest">Travel Request</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/EmpTrack">Track</Link>
                    </li>
                </ul>
                

            </div>
            <div className="main_content">
                <div className="header">
                    <button onClick={logout} style={{ marginLeft: "10px" }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

