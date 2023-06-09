import React from "react";
import "./components/DrvDashboard.css";
import DriverHeader from "../../header/DriverHeader";
import DonutChart from "react-donut-chart";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DrvDashboard() {
  const [data, setData] = useState([]);
  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "http://localhost/vreserv_api/accomplished_request.php";
        const userId = localStorage.getItem("userId");
        let fData = new FormData();
        fData.append("user_id", userId);

        const response = await axios.post(url, fData);
        const { data } = response.data;
        setData([
          {
            value: data.accomplished_percentage,
            label: "Accomplished",
          },
          {
            value: data.not_accomplished_percentage,
            label: "Not Accomplished",
          },
        ]);
      } catch (e) {
        alert(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const url = "http://localhost/vreserv_api/drvdash_request.php";
        const user_id = localStorage.getItem('user_id');

        let fData = new FormData();
        fData.append('user_id', user_id);

        const response = await axios.post(url, fData);
        setApproved(response.data.map(appObj => appObj.approved));
        setPending(response.data.map(penObj => penObj.pending));
        
      }catch(e){
        alert(e);
      }
    }
    fetchData();
  },[approved, pending])

  return (
    <div className="drv-dashboard-cont">
      <DriverHeader />
      <div className="drv-child1">
        <div className="donut-chart-container">
          <DonutChart
            data={data}
            label="Percentage"
            valueLabel="Value"
            strokeWidth={100}
            className="custom-donut-chart"
            legend={true}
          />
        </div>
      </div>
      
      <div className="drv-child-vert">
        <div className="drv-child-vert1">{approved}</div>
        <div className="drv-child-vert2">{pending}</div>
      </div>
      <div className="drv-child2">4</div>
    </div>
  );
}
