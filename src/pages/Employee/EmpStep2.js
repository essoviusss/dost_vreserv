import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useFormData } from "./FormDataContext";
import '../Employee/components/EmpStep2.css';
import Header from "../../header/header";
import Footer from "../Employee/EmpFooter.js";
import '../GlobalCSS/content.css';
import { API_KEY } from "../../constants/maps_api";

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 16.608013,
  lng: 120.315877,
};



function EmpStep2() {
  const { formData, updateFormData } = useFormData();
  const navigate = useNavigate();

  // Value from Step 1
  const [loc, setLoc] = useState(defaultCenter);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // FormData
  const [address, setAddress] = useState(formData.address || '');
  const [purpose, setPurpose] = useState(formData.purpose || '');
  const [numPassengers, setNumPassengers] = useState(formData.numPassengers || 0);
  const [passengerNames, setPassengerNames] = useState(formData.passengerNames || []);
  const [requestedBy, setRequestedBy] = useState(formData.requestedBy || []);

  const handleNumPassengersChange = (e) => {
    const num = parseInt(e.target.value, 10);
    if (isNaN(num) || num < 0) {
      setNumPassengers(0);
      setPassengerNames([]);
    } else {
      const clampedNum = Math.min(num, 20);
      setNumPassengers(clampedNum);
      const tempPassengerNames = Array(clampedNum).fill('');
      setPassengerNames(tempPassengerNames);
    }
  };

  const handlePassengerNameChange = (e, index) => {
    const updatedPassengerNames = [...passengerNames];
    updatedPassengerNames[index] = e.target.value;
    setPassengerNames(updatedPassengerNames);
  };

  const handleMapClick = async (e) => {
    const newLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setLoc(newLocation);

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLocation.lat},${newLocation.lng}&key=${API_KEY}`
    );

    if (response.data.results[0]) {
      setAddress(response.data.results[0].formatted_address);
    } else {
      setAddress('Address not found');
    }
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);
  };

  const handleMapUnmount = () => {
    setIsMapLoaded(false);
  };

  const pinIconURL = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

  const nextButton = () => {
    if(address === "" || purpose === "" || numPassengers === 0 || passengerNames === [] || requestedBy === ""){
      alert("Fill up all the fields!");
    } else{
      updateFormData("address", address);
      updateFormData("purpose", purpose);
      updateFormData("numPassengers", numPassengers);
      updateFormData("passengerNames", passengerNames);
      updateFormData("requestedBy", requestedBy);
      navigate("/EmpStep3");
      window.scrollTo(0, 0);
    }
  };

  
  
  return (
    <div className="page-container">
        <Header />
        <div className="step2-text">Step 2: Input your travel details</div>
        <div className="grid-container-step2">
          <div className="div1">DESTINATION</div>
          <div className="div2">PURPOSE</div>
          <div className="div3">
            <div className="dest-input">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: '100%', marginTop: '10px' }}
            />
            </div>
            <div className="dest-maps">
              <label></label>
              <LoadScript googleMapsApiKey={API_KEY}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '1200%', borderRadius: '5px'}}
                  center={defaultCenter}
                  zoom={10}
                  onClick={handleMapClick}
                  onLoad={handleMapLoad}
                  onUnmount={handleMapUnmount}
                >
                  {isMapLoaded && <Marker key={`${loc.lat}-${loc.lng}`} position={loc} icon={pinIconURL} />}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
          <div className="div4">
            <textarea 
              placeholder="Input the purpose here"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="div5">NUMBER OF PASSENGER/S</div>
          <div className="div6">
            <input
              type="number"
              value={numPassengers}
              onChange={handleNumPassengersChange}
            />
          </div>
          <div className="div7">NAME OF PASSENGER/S</div>
          <div className="div8">
            {Array.from({ length: numPassengers }).map((_, index) => (
              <div className="passname-input" key={index}>
                <label>Passenger {index + 1} Name</label>
                <input
                  type="text"
                  placeholder={`Input Passenger ${index + 1} Name`}
                  value={passengerNames[index]}
                  onChange={(e) => handlePassengerNameChange(e, index)}
                />
                {index < numPassengers - 1 && <br />}
              </div>
            ))}
          </div>
          <div className="div9">REQUESTED BY</div>
          <div className="div10">
            <input type="text" 
              placeholder="Input requestor's name"
              value={requestedBy} 
              onChange={(e) => setRequestedBy(e.target.value)}
            />
          </div>
          <div className="div11">
            <div className="back-button-container">
              <button className="back-button" onClick={() => { navigate(-1); window.scrollTo(0, 0); }}>Back</button>
            </div>
          </div>
          <div className="div12">
            <div className="next-button-container-step2">
              <button onClick={nextButton} className="next-button-step2">Next</button>
            </div>
          </div>
        </div>
      <Footer activePage="EmpStep2" />
    </div>

    
  );
}
export default EmpStep2;

