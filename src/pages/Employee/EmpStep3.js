import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EmpHome from "./EmpHome";
import dayjs from "dayjs";

export default function EmpStep3(){
    const navigate = useNavigate();
    const location = useLocation();
    const {
        selectedVehicle,
        selectedDriver,
        departureDate,
        arrivalDate,
        address,
        purpose,
        numPassengers,
        passengerNames,
        requestedBy
    } = location.state;

    const departureDateString = dayjs(departureDate).format('MM/DD/YYYY h:mm A');
    const arrivalDateString = dayjs(arrivalDate).format('MM/DD/YYYY h:mm A');

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
                        <label>Destination:</label>
                        <label>{address}</label>
                    </div>
                    <div>
                        <label>{selectedVehicle}</label>
                        <label>Vehicle to be requested</label>
                    </div>

                    <div>
                        <label>{selectedDriver}</label>
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
                        <label>Departure</label>
                        <label>{departureDateString}</label>
                    </div>
                    <div>
                        <label>Arrival</label>
                        <label>{arrivalDateString}</label>
                    </div>                  
                </div>

                <div>
                    <div>
                        <label>OTHER DETAILS</label>
                    </div>

                    <div>
                        <label>Total No. of Passengers:</label>
                        <label>{numPassengers}</label>
                    </div>
                    <div>
                        <label>Name of Passenger/s:</label>
                        <label>{passengerNames}</label>
                    </div>
                    <div>
                        <label>Purpose:</label>
                        <label>{purpose}</label>
                    </div>
                    <div>
                        <label>Requested by:</label>
                        <label>{requestedBy}</label>
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