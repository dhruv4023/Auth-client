import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import FlexBetween from "./FlexBetween";
import { Navbar } from "../Pages/Navbar/Navbar";

const WidgetsOnPage = ({ title, components }) => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar />
      {title && (
        <Box
          width="100%"
          p="1rem 6%"
          textAlign="center"
          backgroundColor={theme.palette.background.default}
        >
          <Typography
            fontWeight="bold"
            fontSize="1.5rem"
            color={theme.palette.neutral.main}
          >
            {title}
          </Typography>
        </Box>
      )}
      <FlexBetween margin={1} flexDirection={"column"}>
        <Box
          display="grid"
          gridTemplateColumns={ "1fr"}
          gap={1}
          width="100%"
        >
          {components}
        </Box>
      </FlexBetween>
    </Box>
  );
};

export default WidgetsOnPage;
