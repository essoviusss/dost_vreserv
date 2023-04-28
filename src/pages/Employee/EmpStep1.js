import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';



export default function EmpStep1(){
    const navigate = useNavigate();


    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);



  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };


    return(
        <div>
            <div>
                <h3>Step 1: Choosing Date & Time, Vehicle and Driver</h3>

                <div>
                    <label>DATE AND TIME</label>                
                </div>

                <div>
                  <label>Departure</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDateTimePicker orientation="landscape" />
                    </LocalizationProvider>
                </div>

                <div>
                  <label>Arrival</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDateTimePicker orientation="landscape" />
                    </LocalizationProvider>
                </div>

                <div>
                    <label>Available Vehicle</label>
                    <div>
                        <select>
                            <option value="">Tricycle</option>
                        </select>
                    </div>    
                </div>

                <div>
                    <label>Available Driver</label>
                    <div>
                        <select>
                            <option value="">Abdullah Abaga</option>
                        </select>
                    </div>    
                </div>

                <div>
                    <button onClick={()=>navigate("/EmpStep2")}>Next</button>
                </div>

                

                
            </div>
        </div>
    );
}