import React from "react";
import EmpHome from "./EmpHome";
import '../Employee/components/EmpDashboard.css';
import '../GlobalCSS/content.css';
import { DataGrid} from "@mui/x-data-grid";

const columns = [
  { field: "request_id", headerName: "Request ID", width: 200 },
  { field: "request_date", headerName: "Request Date", width: 200 },
  { field: "destination", headerName: "Destination", width: 250 },
  { field: "request_status", headerName: "Status", width: 130 }

  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  {
    id: 1,
    request_id: 2563,
    request_date: "04/01/2023",
    destination: "San Juan, La Union",
    request_status: "Pending"
  },
  {
    id: 2,
    request_id: 2563,
    request_date: "04/01/2023",
    destination: "San Juan, La Union",
    request_status: "Approved"
  }
];



export default function EmpDashboard(){
    return(
        <div>

            <center><h1>Dashboard</h1></center>
            <div className="main-content">
              <div>
              <div style={{ height: 400, width: "80%", backgroundColor: "white", borderRadius: "5" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              paginationModel={{ page: 0, pageSize: 5}}
            />
    </div>
              </div>
           
            </div>
        </div>
    );
}