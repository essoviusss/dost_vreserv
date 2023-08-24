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

const Sidebar = () => {
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
        <CDBSidebarHeader
  prefix={
    <i
      className="fa fa-bars fa-large custom-icon"
      onClick={handleToggle}
      style={{ height: '50px' }}
    />
  }
>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
      src="/images/blue_logo.png"
      alt="logo"
      style={{ height: '40px', marginRight: '8px', marginTop: '3px' }}
    />
    <span style={{ color: 'inherit', fontSize: '120%', paddingTop: '5px' }}>
      {showLogo ? 'VRESERV' : ''}
    </span>
  </div>
</CDBSidebarHeader>


        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/DrvDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem style={location.pathname === '/DrvDashboard' ? {backgroundColor: '#EBF1FF', borderRadius: '15px', padding: '5px'} : {borderRadius: '10px', padding: '5px'}} className={location.pathname === '/DrvDashboard' ? 'text-primary' : 'text-gray'} icon="columns" iconClassName={`fa-columns ${location.pathname === '/DrvDashboard' ? 'active-icon' : ''}`}><span>Dashboard</span></CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/DrvRequestLogs" activeClassName="activeClicked">
              <CDBSidebarMenuItem style={location.pathname === '/DrvRequestLogs' ? {backgroundColor: '#EBF1FF', borderRadius: '15px', padding: '5px'} : {borderRadius: '10px', padding: '5px'}} className={location.pathname === '/DrvRequestLogs' ? 'text-primary' : 'text-gray'} icon="file" iconClassName={`fa-file ${location.pathname === '/DrvRequestLogs' ? 'active-icon' : ''}`}>Request Logs</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/DrvAccomplished" activeClassName="activeClicked">
              <CDBSidebarMenuItem style={location.pathname === '/DrvAccomplished' ? {backgroundColor: '#EBF1FF', borderRadius: '15px', padding: '5px'} : {borderRadius: '10px', padding: '5px'}} className={location.pathname === '/DrvAccomplished' ? 'text-primary' : 'text-gray'} icon="history" iconClassName={`fa-history ${location.pathname === '/DrvAccomplished' ? 'active-icon' : ''}`}>History</CDBSidebarMenuItem>
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
  .custom-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    // padding: 10px;
    // height: 10px;
    // margin-top: 10px;
  }
  
`}
</style>


</div>
);
};

export default Sidebar;