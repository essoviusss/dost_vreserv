import React from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../Employee/components/EmployeeHome.css';

export default function EmployeeHome(){
    // const navigate = useNavigate();

    return(
        <div className="wrapper">
            <div className="sidebar">
                <h2>LOGO</h2>
                <ul>
                    <li>
                        <Link to="/Dashboard">Dashboard</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/RequestForm">Request</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/Track">Track</Link>
                    </li>
                </ul>

            </div>
            <div className="main_content">
                <div className="header">Request for Use of Vehicle</div>
            <div className="info">
                <h4>Step 1: Choosing Date & Time, Vehicle and Driver</h4>
                <div className="container">
                    <div className="con-datetime"></div>
                    <p>DATE AND TIME</p>
                </div>
            </div>
            </div>
        </div>
    );
}

            // {/* Homepage pero navbar lang present dapat */}
            // <button onClick={()=>navigate(-1)}>Back</button>
            // <nav>
            //     <p>Request for use of vehicle</p>
            //     <ul>
            //         <li>
            //             <Link to="/RequestForm">Request</Link>
            //         </li>
            //         <li>
            //             <Link to="/Track">Track</Link>
            //         </li>
            //     </ul>
            // </nav>
            // <Outlet/>