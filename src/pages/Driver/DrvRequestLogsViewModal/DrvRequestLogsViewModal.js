import React from "react";
import { Dialog, DialogContent, DialogContentText } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function DrvRequestLogsViewModal({ open, handleClose, selectedRequest, generateTripTicket }) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <Button onClick={handleClose} style={{ color: 'gray', position: 'absolute', top: 10, right: 0, paddingLeft: 0, paddingRight: 0 }}>
        <CloseRoundedIcon />
      </Button>
      <DialogContent>
        <DialogContentText>
        </DialogContentText>
        {/* Rest of the view modal content */}
      </DialogContent>
    </Dialog>
  );
}
