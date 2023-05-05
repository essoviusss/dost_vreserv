import React, { useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [showLogo, setShowLogo] = useState(true);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#025BAD" backgroundColor="white" style={{ boxShadow: "2px 0px 5px 0px rgba(50, 50, 50, 0.5)" }}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          {showLogo && <img src="/images/blue_logo.png" alt="logo" style={{ height: '30px', marginRight: '10px' }} />}
          <span className="text-decoration-none" style={{ color: 'inherit' }}>
            {showLogo ? 'Sidebar' : ''}
          </span>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/EmpDashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns" iconClassName="text-primary" style={{ color: '#025BAD' }}>Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/EmpVehicleRequest" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table" iconClassName="text-primary" style={{ color: '#025BAD' }}>Vehicle Request</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/EmpRequestLogs" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user" iconClassName="text-primary" style={{ color: '#025BAD' }}>Request Logs</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
