import React from "react";
import { useNavigate } from "react-router-dom";
import '../Auth/components/Login.css';


export default function Login(){

<<<<<<< Updated upstream
const navigate = useNavigate();

=======
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/EmpHome", { replace: true });
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
            navigate("/EmpHome", { replace: true });
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
      
      
      
    
>>>>>>> Stashed changes

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