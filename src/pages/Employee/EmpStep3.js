import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormData } from "./FormDataContext";
import dayjs from "dayjs";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import '../Employee/components/EmpStep3.css';
import Header from "../../header/header";
import '../GlobalCSS/content.css';
import '../Employee/EmpStep4.js';
import Footer from "../Employee/EmpFooter.js";
import { BASE_URL } from "../../constants/api_url";

function EmpStep3() {
    const { formData } = useFormData();
    const navigate = useNavigate();
    const UID = uuidv4();
    const { clearFormData } = useFormData();

    function submitForm() {
        const email = localStorage.getItem("email");
        const url = `${BASE_URL}/submit_request.php`;
        let fData = new FormData();
        fData.append('UID', UID);
        fData.append('email', email);
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
            response.data.trim() === "Success" ? navigate("/EmpStep4") : alert(response.data);
            clearFormData();
          })
          .catch(error => {
            alert(error);
        });     
      }
    return (
      <div className="page-container">
        <Header />
        <div className="step3-text">Step 3: Review the inputted details</div>
        <div className="grid-container-step3">
          <div className="div1-step3">
            <div className="div-summary">
              <div className="div1-container">
                <div className="div1-summary">
                  <img className="summary-logo" src="/images/summary_logo.png"/>
                </div>
              </div>
              <div className="div2-summary">
                <p className="header-summary">{formData.selectedVehicle}</p>
                <p className="header-label-summary">Vehicle to be requested</p>
              </div>
              <div className="div3-summary">
                <p className="header-summary">{formData.selectedDriver}</p>
                <p className="header-label-summary">Name of the driver</p>
              </div>
              <div className="div4-summary">
                <div class="edit-button-container">
                  <button className="edit-button" onClick={() => navigate(-1)}>Edit</button>
                </div>
              </div>
              <div className="div5-summary">
                <hr class="summary-hr"/>
              </div>
              <div className="div6-summary">
                <p className="schedlabel-summary">SCHEDULE OF TRAVEL</p>
              </div>
              <div className="div7-summary">
                <div className="div7table-container">
                <table>
                  <tbody>
                    <tr>
                      <td className="table-label-summary">
                        <p className="header-label-summary">Departure Date and Time:</p>
                      </td>
                      <td>
                        <p className="summary-details">
                          {dayjs(formData.departureDate).format("MMMM D, YYYY, h:mm A")}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-label-summary">
                        <p className="header-label-summary">Arrival Date and Time:</p>
                      </td>
                      <td>
                      <p className="summary-details">
                        {dayjs(formData.arrivalDate).format("MMMM D, YYYY, h:mm A")}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-label-summary">
                        <p className="header-label-summary">Destination:</p>
                      </td>
                      <td>
                      <p className="summary-details">
                        {formData.address}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
              <div className="div9-summary">
                <p className="schedlabel-summary">OTHER DETAILS</p>
              </div>
              <div className="div10-summary">
              <div className="div10table-container">
                <table>
                  <tbody>
                    <tr>
                      <td className="table-label-summary">
                        <p className="header-label-summary">Total No. of Passenger/s:</p>
                      </td>
                      <td>
                        <p className="summary-details">
                          {formData.numPassengers}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-label-summary">
                        <p className="header-label-summary">Name of Passenger/s:</p>
                      </td>
                      <td>
                      <p className="summary-details">
                        <ul>
                        {formData.passengerNames &&
                            formData.passengerNames.map((name, index) => (
                            <li key={index}>{name}</li>
                            ))}
                        </ul>
                      </p>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-label-summary">
                        <p className="header-label-summary">Purpose:</p>
                      </td>
                      <td>
                      <p className="summary-details">
                        {formData.purpose}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-label-summary">
                        <p className="header-label-summary">Requested By:</p>
                      </td>
                      <td>
                      <p className="summary-details">
                        {formData.requestedBy}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
          <div className="div2-step3">
            <p className="note-summary">
              Please review the details you entered and click "Continue" if you wish to proceed with your request
            </p>
          </div>
          <div className="div3-step3">
            <div class="back-button-container">
              <button className="back-button" onClick={() => { navigate(-1); window.scrollTo(0, 0); }}>Back</button>
            </div>
          </div>
          <div className="div4-step3">
            <div class="submit-button-container">
              <button className="submit-button" onClick={submitForm}>Submit</button>
            </div>
          </div>
          </div>
      <Footer activePage="EmpStep3" />
    </div>
    );
  }

export default EmpStep3;
