import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";

const MyButton = ({
  children,
  onClick,
  disabled = false,
  fullWidth = true,
  color,
  sx = {},
  ...props
}) => {
  const { palette } = useTheme();

  // Default styles
  const defaultStyles = {
    m: ".5rem 0",
    fontWeight: 650,
    backgroundColor: color || palette.primary.main,
    color: palette.background.alt,
    "&:hover": {
      color: palette.primary.main,
      backgroundColor: palette.background.alt,
    },
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{ ...defaultStyles, ...sx, fontSize: "1rem" }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MyButton;
