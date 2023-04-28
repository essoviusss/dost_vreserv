import React from "react";
import {useNavigate } from "react-router-dom";
import EmpHome from "./EmpHome";

export default function EmpTrack(){

    const navigate = useNavigate();

    return(
        <div>
            <EmpHome />
            <div className="main-content">

                <div>
                    <input type="text"></input>
                </div>
            </div>
        </div>
    );
}