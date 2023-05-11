import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
            <div style={{ cursor: 'pointer' }} onClick={() => console.log('Profile clicked')}>
              Profile
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => console.log('Logout clicked')}>
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
