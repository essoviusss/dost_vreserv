import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Auth/components/Login.css';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/EmployeeHome", { replace: true });
        }
      }, [navigate]);

    const signIn = async () => {
        const url = "http://localhost/vreserv_api/login.php";
        let fData = new FormData();
        fData.append("username", username);
        fData.append("password", password);
      
        try {
          const response = await axios.post(url, fData);
          console.log(response.data);
      
          if (response.data.message !== "Success") {
            console.log("Login failed:", response.data.message);
            alert(response.data.message);
   
            return;
          }
      
          // Save the JWT token in the local storage
          const jwtToken = await response.data.token;
          const userRole = await response.data.role.trim();
          
      
          if (userRole === "Employee" && role === "Employee") {
            alert("Login Successful");
            localStorage.setItem("token", jwtToken);
            navigate("/EmployeeHome", { replace: true });
          }else if (userRole === "Driver" && role === "Driver") {
            alert("Login Successful");
            localStorage.setItem("token", jwtToken);
            navigate("/DriverHome", { replace: true });
          }else {
            alert("User does not exist");
          }
        } catch (error) {
          console.error("Error:", error);
          alert(error);
        }
      };
      
      
      
    

    return(
        <div className="login-container">
          <div class="column left">
          <div className="display-container">
          </div>
          </div>
          <div class="column right">
          <div className="form-container">
            <div className="login-header">
              <h2>Login</h2>
            </div>
            <div className="login-field">
              <select value={role} onChange={(event) => setRole(event.target.value)}>
                <option value="none">Select Role</option>
                <option value="Employee">Employee</option>
                <option value="Driver">Driver</option>
              </select>
            </div>
            <div className="login-field">
              <TextField
                id="username"
                label="Username"
                placeholder="username"
                multiline
                variant="outlined"
                style={{ width: '100%' }}
              />
            </div>
            <div className="login-field">
              <TextField
                id="password"
                label="Password"
                placeholder="password"
                multiline
                variant="outlined"
                style={{ width: '100%' }}
              />
            </div>
            <div className="login-button">
              <button onClick={signIn}>Login</button>
            </div>
          </div>  
          </div>
        </div>
    );
}
