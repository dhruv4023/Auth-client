import React from "react";
import { Alert } from "@mui/material";

function MyAlert({ open, onClose, message, severity = "info" }) {
  return (
    open && (
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          zIndex: 1000, // Ensures it's on top of other elements
        }}
      >
        <Alert severity={severity} onClose={onClose} sx={{ minWidth: "250px" }}>
          {message}
        </Alert>
      </div>
    )
  );
}

export default MyAlert;
