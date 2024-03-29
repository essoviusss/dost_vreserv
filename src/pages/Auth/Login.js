import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Auth/components/Login.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../GlobalCSS/ToastStyles.css';
//MUI
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import '../GlobalCSS/universal.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
//Icons
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BASE_URL } from "../../constants/api_url";


export default function Login(){
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

  //UI font
  const theme = createTheme({
    typography: {
      fontFamily: 'Poppins, sans-serif',
    },
  });

  //Carousel Images
  const images = [
    '/images/carousel1st.gif',
    '/images/carousel2nd.gif',
    '/images/carousel3rd.gif',
  ];
  
  //Carousel texts
  const slideTexts = [
    ['Seamless Reservation', 'Book with Ease: Experience a seamless reservation process for a stress-free start to your journey.'],
    ['Approval Workflow', 'Seamless Approval Process: Get the green light for your vehicle reservations, ensuring accountability at every step.'],
    ['Vehicle Management', 'Efficient Operations, Maximized Potential: Optimize vehicle allocation and maintenance for seamless performance.'],
  ];

  //Select Form Validation
  const [selectError, setSelectError] = useState(false);
  const validateSelect = () => {
    if (role === "") {
      setSelectError(true);
      return false;
    } else {
      setSelectError(false);
      return true;
    }
  };

  //Select Form
  const [selectBgColor, setSelectBgColor] = useState('#f9f9f9');
  const handleSelectFocus = () => {
    setSelectBgColor('#fff');
  };
  const handleSelectBlur = () => {
    setSelectBgColor('#f9f9f9');
  };
  
  //email Textfield
  const [emailBgColor, setemailBgColor] = useState('#f9f9f9');
  const handleFocus = () => {
    setIsFocused(true);
    setemailBgColor('#fff');
  };
  const handleBlur = () => {
    setIsFocused(false);
    setemailBgColor('#f9f9f9');
  };

  //Password Textfield
  const [passwordBgColor, setPasswordBgColor] = useState('#f9f9f9');
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
    setPasswordBgColor('#fff');
  };
  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
    setPasswordBgColor('#f9f9f9');
  };  

  //Password Icon and Visibility
  const [showPassword, setShowPassword] = React.useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  //Login
    useEffect(() => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("userRole");
  
      if (token) {
        if (userRole === "Employee") {
            navigate("/EmpVehicleRequest", { replace: true });
        } else if (userRole === "Driver") {
            navigate("/DrvDashboard", { replace: true });
        }
      }
    }, [navigate]);
  

    const signIn = async () => {
        const url = `${BASE_URL}/login.php`;
        if (!validateSelect()) {
          return;
        }

        let fData = new FormData();
        fData.append("email", email);
        fData.append("password", password);
      
        try {
          const response = await axios.post(url, fData);
          console.log(response.data);
      
          if (response.data.message !== "Success") {
            console.log("Login failed:", response.data.message);
            toast.error(response.data.message);
   
            return;
          }
      
          const jwtToken = await response.data.token;
          const userRole = await response.data.role.trim();
          const userId = await response.data.userId;
          const empName = await response.data.empName;
      
          if (userRole === "Employee" && role === "Employee") {
            toast.success("Login Successful");
            localStorage.setItem("token", jwtToken);
            localStorage.setItem("userRole", userRole);
            localStorage.setItem("email", email);
            localStorage.setItem("empName", empName);
            console.log(empName);
            navigate("/EmpVehicleRequest", { replace: true });
        } else if (userRole === "Driver" && role === "Driver") {
            toast.success("Login Successful");
            localStorage.setItem("token", jwtToken);
            localStorage.setItem("userRole", userRole);
            localStorage.setItem("email", email); 
            localStorage.setItem("userId", userId);
            navigate("/DrvDashboard", { replace: true });
        } else {
            toast.error("User does not exist");
        }
        } catch (error) {
          console.error("Error:", error);
          toast.error(error);
        }
      };
      
  return(
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <div className="login-container">
        <div class="column left">
          <div className="display-container">
            <div className="text-overlay">
              <img className="logo-overlay" src="/images/white_logo.png" alt="logo" />
              <span className="vreserv-text">VRESERV</span>
            </div>
            <div className="carousel-wrapper">
              <Carousel
                className="carousel-container"
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={true}
                showThumbs={false}
                interval={3000}
              >
                {images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Slide ${index + 1}`} />
                    <p className="header-text">{slideTexts[index][0]}</p>
                    <p className="subtitle-text">{slideTexts[index][1]}</p>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
        <div class="column right">
          <div className="form-container">
            <div className="logo-container">
              <img src="/images/login_logo.png" class="login-logo" alt="login-logo" />
            </div>
            <div className="login-header">
              <h2>Login</h2>
              <br/>
              <p>Enter your credentials to access your account</p>
            </div>
            <div className="login-field">
              <Box display="flex" flexDirection="column">
                <FormControl
                  variant="outlined"
                  style={{ width: '100%', backgroundColor: selectBgColor }}
                  error={selectError}
                >
                  <InputLabel id="role-select-label">Select Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    label="Select Role"
                    onFocus={handleSelectFocus}
                    onBlur={handleSelectBlur}
                    sx={{
                      height: '50px', 
                      '& .MuiOutlinedInput-input': {
                        lineHeight: '50px',  
                      },
                    }}
                  >
                    <MenuItem value="Employee">Employee</MenuItem>
                    <MenuItem value="Driver">Driver</MenuItem>
                  </Select>
                </FormControl>
                {selectError && (
                  <FormHelperText error={selectError} style={{ marginTop: 4, fontStyle: 'italic' }}>
                    Please select a role.
                  </FormHelperText>
                )}
              </Box>
            </div>
            <div className="login-field">
              <FormControl variant="outlined" style={{ width: '100%'}}>
                <TextField
                  id="email"
                  onChange={e => setemail(e.target.value)}
                  label="email"
                  variant="outlined"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  InputProps={{
                    style: { backgroundColor: emailBgColor },
                    endAdornment: (
                      <InputAdornment position="end">
                        <AlternateEmailIcon color={isFocused ? 'primary' : 'action'} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    height: '50px', 
                    '& .MuiOutlinedInput-input': {
                      lineHeight: '50px',  
                    },
                  }}
                />
              </FormControl>
            </div>
            <div className="login-field">
              <FormControl variant="outlined" style={{ width: '100%', backgroundColor: passwordBgColor }}>
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <OutlinedInput
                  onChange={e => setPassword(e.target.value)}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        style={isPasswordFocused ? { color: "#025BAD" } : {}}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    height: '50px', 
                    '& .MuiOutlinedInput-input': {
                      lineHeight: '50px', 
                    },
                  }} 
                />
              </FormControl>
            </div>
            <div className="login-button">
              <Button variant="contained" style={{ width: '100%', height: '140%', fontWeight:'bold' }} onClick={signIn}>
                Login
              </Button>
            </div>
          </div>  
        </div>
      </div>
    </ThemeProvider>
  );
}
