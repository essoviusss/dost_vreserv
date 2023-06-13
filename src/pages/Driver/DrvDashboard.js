import React from "react";
import "./components/DrvDashboard.css";
import DriverHeader from "../../header/DriverHeader";
import DonutChart from "react-donut-chart";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function DrvDashboard() {
  const [data, setData] = useState([]);
  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);
  const [request, setRequest] = useState([]);

  //chart
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

  // //count
  useEffect(() => {
    const fetchData = async () => {
      try{
        const url = "http://localhost/vreserv_api/drvdash_request.php";
        const user_id = localStorage.getItem('userId');

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

  //table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  // read - request
  useEffect(() => {
    const fetchData = async () => {
        try {
        const userId = localStorage.getItem("userId");
        const url = "http://localhost/vreserv_api/read_drv_request.php";

        let formData = new FormData();
        formData.append('user_id', userId);

        const response = await axios.post(url, formData);

        if (Array.isArray(response.data.data)) {
            // Sort the requests by date in descending order
            const sortedRequests = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            // Take only the first 5 requests
            const recentRequests = sortedRequests.slice(0, 5);
            setRequest(recentRequests);
        }
        } catch (error) {
        console.log(error);
        }
    };
    fetchData();
    }, []);

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
        <div className="drv-child-vert1">{approved}Approved</div>
        <div className="drv-child-vert2">{pending}Pending</div>
      </div>
      <div className="drv-child2">DRIVER</div>

      <div>
      <Paper sx={{ borderRadius: '10px' }}>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th className='requestlog-th' style={{ textAlign: 'center' }}>Vehicle Name</th>
                  <th className='requestlog-th' style={{ textAlign: 'center' }}>Requested by</th>
                  <th className='requestlog-th' style={{ textAlign: 'center' }}>Destination</th>
                  <th className='requestlog-th' style={{ textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <TableBody>
                {request.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request) => (
                    <TableRow key={request.request_id}>
                      <TableCell style={{ textAlign: 'center' }}>{request.vehicle_name}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{request.requested_by}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{request.destination}</TableCell>
                      <TableCell style={{ textAlign: 'center', padding: 0 }}>
                        <div
                          style={{
                            backgroundColor:
                              request.request_status === "Pending"
                                ? '#FDC858'
                                : request.request_status === "Approved"
                                ? 'green'
                                : request.request_status === "Disapproved"
                                ? '#b21127'
                                : request.request_status === "For Approval"
                                ? '#025BAD'
                                : request.request_status === "Accomplished"
                                ? 'purple'
                                : request.request_status === "Not Accomplished"
                                ? 'brown'
                                : request.request_status === "Cancelled"
                                ? 'brown'
                                : 'inherit',
                            color: 'white',
                            padding: '5px 5px',
                            borderRadius: '50px',
                            width: '80%', // Adjust as needed
                            margin: 'auto',
                          }}
                        >
                          {request.request_status}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
      </div>
    </div>
  );
}
