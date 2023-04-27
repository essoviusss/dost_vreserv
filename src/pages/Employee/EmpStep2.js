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
                
            </div>
                <button onClick={()=>navigate(-1)}>Back</button>
                <button onClick={()=>navigate("/EmpStep3")}>Next</button>
            </div>
        </div>
    );
}