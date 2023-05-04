import React from "react";
import EmpHome from "./EmpHome";
import '../Employee/components/EmpDashboard.css';
import '../GlobalCSS/content.css';
import Header from "../../header/header";


export default function EmpDashboard(){
  const styles = {
    backgroundColor: 'red',
    color: 'white',
    padding: '20px'
  };
    return(
        <div>
            <Header/>
            <div style={styles}></div>
        </div>
    );
}