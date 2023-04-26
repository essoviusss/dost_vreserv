import { useNavigate } from "react-router-dom";

export default function Track(){
    const navigate = useNavigate();
    return(
        <div>
            <h1>Track Page</h1>
            <button onClick={()=>navigate(-1)}>Back</button>
        </div>
    );
}