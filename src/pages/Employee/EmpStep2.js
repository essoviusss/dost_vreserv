import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import EmpHome from "./EmpHome";
import { useLocation } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useFormData } from "./FormDataContext";

const containerStyle = {
    width: '100%',
    height: '400px',
  };
  
  const defaultCenter = {
    lat: 16.608013,
    lng: 120.315877,
  };
  const API_KEY = 'AIzaSyAfwnnpqgJEIWC8xyJWHJJzc5t-JndFKjg';

function EmpStep2(){
    const { formData, updateFormData } = useFormData();
    const navigate = useNavigate();
    const location = useLocation();
    //value step 1
    const [loc, setLoc] = useState(defaultCenter);

    //Formdata
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

    const pinIconURL = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    const nextButton = () => {
        updateFormData("address", address);
        updateFormData("purpose", purpose);
        updateFormData("numPassengers", numPassengers);
        updateFormData("passengerNames", passengerNames);
        updateFormData("requestedBy", requestedBy);
        navigate("/EmpStep3");
    }
    
    return(
        <div>
            <EmpHome />
            <div className="main-content">
                <h3>Step 2: Input your Travel Details</h3>
            <div>
                <div>
                    <label>Destination</label>
                </div>

                <div>
                <input
                    type="text"
                    value={address}
                    readOnly
                    style={{ width: '100%', marginTop: '10px' }}
                />
                </div>

                <div>
                    <label>Maps</label>
                    <LoadScript googleMapsApiKey={API_KEY}>
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={defaultCenter}
                            zoom={10}
                            onClick={handleMapClick}
                            >
                            {location && (
                                 <Marker position={loc} icon={pinIconURL} />
                            )}
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
            
            <div>
                <div>
                    <label>PURPOSE</label>
                </div>
                <div>
                    <textarea 
                    placeholder="Input the purpose here"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    >
                    </textarea>
                </div>
                <div>
                    <label>NUMBER OF PASSENGER/S</label>
                </div>
                <div>
                    <input
                        type="number"
                        value={numPassengers}
                        onChange={handleNumPassengersChange}
                    />
                </div>
            </div>
            {Array.from({ length: numPassengers }).map((_, index) => (
                <div key={index}>
                    <label>Passenger {index + 1} Name</label>
                    <input
                        type="text"
                        placeholder={`Input Passenger ${index + 1} Name`}
                        value={passengerNames[index]}
                        onChange={(e) => handlePassengerNameChange(e, index)}
                    />
                </div>
            ))}

            <div>
                <div>
                    <label>REQUESTED BY:</label>
                </div>
                <div>
                    <input type="text" 
                    placeholder="Input requestor's name"
                    value={requestedBy} 
                    onChange={(e) => setRequestedBy(e.target.value)}
                    >
                    </input>
                </div>
            </div>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={nextButton}>Next</button>
            </div>
        </div>
    );
}
export default EmpStep2;