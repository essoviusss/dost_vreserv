import React from "react";
import '../Driver/components/DrvDashboard.css';
import '../GlobalCSS/content.css';
import DriverHeader from "../../header/DriverHeader";


export default function EmpDashboard(){
    return(
        <div style={{ paddingTop: '60px', backgroundColor: '#F4F7FE' }}>
        <div className="main-content" style={{ backgroundColor: '#F4F7FE' }}>
            <DriverHeader/>
            <div className="grid-container-drv">
              <div className="item1-drv">1</div>
              <div className="item2-drv">2</div>  
              <div className="item3-drv">3</div>
              <div className="item4-drv">4</div>
              <div className="item5-drv">5</div>
              <div className="item6-drv">6</div>
            </div>
        </div>
        </div>
    );
}