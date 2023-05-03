import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { useFormData } from "./FormDataContext";

function EmpStep1(){
    const { formData, updateFormData } = useFormData();

    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [drivers, setDrivers] = useState([]);

    //formdata
    const [departureDate, setDepartureDate] = useState(formData.departureDate || new Date().toISOString());
    const [arrivalDate, setArrivalDate] = useState(formData.arrivalDate || new Date().toISOString());
    const [selectedVehicle, setSelectedVehicle] = useState(formData.selectedVehicle || "");
    const [selectedDriver, setSelectedDriver] = useState(formData.selectedDriver || "");
    useEffect(() => {
      axios.get('http://localhost/vreserv_api/available_vehicle.php')
        .then(response => {
          setVehicles(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    useEffect(() => {
      axios.get('http://localhost/vreserv_api/available_driver.php')
        .then(response => {
          setDrivers(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    const nextButton = () => {
      updateFormData("departureDate", departureDate);
      updateFormData("arrivalDate", arrivalDate);
      updateFormData("selectedVehicle", selectedVehicle);
      updateFormData("selectedDriver", selectedDriver);
      navigate("/EmpStep2")
      // ...
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
                      <StaticDateTimePicker 
                      orientation="landscape"
                      onChange={(date) => setDepartureDate(date.toISOString())} 
                      />
                  </LocalizationProvider> 
                </div>

                <div>
                  <label>Arrival</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDateTimePicker 
                      orientation="landscape"
                      onChange={(date) => setArrivalDate(date.toISOString())} 
                      />
                  </LocalizationProvider> 
                </div>
                <div>
                    <label>Available Vehicle</label>
                    <div>
                      <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
                        <option>Select Vehicle</option>
                        {vehicles.map(vehicle => (
                          <option key={vehicle.vehicle_id} value={vehicle.vehicle_name}>
                            {vehicle.vehicle_name}
                          </option>
                        ))}
                      </select>
                    </div>    
                </div>
                <div>
                    <label>Available Driver</label>
                    <div>
                      <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
                        <option>Select Driver</option>
                        {drivers.map(driver => (
                          <option key={driver.driver_id} value={driver.driver_name}>
                            {driver.driver_name}
                          </option>
                        ))}
                      </select>
                    </div>    
                </div>

                <div>
                    <button onClick={nextButton}>Next</button>
                </div>
            </div>
        </div>
    );
}
export default EmpStep1;