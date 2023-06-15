import '../Driver/components/DrvRequestLogs.css';
import Header from "../../header/header";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { generateTripTicket } from '../../utils/pdfUtils';
import DialogTitle from '@mui/material/DialogTitle';
import { BASE_URL } from '../../constants/api_url';

export default function DrvRequestLogs() {
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
  const [openAccomplished, setOpenAccomplished] = React.useState(false);
  const [openNotAccomplished, setOpenNotAccomplished] = React.useState(false);
  const [editRequestStatus, setEditRequestStatus] = useState("");



  //dialog


  const CloseView = () => {
    setOpenView(false);
  };

  const handleOpenView = (request) => {
    setSelectedRequest(request);
    setOpenView(true);
  };

  const handleAccomplished= (request) => {
    setSelectedRequest(request);
    setEditRequestStatus(request.request_status);
    setOpenAccomplished(true);
  }

  const handleNotAccomplished= (request) => {
    setSelectedRequest(request);
    setEditRequestStatus(request.request_status);
    setOpenNotAccomplished(true);
  }

  const CloseAccomplished = () => {
    setOpenAccomplished(false);
  };

  const CloseNotAccomplished = () => {
    setOpenNotAccomplished(false);
  };

  const CloseEdit = () => {
    setOpenAccomplished(false);
    setOpenNotAccomplished(false);
  };
  
  

  //table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const driverName = localStorage.getItem("driver_name");

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRequests = request.filter((item) => item.driver_name === driverName);

  //read
  useEffect(() => {
    const fetchData = async () => {
      const url = `${BASE_URL}/read_drv_request.php`;
      const userId = localStorage.getItem("userId");

      let fData = new FormData();
      fData.append("user_id", userId);

      try {
        const response = await axios.post(url, fData);
        console.log(userId);
        if (Array.isArray(response.data.data)) {
          setRequest(response.data.data);
        }
      } catch (e) {
        alert(e);
      }
    };

    fetchData();
  }, [request]);

  const handleGenerateTripTicket = async () => {
    try {
      await generateTripTicket(selectedRequest);
    } catch (error) {
      console.log('Error generating PDF:', error);
    }
  };

  //accomplished
  async function handleUpdateAccomplished() {
    const url = `${BASE_URL}/update_status.php`;
    
    let fData = new FormData();
    fData.append("request_id", selectedRequest.request_id);
    fData.append("request_status", "Accomplished");

    const response = await axios.post(url, fData);
    if (response.data.message === "Success") {
      alert("Accomplished");
    } else {
      alert("Madi");
    }
    CloseEdit();
  }

    //not accomplished
    async function handleUpdateNotAccomplished() {
      const url = `${BASE_URL}/update_status.php`;
      
      let fData = new FormData();
      fData.append("request_id", selectedRequest.request_id);
      fData.append("request_status", "Not Accomplished");
  
      const response = await axios.post(url, fData);
      if (response.data.message === "Success") {
        alert("Not Accomplished");
      } else {
        alert("Madi");
      }
      CloseEdit();
    }


  

  return (
    <ThemeProvider theme={theme}>
      <div className="page-container">
        <Header />
        <div className="rlogs-text">Requests</div>
        <Paper sx={{ borderRadius: '10px' }}>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <th className='requestlog-th' style={{ textAlign: 'center' }}>Vehicle Name</th>
                  <th className='requestlog-th' style={{ textAlign: 'center' }}>Requested by</th>
                  <th className='requestlog-th' style={{ textAlign: 'center' }}>Destination</th>
                  <th className='requestlog-th' style={{ textAlign: 'center' }}>Status</th>
                  <th className='requestlog-th' style={{ textAlign: 'center' }}>Action</th>
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
                                : request.request_status === "Cancelled"
                                ? '#6e6e6e'
                                : request.request_status === "For Approval"
                                ? '#025BAD'
                                : request.request_status === "Accomplished"
                                ? 'purple'
                                : request.request_status === "Not Accomplished"
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

                      <TableCell style={{ textAlign: 'center' }}>
                        <Button variant="contained" onClick={() => handleOpenView(request)}>
                          View Details
                        </Button>

                        {/* <Button variant="contained" disabled={request.request_status !== "Approved"} >
                          /
                        </Button> */}
                        <Button variant="contained" onClick={() => handleAccomplished(request)}  disabled={request.request_status !== "Approved"}>
                          /
                        </Button>

                        <Button variant="contained" onClick={() => handleNotAccomplished(request)}  disabled={request.request_status !== "Approved"}>
                            X
                        </Button>
                      </TableCell>
                      {/* <TableCell style={{ textAlign: 'center' }}>
                        {request.request_status === "Approved" && (
                          <Button variant="contained" onClick={() => handleAccomplished(request)}>
                             Accomplished
                          </Button>
                        )}                         
                      </TableCell>
                      <TableCell>
                          
                      </TableCell> */}
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
              <div className="div-drvreq">
                <div className="div1-drvreq">
                  <div className="div1-drvreq">
                    <img className="summary-logo" src="/images/summary_logo.png" alt=''/>
                  </div>
                </div>
                <div className="div2-drvreq">
                  <p className="header-drvreq">{selectedRequest.vehicle_name}</p>
                  <p className="header-label-drvreq">Vehicle to be requested</p>
                </div>
                <div className="div3-drvreq">
                  <p className="header-drvreq">{selectedRequest.driver_name}</p>
                  <p className="header-label-drvreq">Name of the driver</p>
                </div>
                <div className="status-button-container">
                  {selectedRequest && selectedRequest.request_status && (
                    <button className={`status-button ${selectedRequest.request_status.replace(/\s+/g, '')}`}>
                      {selectedRequest.request_status}
                    </button>
                  )}
                </div>
                <div className="div5-drvreq">
                  <hr class="drvreq-hr"/>
                </div>
                <div className="div6-drvreq">
                  <p className="schedlabel-drvreq">SCHEDULE OF TRAVEL</p>
                </div>
                <div className="div7-drvreq">
                  <div className="div7table-drvreq">
                  <table>
                    <tbody>
                      <tr>
                        <td className="table-label-drvreq">
                          <p className="header-label-drvreq">Departure Date and Time:</p>
                        </td>
                        <td>
                          <p className="drvreq-details">
                          {selectedRequest.departure_time}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="table-label-drvreq">
                          <p className="header-label-drvreq">Arrival Date and Time:</p>
                        </td>
                        <td>
                        <p className="drvreq-details">
                          {selectedRequest.arrival_time}E</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="table-label-drvreq">
                          <p className="header-label-drvreq">Destination:</p>
                        </td>
                        <td>
                        <p className="drvreq-details">
                        {selectedRequest.destination}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
                <div className="div9-drvreq">
                  <p className="schedlabel-drvreq">OTHER DETAILS</p>
                </div>
                <div className="div10-drvreq">
                <div className="div10table-drvreq">
                  <table>
                    <tbody>
                      <tr>
                        <td className="table-label-drvreq">
                          <p className="header-label-drvreq">Total No. of Passenger/s:</p>
                        </td>
                        <td>
                          <p className="drvreq-details">
                            {selectedRequest.passenger_count}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="table-label-drvreq">
                          <p className="header-label-drvreq">Name of Passenger/s:</p>
                        </td>
                        <td>
                        <p className="drvreq-details">
                        {selectedRequest.passenger_names && Array.isArray(selectedRequest.passenger_names) && selectedRequest.passenger_names.map((passenger, index) => (
                          <div key={index}>{passenger}</div>
                        ))}
                        </p>
                        </td>
                      </tr>
                      <tr>
                        <td className="table-label-drvreq">
                          <p className="header-label-drvreq">Purpose:</p>
                        </td>
                        <td>
                        <p className="drvreq-details">
                          {selectedRequest.purpose}</p>
                        </td>
                      </tr>
                      <tr>
                        <td className="table-label-drvreq">
                          <p className="header-label-drvreq">Requested By:</p>
                        </td>
                        <td>
                        <p className="drvreq-details">
                        {selectedRequest.requested_by}</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
                <div className="div11-drvreq">
                  <Button onClick={handleGenerateTripTicket} variant="contained" color="primary" style={{ textTransform: 'none', backgroundColor: '#025BAD' }}>
                    Generate Trip Ticket
                  </Button>
                </div>
            </div>
          </DialogContent>
        </Dialog>
      
      {/* Accomplished modal */}

      <Dialog open={openAccomplished} onClose={CloseAccomplished} fullWidth maxWidth="sm">
      <DialogTitle className="dialog-title">
        {/* <img className="edit-logo" src="/images/edit_logo.png" /> */}
        <div className="dialog-title-content">
          <h1>Confirmation</h1>
          <p>Are you sure you want to approve this request?</p>         
        </div>
      </DialogTitle>
      <hr className="dtitle-hr" /> 
        <DialogActions>
          <Button onClick={CloseAccomplished} style={{ color: '#025BAD', fontFamily: 'Poppins' }}>Cancel</Button>
          <Button onClick={handleUpdateAccomplished} style={{ color: '#025BAD', fontFamily: 'Poppins' }} >Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Accomplished modal */}

      <Dialog open={openNotAccomplished} onClose={CloseNotAccomplished} fullWidth maxWidth="sm">
      <DialogTitle className="dialog-title">
        {/* <img className="edit-logo" src="/images/edit_logo.png" /> */}
        <div className="dialog-title-content">
          <h1>Confirmation</h1>
          <p>Not Accomplished?</p>         
        </div>
      </DialogTitle>
      <hr className="dtitle-hr" /> 
        <DialogActions>
          <Button onClick={CloseNotAccomplished} style={{ color: '#025BAD', fontFamily: 'Poppins' }}>Cancel</Button>
          <Button onClick={handleUpdateNotAccomplished} style={{ color: '#025BAD', fontFamily: 'Poppins' }} >Confirm</Button>
        </DialogActions>
      </Dialog>

      

      </div>
    </ThemeProvider>
  );
}