import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { useFormData } from "./FormDataContext";
import '../Employee/components/EmpStep1.css';
import Footer from "../Employee/EmpFooter.js";
import Header from "../../header/header";
import '../GlobalCSS/content.css';

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
        if (Array.isArray(response.data)) {
          setVehicles(response.data);
        } else {
          console.error('Unexpected API response format:', response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    axios.get('http://localhost/vreserv_api/available_driver.php')
      .then(response => {
        if (Array.isArray(response.data)) {
          setDrivers(response.data);
        } else {
          console.error('Unexpected API response format:', response.data);
        }
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
    window.scrollTo(0, 0);
  };
    

  return (
    <div className="page-container">
      <Header />
      <div className="step1-text">Step 1: Choosing Date & Time, Vehicle, and Driver</div>
      <div className="grid-container-step1">
        <div className="item1-step1">DEPARTURE DATE AND TIME</div>
        <div className="item2-step1">ARRIVAL DATE AND TIME</div>
        <div className="item3-step1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              className="hidePickerButtons"
              orientation="landscape"
              onChange={(date) => setDepartureDate(date.toISOString())}
            />
          </LocalizationProvider>
        </div>
        <div className="item4-step1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              className="hidePickerButtons"
              orientation="landscape"
              onChange={(date) => setArrivalDate(date.toISOString())}
            />
          </LocalizationProvider>
        </div>
        <div className="item5-step1">AVAILABLE VEHICLE</div>
        <div className="item6-step1">AVAILABLE DRIVER</div>
        <div className="item7-step1">
          <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
            <option>Select Vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.vehicle_id} value={vehicle.vehicle_name}>
                {vehicle.vehicle_name}
              </option>
            ))}
          </select>
        </div>
        <div className="item8-step1">
          <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
            <option>Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver.driver_id} value={driver.driver_name}>
                {driver.driver_name}
              </option>
            ))}
          </select>
        </div>
        <div className="item9-step1">
          <div className="next-button-container">
            <button onClick={() => nextButton()} className="next-button">Next</button>
          </div>
        </div>
      </div>
      <div className="footer-box">
        <Footer activePage="EmpStep1" />
      </div>
    </div>
  );  
}
export default EmpStep1;