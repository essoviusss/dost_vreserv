import { useNavigate } from "react-router-dom";
import Header from "../../header/header";
import Footer from "../Employee/EmpFooter.js";
import '../Employee/components/EmpStep4.css';

export default function EmpStep4() {
  const navigate = useNavigate();

  const viewReqButton = () => {
    navigate("/EmpRequestLogs");
  };

  const createReqButton = () => {
    navigate("/EmpVehicleRequest");
  };

  return (
    <div className="page-container">
        <Header />
        <div className="grid-container-step4">
            <div className="div1-step4">
            <video autoPlay muted loop={false}>
                <source src="/images/checkvid.mp4" type="video/mp4" />
            </video>
            </div>
          <div className="div2-step4">
            Your request have been submitted, please wait for the recommendation.
          </div>
          <div className="div3-step4">
            <div class="viewreq-button-container">
              <button className="viewreq-button" onClick={viewReqButton}>View Request</button>
            </div>
          </div>
          <div className="div4-step4">
            <div class="createreq-button-container">
              <button className="createreq-button" onClick={createReqButton}>Create New Request</button>
            </div>
          </div>
        </div>
      
    <Footer activePage="EmpStep4" />
    </div>
  );
}
