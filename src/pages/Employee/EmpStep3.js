import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "./FormDataContext";
import dayjs from "dayjs";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EmpStep3() {
    const { formData } = useFormData();
    const navigate = useNavigate();
    const UID = uuidv4();
    const notif = () => toast("Request Submitted!");

    function submitForm() {
        const url = 'http://localhost/vreserv_api/submit_request.php';
        let fData = new FormData();
        fData.append('UID', UID);
        fData.append('departureDate', formData.departureDate);
        fData.append('arrivalDate', formData.arrivalDate);
        fData.append('selectedVehicle', formData.selectedVehicle);
        fData.append('selectedDriver', formData.selectedDriver);
        fData.append('address', formData.address);
        fData.append('purpose', formData.purpose);
        fData.append('numPassengers' , formData.numPassengers);
        fData.append('passengerNames', formData.passengerNames);
        fData.append('requestedBy', formData.requestedBy);

        axios.post(url, fData)
          .then(response => {
            response.data.trim() === "Success" ? notif() : alert(response.data);
          })
          .catch(error => {
            alert(error);
        });
      }
    return (
      <div>
        <div>
          <ToastContainer />
        </div>
        <h3>Step 3: Summary</h3>
        <div>
          <h4>Departure Date and Time:</h4>
          <p>{dayjs(formData.departureDate).format("MMMM D, YYYY, h:mm A")}</p>
        </div>
        <div>
          <h4>Arrival Date and Time:</h4>
          <p>{dayjs(formData.arrivalDate).format("MMMM D, YYYY, h:mm A")}</p>
        </div>
        <div>
          <h4>Selected Vehicle:</h4>
          <p>{formData.selectedVehicle}</p>
        </div>
        <div>
          <h4>Selected Driver:</h4>
          <p>{formData.selectedDriver}</p>
        </div>
        <div>
          <h4>Destination:</h4>
          <p>{formData.address}</p>
        </div>
        <div>
          <h4>Purpose:</h4>
          <p>{formData.purpose}</p>
        </div>
        <div>
          <h4>Number of Passengers:</h4>
          <p>{formData.numPassengers}</p>
        </div>
        <div>
          <h4>Passenger Names:</h4>
            <ul>
            {formData.passengerNames &&
                formData.passengerNames.map((name, index) => (
                <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
        <div>
          <h4>Requested By:</h4>
          <p>{formData.requestedBy}</p>
        </div>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={submitForm}>Submit</button>
      </div>
    );
  }

export default EmpStep3;
