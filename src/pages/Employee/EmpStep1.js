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
  const [departureDate, setDepartureDate] = useState(formData.departureDate || null);
  const [arrivalDate, setArrivalDate] = useState(formData.arrivalDate || null);
  const [selectedVehicle, setSelectedVehicle] = useState(formData.selectedVehicle || "");
  const [selectedDriver, setSelectedDriver] = useState(formData.selectedDriver || "");
  
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes(),
        seconds = '' + d.getSeconds();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hours.length < 2) 
        hours = '0' + hours;
    if (minutes.length < 2) 
        minutes = '0' + minutes;
    if (seconds.length < 2) 
        seconds = '0' + seconds;
  
    return [year, month, day].join('-') + ' ' + [hours, minutes, seconds].join(':');
  }
  

  useEffect(() =>{
    const fetchData = async () => {
      try{
        const url = "http://localhost/vreserv_api/pms_condition.php";
        let fData = new FormData();
        fData.append("selectedDate1", departureDate);
        fData.append("selectedDate2", arrivalDate);
        
        const response = await axios.post(url, fData);
        console.log(response.data.data.vehicles);
        console.log(response.data.data.drivers);
        if(Array.isArray(response.data.data.vehicles)){
          setVehicles(response.data.data.vehicles);
          setDrivers(response.data.data.drivers);
        }
      }catch(e){
        alert(e);
      }
    }
    fetchData();
  },[departureDate, arrivalDate, vehicles])
  

  const nextButton = () => {
    if(!departureDate || !arrivalDate  || selectedVehicle === "" || selectedDriver === ""){
      alert("Fill up all the fields!");
    } else{
      updateFormData("departureDate", departureDate);
      updateFormData("arrivalDate", arrivalDate);
      updateFormData("selectedVehicle", selectedVehicle);
      updateFormData("selectedDriver", selectedDriver);
      console.log(departureDate);
      navigate("/EmpStep2")
      window.scrollTo(0, 0);
    }
    
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
              value={departureDate}
              className="hidePickerButtons"
              orientation="landscape"
              onChange={(date) => {
                const formattedDate = formatDate(date);
                setDepartureDate(formattedDate);
              }}
              

            />
          </LocalizationProvider>
        </div>
        <div className="item4-step1">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              value={arrivalDate}
              className="hidePickerButtons"
              orientation="landscape"
              onChange={(date) => {
                const formattedDate = formatDate(date);
                setArrivalDate(formattedDate);
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="item5-step1">AVAILABLE VEHICLE</div>
        <div className="item6-step1">AVAILABLE DRIVER</div>
        <div className="item7-step1">
        <select value={selectedVehicle} onChange={(e) => setSelectedVehicle(e.target.value)}>
          <option>Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle} value={vehicle}>
              {vehicle}
            </option>
          ))}
        </select>
        </div>
        <div className="item8-step1">
          <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
            <option>Select Driver</option>
            {drivers.map((driver) => (
              <option value={driver}>
                {driver}
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
