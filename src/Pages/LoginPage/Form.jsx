import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading/Loading";
import FormFields from "./FormFields.jsx";
import { loginApiCall, registerApiCall, updateProfile } from "./auth.api";
import { toast } from "react-toastify";
import MyAlert from "../../Components/MyAlert"; // Import MyAlert

const Form = ({ pageType, editProfile, user }) => {
  const initialValuesRegister = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    about: "",
    password: "",
    picPath: "",
    location: {
      state: "Gujarat",
      city: "",
      pincode: "",
    },
  };
  const initialValuesLogin = {
    uid: "",
    password: "",
  };

  const { palette } = useTheme();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "Login";
  const isRegister = pageType === "Register";

  const [isUsernameAvailable, setIsUsernameAvailable] = useState(undefined);

  const [values, setValues] = useState(
    isLogin ? initialValuesLogin : editProfile ? user : initialValuesRegister
  );

  const [errMsg, setErrMsg] = useState(null); // State for error message
  const [successMsg, setSuccessMsg] = useState(null); // State for success message

  const onChangehandle = (val, name) => {
    setValues({ ...values, [name]: val });
  };

  const imgChangeHandl = (fl, name) => {
    setValues({ ...values, [name]: fl });
  };

  console.log(values)
  const token = useSelector((s) => s.token);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg(null);
    setSuccessMsg(null);

    try {
      if (editProfile) values["_id"] = true;
      if (isLogin) {
        const response = await loginApiCall({ values, dispatch, navigate });
        if (response.success) {
          setSuccessMsg(response.message);
        } else {
          setErrMsg(response.message);
        }
      } else if (editProfile && values.email === user.email) {
        const response = await updateProfile({
          values,
          dispatch,
          token,
          navigate,
        });
        if (response.success) {
          setSuccessMsg(response.message);
        } else {
          setErrMsg(response.message);
        }
      } else {
        if (isUsernameAvailable) {
          const response = await registerApiCall(values);
          if (response.success) {
            alert(response.message);
            navigate("/auth/login")
          } else {
            setErrMsg(response.message);
          }
        } else {
          setErrMsg(
            isUsernameAvailable === undefined
              ? "Please click on check availibility button to confirm your username is unique!"
              : "username is already in used by someone else !"
          );
        }
      }
    } catch (error) {
      const message = error?.message || "An unexpected error occurred.";
      setErrMsg(message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setValues(!isLogin ? initialValuesLogin : initialValuesRegister);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
        {loading ? (
          <Loading />
        ) : (
          <FormFields
            onChangehandle={onChangehandle}
            values={values}
            isRegister={isRegister}
            isLogin={isLogin}
            imgChangeHandl={imgChangeHandl}
            editProfile={editProfile}
            isUsernameAvailable={isUsernameAvailable}
            setIsUsernameAvailable={setIsUsernameAvailable}
          />
        )}
        <Box>
          <Button
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            {isLogin ? "LOGIN" : editProfile ? "Save Changes" : "REGISTER"}
          </Button>
          {!editProfile && (
            <Typography
              onClick={() => {
                navigate(`/auth/${isLogin ? "signup" : "login"}`);
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          )}
          {isLogin && (
            <Typography
              onClick={() => {
                navigate("/auth/changepass", { state: { page: "enteremail" } });
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              Forgot Password?
            </Typography>
          )}
        </Box>
      </form>
      <MyAlert
        open={!!errMsg || !!successMsg}
        onClose={() => {
          setErrMsg(null);
          setSuccessMsg(null);
        }}
        message={errMsg || successMsg}
        severity={errMsg ? "error" : "success"}
      />
    </>
  );
};

export default Form;
