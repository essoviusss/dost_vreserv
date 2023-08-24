import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../pages/GlobalCSS/ToastStyles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const DriverHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useAuth(); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!isLoggedIn && token === null) {
          navigate('/');
        }
    }, [isLoggedIn, navigate]);

      const logout = () => {
        localStorage.removeItem("token");
        toast.error("You have been logged out!");
        navigate("/", { replace: true });
      };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const showConfirmation = () => {
    setShowConfirmationModal(true);
  };

  const hideConfirmation = () => {
    setShowConfirmationModal(false);
  };

  const confirmLogout = () => {
    logout();
    hideConfirmation();
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        color: '#025BAD',
        padding: '10px',
        paddingLeft: 0,
        marginLeft: 0,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        height: '60px',
        zIndex: '99',
        '@media(max-width: 768px)': {
          flexDirection: 'column',
          justifyContent: 'center',
          height: 'auto',
          padding: '20px'
        },
      }}
    >
      <div style={{ position: 'relative', marginRight: '30px', color: '#025BAD'}}>
        Driver
      </div>

      <div style={{ cursor: 'pointer', position: 'relative', marginRight: '10px' }} onClick={handleDropdownClick}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#025BAD',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
        {isDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '60px',
              right: '0px',
              backgroundColor: 'white',
              padding: '10px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              borderRadius: '5px',
              zIndex: 1,
              width: '150px'
            }}
          >
            {/* <div style={{ cursor: 'pointer' }} onClick={() => console.log('Profile clicked')}>
              Profile
            </div> */}
            <div style={{ cursor: 'pointer', color: 'red' }} onClick={showConfirmation}>
              Logout
            </div>
          </div>
        )}
      </div>
      <Dialog open={showConfirmationModal}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to perform this action?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideConfirmation}  style={{ color: '#025BAD', fontFamily: 'Poppins' }}>
            No
          </Button>
          <Button  onClick={confirmLogout} style={{ color: '#025BAD', fontFamily: 'Poppins' }}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
};

export default DriverHeader;
