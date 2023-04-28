import React from "react";
import {useNavigate } from "react-router-dom";
import EmpHome from "./EmpHome";

export default function EmpStep2(){

    const navigate = useNavigate();

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
                    <input type="text"></input>
                </div>

                <div>
                    <label>Maps</label>
                </div>
            </div>
            
            <div>
                <div>
                    <label>PURPOSE</label>
                </div>

                <div>
                    <textarea placeholder="Input the purpose here"></textarea>
                </div>

                <div>
                    <label>NUMBER OF PASSENGER/S</label>
                </div>

                <div>
                    <input type="number"></input>
                </div>
            </div>

            <div>
                <div>
                    <label>NAME OF PASSENGERS</label>
                </div>
                <div>
                    <input type="text" placeholder="Input Passenger 1 Name"></input>
                </div>
            </div>

            <div>
                <div>
                    <label>REQUESTED BY:</label>
                </div>
                <div>
                    <input type="text" placeholder="Input requestor's name"></input>
                </div>
            </div>
           

                <button onClick={()=>navigate(-1)}>Back</button>
                <button onClick={()=>navigate("/EmpStep3")}>Next</button>
            </div>
        </div>
    );
}