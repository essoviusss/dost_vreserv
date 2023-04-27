import React from "react";
import EmpHome from "./EmpHome";
import '../GlobalCSS/content.css'
import EmpStep1 from "./EmpStep1";


export default function EmpTravelRequest(){

    return(
        <div>
             <EmpHome />
             <div className="main-content">
                <EmpStep1 />
             </div>
             
        </div>
    );
}