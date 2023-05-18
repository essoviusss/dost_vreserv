import React from "react";
import '../Driver/components/DrvRequestLogs.css';
import '../GlobalCSS/content.css';
import DriverHeader from "../../header/DriverHeader";


export default function DrvRequestLogs() {


    return(
        <div style={{ paddingTop: '60px', backgroundColor: '#F4F7FE' }}>
        <div className="main-content" style={{ backgroundColor: '#F4F7FE' }}>
            <DriverHeader/>
        </div>
        </div>
    );
}