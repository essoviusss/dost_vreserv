import {useNavigate } from "react-router-dom";
import EmpHome from "./EmpHome";

export default function EmpStep4(){

    const navigate = useNavigate();

    return(
        <div>
            <EmpHome />
            <div className="main-content">
                <h3>Step 4: Copy the Request ID to track status</h3>

                <button onClick={()=>navigate(-1)}>Back</button>
                {/* <button onClick={()=>navigate("/EmpStep3")}>Continue</button> */}
            </div>
        </div>
    );
}