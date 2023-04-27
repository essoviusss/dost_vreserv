import React from "react";
import { useNavigate } from "react-router-dom";

export default function EmpStep1(){
    // const [name, setName] = useState('');
    const navigate = useNavigate();

    return(
        <div>
            <div>
                <h3>Step 1: Choosing Date & Time, Vehicle and Driver</h3>

                <div>
                    <label>DATE AND TIME</label>                
                </div>

                <div>
                    <label>Departure</label>
                    <div>
                        <input type="datetime-local"></input>
                    </div>    
                </div>

                <div>
                    <label>Arrival</label>
                    <div>
                        <input type="datetime-local"></input>
                    </div>    
                </div>

                <div>
                    <label>Available Vehicle</label>
                    <div>
                        <select>
                            <option value="">Tricycle</option>
                        </select>
                    </div>    
                </div>

                <div>
                    <label>Available Driver</label>
                    <div>
                        <select>
                            <option value="">Abdullah Abaga</option>
                        </select>
                    </div>    
                </div>

                <div>
                    <button onClick={()=>navigate("/EmpStep2")}>Next</button>
                </div>

                

                
            </div>
        </div>
    );
}