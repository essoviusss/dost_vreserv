import {useNavigate } from "react-router-dom";
import Header from "../../header/header";
import '../Employee/components/EmpStep4.css';

export default function EmpStep4(){

    const navigate = useNavigate();

    return(
        <div style={{ paddingTop: '60px' }}>
            <div className="main-content">
                <Header />
                <div className="grid-container-step4">
                    <div className="div1-step4">1</div>
                    <div className="div2-step4">2</div>
                    <div className="div3-step4">3</div>
                    <div className="div4-step4">4</div>
                </div>
            </div>
        </div>
    );
}