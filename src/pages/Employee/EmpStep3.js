import React from "react";
import {useNavigate } from "react-router-dom";
import EmpHome from "./EmpHome";

export default function EmpStep3(){

    const navigate = useNavigate();

    return(
        <div>
            <EmpHome />
            <div className="main-content">
                <h3>Step 3: Review Inputted Details</h3>

                <div>
                    <div>
                        <img></img>
                    </div>
                    <div>
                        <label>A1M 904 HILUX</label>
                        <label>Vehicle to be requested</label>
                    </div>

                    <div>
                        <label>David H. LIM III</label>
                        <label>Name of the Driver</label>
                    </div>

                    <div>
                        <button>Edit</button>
                    </div>
                </div>
                

                <div>
                    <div>
                        <label>SCHEDULE OF TRAVEL</label>
                    </div>
                    <div>
                        <label>Date:</label>
                        <label>January 5-9, 2024</label>
                    </div>

                    <div>
                        <label>Time of Departure:</label>
                        <label>8:00 AM</label>
                    </div>
                    
                    <div>
                        <label>Time of Return to Garage:</label>
                        <label>5:00 PM</label>
                    </div>                  
                </div>

                <div>
                    <div>
                        <label>OTHER DETAILS</label>
                    </div>

                    <div>
                        <label>Total No. of Passengers:</label>
                        <label>2</label>
                    </div>
                    <div>
                        <label>Name of Passenger/s:</label>
                        <label>Juan Dela Cruz</label>
                        <label>Maria Dela Cruz</label>
                    </div>
                    <div>
                        <label>Purpose:</label>
                        <label>To collect materials</label>
                    </div>
                    <div>
                        <label>Requested by:</label>
                        <label>Juan Dela Cruz</label>
                    </div>
                </div>

                <div>
                    <label>Please review the details you entered and click “continue” if you wish to proceed with your request </label>
                </div>

                <button onClick={()=>navigate(-1)}>Back</button>
                <button onClick={()=>navigate("/EmpStep4")}>Continue</button>
            </div>
        </div>
    );
}