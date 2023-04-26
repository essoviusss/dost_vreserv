import { useNavigate } from "react-router-dom";
// import "../styles/RequestForm.css";

export default function RequestForm(){
    const navigate = useNavigate();


    return(
        <div>
            <nav>
                <button onClick={()=>navigate(-1)}>Back</button>
                <p>Request Form</p>
            </nav>
            <form>
                <p className="Step">Step 1: Choosing Date & Time, Vehicle and Driver</p>
                <p>Date</p>
                <p>Time</p>
            </form>
        </div>
    );
}