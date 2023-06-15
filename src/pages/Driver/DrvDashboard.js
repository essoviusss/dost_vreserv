import React from "react";
import "./components/DrvDashboard.css";
import DriverHeader from "../../header/DriverHeader";
import DonutChart from "react-donut-chart";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { BASE_URL } from "../../constants/api_url";

//material ui
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

export default function DrvDashboard() {
  const [data, setData] = useState([]);
  const [approved, setApproved] = useState(0);
  const [pending, setPending] = useState(0);

  const [request, setRequest] = useState([]);

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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${BASE_URL}/accomplished_request.php`;
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
        const url = `${BASE_URL}/drvdash_request.php`;
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

  // read - request
  useEffect(() => {
    const fetchData = async () => {
        try {
        const userId = localStorage.getItem("userId");
        const url = `${BASE_URL}/read_drv_request.php`;

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
    <div className="drv-dashboard-wrapper">
        <DriverHeader />
        <div className="top-container-drvdash">
          <div className="drv-child1">
            <div className="donut-chart-container">
              <DonutChart
                  data={data}
                  label="Percentage"
                  valueLabel="Value"
                  strokeWidth={100}
                  className="custom-donut-chart"
                  legend={false}
                  colors={['#025BAD', '#D9D9D9']}
                  hoverColors={['#025BAD', '#D9D9D9']}
              />
              <div className="donut-icon">
                <DirectionsCarRoundedIcon style={{ fontSize: 40, color: '#025BAD' }} />
              </div>
            </div>
            <div className="donut-legends">
              <div className="donut-title">Scheduled Travels</div>
              <div className="donut-accomplished">
                <CircleRoundedIcon style={{ fontSize: 20, color: '#025BAD' }} /> &nbsp;
                <div className="percentage">25%</div> &nbsp;
                <div className="per-label">Accomplished</div>
                <div className="count-label">(31 Travels)</div>
              </div>
              <div className="donut-unaccomplished">
              <CircleRoundedIcon style={{ fontSize: 20, color: '#D9D9D9' }} />  &nbsp;
                <div className="percentage">50%</div> &nbsp;
                <div className="per-label">Unccomplished</div>
                <div className="count-label">(15 Travels)</div>
              </div>
            </div>
          </div>
          <div className="drv-child-vert">
            <div className="drv-child-vert1">
              <div className="status-dashlogo">
                <img className="approved_icon" src="/images/approved_icon.png" alt="logo" />
              </div>
              <div className="status-dashright">
                <div className="drvdash-title">
                  <div className="status-dashlabel">Approved</div>
                </div>
                <div className="status-dashcount-container">
                  <div className="status-dashcount">50</div>
                  <div className="status-dashreq">Requests</div>
                </div>
              </div>
            </div>
            <div className="drv-child-vert2">
              <div className="status-dashlogo">
                <img className="pending_icon" src="/images/pending_icon.png" alt="logo" />
              </div>
              <div className="status-dashright">
                <div className="drvdash-title">
                  <div className="status-dashlabel">Pending</div>
                </div>
                <div className="status-dashcount-container">
                  <div className="status-dashcount">50</div>
                  <div className="status-dashreq">Requests</div>
                </div>
              </div>
            </div>
          </div>
          <div className="drv-child2">
            <div className="dash-driver1">
              <div className="driver1-row1">
                Driver
              </div>
              <div className="driver1-row2">
                <AccountCircleIcon style={{ fontSize: 100, color: '#025BAD' }} />
              </div>
            </div>
            <div className="dash-driver2">
              <div className="driver2-row1">
                Month of June
              </div>
              <div className="driver2-row2">
                <table>
                  <tbody>
                    <tr>
                      <td>No. of Travels</td>
                      <td>22</td>
                    </tr>
                    <tr>
                      <td>No. of Requests</td>
                      <td>55</td>
                    </tr>
                    <tr>
                      <td>No. of Requests</td>
                      <td>55</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-container-drvdash">
          <div className="drv-child3">
          <div className="table-headerdash">
          <div className="table-headerdash1">
            Upcoming Travels
          </div>
          <div className="table-headerdash2">
            <button className="view-all-button">
              View all <ArrowRightAltRoundedIcon />
            </button>
          </div>
          </div>
            <div className="table-contdash">
          <Table>
              <thead>
                <tr>
                  <th className='dashtable' >Vehicle Name</th>
                  <th className='dashtable' >Requested by</th>
                  <th className='dashtable' >Destination</th>
                  <th className='dashtable' >Status</th>
                </tr>
              </thead>
              <TableBody>
                {request.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request) => (
                    <TableRow key={request.request_id}>
                      <TableCell style={{ fontSize: '13px', fontFamily: 'Poppins' }}>{request.vehicle_name}</TableCell>
                      <TableCell style={{ fontSize: '13px', fontFamily: 'Poppins' }}>{request.requested_by}</TableCell>
                      <TableCell style={{ fontSize: '13px', fontFamily: 'Poppins' }}>{request.destination}</TableCell>
                      <TableCell style={{ textAlign: 'center', fontSize: '13px', fontFamily: 'Poppins', padding: 0 }}>
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
              </div>
            </div>
        
          <div className="drv-child4">calendar</div>
        </div>
    </div>
  );
}
