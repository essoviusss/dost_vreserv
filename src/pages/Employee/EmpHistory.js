
import '../Employee/components/EmpTrack.css'
import Header from "../../header/header";
import React, { useState, useEffect } from "react";
import axios from "axios";

//material ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import '../Employee/components/EmpRequestLogs.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { BASE_URL } from '../../constants/api_url';
import dayjs from "dayjs";

export default function EmpHistory(){
  //font
  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });

  //defaultValue
  const [selectedRequest, setSelectedRequest] = useState({});
  const [request, setRequest] = useState([]);

  //modal
  const [openView, setOpenView] = React.useState(false);

  //dialog
  const handleOpenView = (request) => {
    setSelectedRequest(request);
    setOpenView(true);
  };

  const CloseView = () => {
    setOpenView(false);
  };

  //table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const email = localStorage.getItem("email");

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRequests = request.filter((item) => item.request_email === email);


  //read
  useEffect(() => {
    axios
      .get(`${BASE_URL}/read_travelHistory.php`)
      .then((response) => {
        if(Array.isArray(response.data)){
          setRequest(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [request]);

    return(
      <ThemeProvider theme={theme}>
        <div className="page-container">
          <Header/>
          <div className="rlogs-text">Requests</div>
          <Paper sx={{ borderRadius: '10px' }}>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th className='requestlog-th' style={{ textAlign: 'center' }}>Vehicle</th>
                    <th className='requestlog-th' style={{ textAlign: 'center' }}>Driver</th>
                    <th className='requestlog-th' style={{ textAlign: 'center' }}>Destination</th>
                    <th className='requestlog-th' style={{ textAlign: 'center' }}>Status</th>
                    <th className='requestlog-th' style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <TableBody>
                  {filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request) => (
                    <TableRow key={request.request_id}>
                    <TableCell style={{ textAlign: 'center', wordBreak: 'break-word', maxWidth: '140px' }}>{request.vehicle_name}</TableCell>
                    <TableCell style={{ textAlign: 'center', wordBreak: 'break-word', maxWidth: '140px' }}>{request.driver_name}</TableCell>
                    <TableCell style={{ textAlign: 'center', wordBreak: 'break-word', maxWidth: '180px' }}>{request.destination}</TableCell>
                    <TableCell style={{ textAlign: 'center', padding: 0 }}>
                      <div style={{ 
                        backgroundColor: 
                          request.request_status === "Accomplished" ? '#f26419' :
                          request.request_status === "Disapproved" ? '#b21127' :
                          request.request_status === "Cancelled" ? '#6e6e6e' : 'inherit',
                        color: 'white',
                        padding: '5px 5px',
                        borderRadius: '50px',
                        width: '80%', // Adjust as needed
                        margin: 'auto',
                        wordBreak: 'break-word',
                        maxWidth: '120px' // Adjust the width as needed
                      }}>
                        {request.request_status}
                      </div>
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', wordBreak: 'break-word', maxWidth: '100px' }}>
                      <Button variant="contained" onClick={() => handleOpenView(request)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                                  
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredRequests.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Paper>
      {/* view modal*/}
      <Dialog open={openView} onClose={CloseView} fullWidth maxWidth="md">
      <Button onClick={CloseView} style={{ color: 'gray', position: 'absolute', top: 10, right: 0, paddingLeft: 0, paddingRight: 0 }}>
      <CloseRoundedIcon />
      </Button>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <div className="div-empreq">
              <div className="div1-empreq">
                <div className="div1-empreq">
                  <img className="summary-logo" src="/images/summary_logo.png"/>
                </div>
              </div>
              <div className="div2-empreq">
                <p className="header-empreq">{selectedRequest.vehicle_name}</p>
                <p className="header-label-empreq">Vehicle to be requested</p>
              </div>
              <div className="div3-empreq">
                <p className="header-empreq">{selectedRequest.driver_name}</p>
                <p className="header-label-empreq">Name of the driver</p>
              </div>
              <div className="status-button-container">
                {selectedRequest && selectedRequest.request_status && (
                  <button className={`status-button ${selectedRequest.request_status.replace(/\s+/g, '')}`}>
                    {selectedRequest.request_status}
                  </button>
                )}
              </div>
              <div className="div5-empreq">
                <hr class="empreq-hr"/>
              </div>
              <div className="div6-empreq">
                <p className="schedlabel-empreq">SCHEDULE OF TRAVEL</p>
              </div>
              <div className="div7-empreq">
                <div className="div7table-empreq">
                <table>
                  <tbody>
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Departure Date and Time:</p>
                      </td>
                      <td>
                        <p className="empreq-details">
                        {dayjs(selectedRequest.departure_time).format("MMMM D, YYYY, h:mm A")}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Arrival Date and Time:</p>
                      </td>
                      <td>
                      <p className="empreq-details">
                      {dayjs(selectedRequest.arrival_time).format("MMMM D, YYYY, h:mm A")}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Destination:</p>
                      </td>
                      <td>
                      <p className="empreq-details">
                      {selectedRequest.destination}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
              <div className="div9-empreq">
                <p className="schedlabel-empreq">OTHER DETAILS</p>
              </div>
              <div className="div10-empreq">
              <div className="div10table-empreq">
                <table>
                  <tbody>
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Total No. of Passenger/s:</p>
                      </td>
                      <td>
                        <p className="empreq-details">
                          {selectedRequest.passenger_count}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Name of Passenger/s:</p>
                      </td>
                      <td>
                        <table>
                          <tbody>
                            {selectedRequest.passenger_names &&
                              Array.isArray(selectedRequest.passenger_names) &&
                              selectedRequest.passenger_names.map((passenger, index) => {
                                const passengerNumber = index + 1;
                                if (index % 2 === 0) {
                                  return (
                                    <tr key={index}>
                                      <td> <p className="empreq-details"> ({passengerNumber}) {passenger} </p> </td>
                                      {index + 1 < selectedRequest.passenger_names.length && (
                                        <td>
                                          <p className="empreq-details"> ({passengerNumber + 1}) {selectedRequest.passenger_names[index + 1]} </p>
                                        </td>
                                      )}
                                    </tr>
                                  );
                                }
                                return null;
                              })}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Purpose:</p>
                      </td>
                      <td>
                      <p className="empreq-details">
                        {selectedRequest.purpose}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Requested By:</p>
                      </td>
                      <td>
                      <p className="empreq-details">
                      {selectedRequest.requested_by}</p>
                      </td>
                    </tr>
                    {selectedRequest.request_status === 'Accomplished' ? (
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Preventive Maintenance Officer:</p>
                      </td>
                      <td>
                        <p className="empreq-details">
                          {selectedRequest.pm_officer}
                        </p>
                      </td>
                    </tr>                    
                  ) : null}
                  {selectedRequest.request_status === 'Accomplished' ? (
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Approved by:</p>
                      </td>
                      <td>
                        <p className="empreq-details">
                          {selectedRequest.approved_by}
                        </p>
                      </td>
                    </tr>                    
                  ) : null}
                  {selectedRequest.request_status === 'Accomplished' ? (
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Chief Administrative Officer:</p>
                      </td>
                      <td>
                        <p className="empreq-details">
                          {selectedRequest.ca_officer}
                        </p>
                      </td>
                    </tr>                    
                  ) : null}

                    {selectedRequest.request_status === 'Cancelled' || selectedRequest.request_status === 'Disapproved' ? (
                    <tr>
                      <td className="table-label-empreq">
                        <p className="header-label-empreq">Remarks:</p>
                      </td>
                      <td>
                        <p className="empreq-details">
                          {selectedRequest.reason}
                        </p>
                      </td>
                    </tr>
                  ) : null}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
    </ThemeProvider>
  );
}