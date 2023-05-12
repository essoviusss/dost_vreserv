import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useLocation } from 'react-router-dom';

const DriverSidebar = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [isToggled, setIsToggled] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100%',
      transition: 'margin-right 0.5s ease',
      marginRight: isToggled ? '80px' : '270px',
      backgroundColor: '#F4F7FE',
      overflow: 'hidden'
    }}>
      <CDBSidebar 
        textColor="#025BAD"
        backgroundColor="white"
        style={{ 
          boxShadow: "2px 0px 5px 0px rgba(50, 50, 50, 0.2)", 
          position: 'fixed'
        }}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={handleToggle} />}>
          {showLogo && (
            <img
              src="/images/blue_logo.png"
              alt="logo"
              style={{ height: '35px', marginRight: '8px' }}
            />
          )}
          <span className="text-decoration-none" style={{ color: 'inherit', fontSize: '120%' }}>
            {showLogo ? 'VRESERV' : ''}
          </span>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/DrvDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem style={location.pathname === '/DrvDashboard' ? {backgroundColor: '#EBF1FF', borderRadius: '15px', padding: '5px'} : {borderRadius: '10px', padding: '5px'}} className={location.pathname === '/EmpDashboard' ? 'text-primary' : 'text-gray'} icon="columns" iconClassName={`fa-columns ${location.pathname === '/EmpDashboard' ? 'active-icon' : ''}`}><span>Dashboard</span></CDBSidebarMenuItem>
            </NavLink>
           
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          {/* <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div> */}
        </CDBSidebarFooter>
      </CDBSidebar>
      <style>
{`
  .sidebar-content .fa-columns, .sidebar-content .fa-table, .sidebar-content .fa-user { color: gray; }

  .sidebar-content .activeClicked {
    color: #025BAD !important;
    background-color: red !important;
    border-radius: 10px !important;
  }

  .sidebar-content .active-icon {
    color: #025BAD !important;
  }

  .text-primary {
    color: #025BAD !important;
    font-weight: bold;
  }

  .text-gray {
    color: gray !important;
  }
`}
</style>


</div>
);
};

export default DriverSidebar;