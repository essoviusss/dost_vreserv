
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

export default function EmpRequestLogs(){
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
      .get("http://localhost/vreserv_api/read_request.php")
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
        <div className="page-container">
          <Header/>
          <Paper>
            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>Vehicle</th>
                    <th style={{ textAlign: 'center' }}>Driver</th>
                    <th style={{ textAlign: 'center' }}>Destination</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <TableBody>
                  {filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((request) => (
                    <TableRow key={request.request_id}>
                      <TableCell style={{ textAlign: 'center' }}>{request.vehicle_name}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{request.driver_name}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{request.destination}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{request.request_status}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        <Button variant="contained" onClick={() => handleOpenView(request)}>
                          View
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
      <Dialog open={openView} onClose={CloseView} fullWidth maxWidth="sm">
        <DialogTitle>View Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To add a new employee account, please enter the details in the designated input field. */}
          </DialogContentText>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Vehicle to be Requested"
              type="text"
              fullWidth
              variant="filled"
              defaultValue={selectedRequest.vehicle_name}
              InputProps={{ readOnly: true,}}
            />
          </div>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name of the Driver"
              type="text"
              fullWidth
              variant="filled"
              defaultValue={selectedRequest.driver_name}
              InputProps={{ readOnly: true, }}
            />
          </div>
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Status"
              type="text"
              fullWidth
              variant="filled"
              defaultValue={selectedRequest.request_status}
              InputProps={{
                  readOnly: true,
                }}
            />
          </div>
          <div>
            <h6>Schedule of Travel</h6>
          </div>                                  
          <div>
            <label>Date: {selectedRequest.request_date}</label>
          </div>
          <div>
            <label>Time of Departure: {selectedRequest.departure_time}</label>
          </div>
          <div>
            <label>Time of Return to Garage: {selectedRequest.arrival_time}</label>
          </div>
          <div>
            <label>Destination: {selectedRequest.destination}</label>
          </div>
          <div>
            <h6>Other Details</h6>
          </div>
          <div>
            <label>Total No. of Passenger/s : {selectedRequest.passenger_count}</label>
          </div>
          <div>
            <label>Name of Passenger/s: </label>
            {selectedRequest.passenger_names && Array.isArray(selectedRequest.passenger_names) && selectedRequest.passenger_names.map((passenger, index) => (
              <div key={index}>{passenger}</div>
            ))}
          </div>
          <div>
            <label>Purpose: {selectedRequest.purpose}</label>
          </div>
          <div>
            <label>Requested by: {selectedRequest.requested_by}</label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={CloseView}>Close</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}