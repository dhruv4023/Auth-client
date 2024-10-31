import React, { useEffect } from "react";
import { Alert } from "@mui/material";

function MyAlert({ open, onClose, message, severity = "info" }) {
  useEffect(() => {
    if (open) {
      // Calculate duration based on message length
      const baseTime = 5000; // Base time of 5 seconds
      const extraTimePer20Chars = 1000; // Add 1 second for every 20 characters
      const duration = baseTime + Math.floor(message.length / 20) * extraTimePer20Chars;

      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer); // Cleanup timer on component unmount or if `open` changes
    }
  }, [open, onClose, message]);

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
