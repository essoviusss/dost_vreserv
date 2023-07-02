import React from "react";
import '../Employee/components/EmpDashboard.css';
import '../GlobalCSS/content.css';
import Header from "../../header/header";


export default function EmpDashboard(){
    
    return(
        <div className="page-container">
            <Header/>
            <div class="grid-container">
              <div class="item1">1</div>
              <div class="item2">2</div>  
              <div class="item3">3</div>
              <div class="item4">4</div>
              <div class="item5">5</div>
              <div class="item6">6</div>
            </div>
        </div>
    );
}