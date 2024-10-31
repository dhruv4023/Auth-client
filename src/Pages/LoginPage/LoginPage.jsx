import Form from "./Form";
import React, { useEffect } from "react";
import { Box, Typography, useTheme, useMediaQuery, Link } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import MyTitle from "../../Components/MyCompoenents/MyTitle";
import FlexEvenly from "../../Components/FlexEvenly";
import { Google } from "@mui/icons-material";

const LoginPage = () => {
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const theme = useTheme();
  const { page } = useParams();

  const containerWidth = isNonMobileScreens ? "40%" : "90%";

  useEffect(() => {
    if (!["login", "signup", "changepass"].includes(page)) {
      navigate("/404");
    }
  }, [page, navigate]);

  const googleAuthLink = `${
    process.env.REACT_APP_REST_API
  }/auth/google/?baseurl=${encodeURIComponent(window.location.origin)}`;

  return (
    <Box>
      <Box
        width={"100%"}
        p={"1rem 6%"}
        textAlign="center"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography
          color={"primary"}
          onClick={() => navigate("/")}
          fontWeight={"bold"}
          fontSize={"clamp(1rem,1.5rem,2rem)"}
          sx={{
            "&:hover": {
              color: theme.palette.primary.dark,
              cursor: "pointer",
            },
          }}
        >
          Studio App
        </Typography>
      </Box>
      <FlexEvenly m={"2rem 0 0 0"} width={"100%"}>
        <MyTitle txt={"Authentication"} />
      </FlexEvenly>
      <Box p="2rem" m={"2rem auto"} width={containerWidth}>
        {page === "login" && <Form pageType="Login" />}
        {page === "signup" && <Form pageType="Register" />}
        {page === "changepass" && <ForgotPassword />}
      </Box>
      {(page === "login" || page === "signup") && (
        <Box
          m="1rem auto"
          width={containerWidth}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Link
            href={googleAuthLink}
            sx={{
              "&:hover": {
                color: theme.palette.primary.dark,
                cursor: "pointer",
              },
              textDecoration: "none",
              color: "#4285F4",
              fontWeight: "bold",
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Google sx={{ marginRight: "0.5rem" }} />
            {page === "login" ? "Login" : "Sign Up"} with Google
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;
