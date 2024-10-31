import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  AbcOutlined,
  Close,
  EditOutlined,
  Email,
  LocationOnOutlined,
} from "@mui/icons-material";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import FlexBetween from "../../../Components/FlexBetween";
import UserImg from "../../../Components/UserImg";
import WidgetWrapper from "../../../Components/WidgetWrapper";
import EditProfileWidget from "./EditProfileWidget";
import FlexBetweenColumn from "../../../Components/FlexBetweenColumn";

const UserWidgets = ({ user, admin }) => {
  const theme = useTheme();
  const [editProf, setEditProf] = useState(false);
  const medium = theme.palette.neutral.medium;
  const main = theme.palette.neutral.main;
  const isNonMobileScreens = useMediaQuery("(min-width:700px)");

  if (!user) return null;

  const handleEditProfile = () => setEditProf(!editProf);

  return (
    <FlexBetween
      flexDirection={isNonMobileScreens ? "row" : "column"}
      alignItems="center"
    >
      {/* Left Section: User Image */}
      <FlexBetweenColumn height={"100%"}>
        <UserImg
          image={user?.picPath}
          size={isNonMobileScreens ? "250px" : "10rem"}
        />
        <Box flexGrow={1}></Box>
      </FlexBetweenColumn>
      {editProf ? (
        <Box pl="1rem" width={isNonMobileScreens ? "auto" : "100%"}>
          <Box>
            <Typography
              variant="h4"
              fontWeight={500}
              color={theme.palette.primary.main}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={medium}>@{user.username}</Typography>
          </Box>

          <Divider />

          <Box p="0.2rem 0">
            <Box display="flex" alignItems="center" gap="1rem" m="0.2rem 0">
              <Email fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>{user.email}</Typography>
            </Box>
          </Box>

          <Divider />

          <Box p="0.2rem 0">
            <Box display="flex" alignItems="center" gap="1rem" m="0.2rem 0">
              <LocationOnOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>
                {user.location?.city &&
                user.location?.state &&
                user.location?.pincode
                  ? `${user.location.city} ${user.location.state}, ${user.location.pincode}`
                  : "Location not specified"}
              </Typography>
            </Box>
          </Box>

          <Box p="0.2rem 0">
            <Box display="flex" alignItems="center" gap="1rem" m="0.2rem 0">
              <AbcOutlined fontSize="large" sx={{ color: main }} />
              <Typography color={medium}>
                {user.about || "No bio available"}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <EditProfileWidget user={user} />
      )}
      {/* Middle Section: User Details */}

      {admin && (
        <FlexBetween flexGrow={1} height="100%">
          <Box flexGrow={1} height="100%"></Box>
          <FlexBetweenColumn>
            <IconButton
              onClick={handleEditProfile}
              sx={{
                "&:hover": {
                  color: theme.palette.primary.main, // Change color to blue on hover
                },
              }}
            >
              {editProf ? (
                <EditOutlined
                  sx={{ fontSize: isNonMobileScreens ? "50px" : "30px" }}
                />
              ) : (
                <Close
                  sx={{ fontSize: isNonMobileScreens ? "50px" : "30px" }}
                />
              )}
            </IconButton>
            <Box flexGrow={1} height="100%"></Box>
          </FlexBetweenColumn>
        </FlexBetween>
      )}
    </FlexBetween>
  );
};

export default UserWidgets;
