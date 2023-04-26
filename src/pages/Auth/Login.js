import React from "react";
import { useNavigate } from "react-router-dom";
import '../Auth/components/Login.css';


export default function Login(){

const navigate = useNavigate();


    return(
        <div>
            <div>
                <form>
                    <div>
                        <h2>Login</h2>
                    </div>
                    <div>
                        <select>
                            <option value="">Employee</option>
                            <option value="">Driver</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" id="username" placeholder="username"></input>
                    </div>
                    <div>
                        <input type="password" id="username" placeholder="password"></input>
                    <div>
                        <button onClick={()=>navigate("/EmployeeHome")}>Login</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
}