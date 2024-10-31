import React from "react";
import FlexBetween from "../../../Components/FlexBetween";
import WidgetWrapper from "../../../Components/WidgetWrapper";
import Form from "../../LoginPage/Form";
import { useMediaQuery } from "@mui/material";

// Define the EditProfileWidget component
const EditProfileWidget = ({ user }) => {
  // Create an object containing user data
  const userData = {
    about: user.about,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    location: user.location,
    picPath: "",
    username: user.username,
  };
  const isNonMobileScreens = useMediaQuery("(min-width:700px)");

  return (
    <FlexBetween width={isNonMobileScreens ? "50%" : "100%"}>
      {/* Render the Form component with specific props */}
      <Form pageType={"Register"} user={userData} editProfile={true} />
    </FlexBetween>
  );
};

export default EditProfileWidget;
