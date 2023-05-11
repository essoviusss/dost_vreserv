import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import '../Employee/components/EmpTrack.css'


export default function EmpRequestLogs(){

    return(
        <div>
            <div>

                <div style={{marginLeft: '30%', marginTop: '2%'}}>
                    <TextField
                    id="search"
                    placeholder="Search..."
                    variant="outlined"
                    style={{ width: '130vh' }}
                />
                </div>
                <div>
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="sm">
                        <Box sx={{ 
                            bgcolor: '#cfe8fc', 
                            height: '70vh', 
                            width: '130vh', 
                            borderRadius: 2,
                            marginTop: '20px',
                            p: 2}}>
                                <div className="flex-container">
                                    <div className="">
                                        <Typography variant="h4" component="h4" gutterBottom>A1M 904 HILUX</Typography>
                                        <Typography variant="body1" component="p" gutterBottom>Vehicle to be Requested</Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h4" component="h1" gutterBottom>David H. Lim III</Typography>
                                        <Typography variant="body1" component="p" gutterBottom>Name of the Driver</Typography>
                                    </div>
                                    <div>
                                    <Button className="edit-btn" variant="contained" color="primary" >Edit</Button>
                                    </div>
                               
                                </div>
                                <Divider sx={{ width: '100%', marginBottom: 2 }} />
                                <Typography variant="h5" component="h1" gutterBottom>Schedule of Travel</Typography>
                                <Typography variant="body1" component="p" gutterBottom>Date: </Typography>
                                <Typography variant="body1" component="p" gutterBottom>Time of Departure: </Typography>
                                <Typography variant="body1" component="p" gutterBottom>Time of Return to Garage: </Typography>
                                <Typography variant="body1" component="p" gutterBottom>Destination: </Typography>
                                <Typography variant="h5" component="h1" gutterBottom>Other Details </Typography>
                                <Typography variant="body1" component="p" gutterBottom>Total No. of Passengers: </Typography>
                                <Typography variant="body1" component="p" gutterBottom>Name of Passenger/s: </Typography>
                                <Typography variant="body1" component="p" gutterBottom>Purpose: </Typography>
                                <Typography variant="body1" component="p" gutterBottom>Requested by: </Typography>
                        </Box>
                    </Container>
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
}