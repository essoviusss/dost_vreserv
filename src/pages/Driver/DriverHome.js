import React from "react";
// import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import '../Employee/components/EmpHome.css';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; 


export default function DrvHome(){

    const navigate = useNavigate();
    const isLoggedIn = useAuth(); 

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

