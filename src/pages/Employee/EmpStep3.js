import React from "react";
import {useNavigate } from "react-router-dom";
import EmpHome from "./EmpHome";

export default function EmpStep3(){

    const navigate = useNavigate();

    return(
        <div>
            <EmpHome />
            <div className="main-content">
                <h3>Step 3: Review Inputted Details</h3>

                <button onClick={()=>navigate(-1)}>Back</button>
                <button onClick={()=>navigate("/EmpStep4")}>Continue</button>
            </div>
        </div>
    );
}