import { useTheme } from "@emotion/react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../Components/FlexBetween";
import Loading from "../../Components/Loading/Loading";
import MyAlert from "../../Components/MyAlert"; // Import MyAlert component
import { changePasswordApiCall, sendOTPRequest } from "./auth.api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [OTP, setOTP] = useState("");
  const [disableEmailField, setDisableEmailField] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    try {
      setLoading(true);
      if (!email) {
        setErrMsg("Please enter an email to send OTP");
      } else {
        const { success, message } = await sendOTPRequest(email);
        if (success) {
          setDisableEmailField(true);
          setSuccessMsg("OTP sent successfully");
          setErrMsg(null);
        } else {
          setErrMsg(message);
        }
      }
    } catch (error) {
      setErrMsg("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmitChangePass = async () => {
    try {
      setLoading(true);
      if (password !== repass) {
        setErrMsg("Passwords do not match. Please enter the same password.");
      } else if (OTP.length !== 6) {
        setErrMsg("Please enter a 6-digit OTP.");
      } else {
        const { success, message } = await changePasswordApiCall({
          email,
          password,
          otp: OTP,
        });
        if (success) {
          navigate("/auth/login");
        } else {
          setErrMsg(message);
        }
      }
    } catch (error) {
      setErrMsg(error.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const { palette } = useTheme();

  return (
    <FlexBetween width="100%" flexDirection="column">
      <FormControl onSubmit={handleSendOTP} style={{ width: "100%" }}>
        <TextField
          variant="standard"
          required
          label="Email"
          disabled={disableEmailField}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          sx={{ margin: "0.5rem", width: "100%" }}
        />
        {!disableEmailField && (
          <Button onClick={handleSendOTP} type="submit" disabled={loading}>
            Send OTP
          </Button>
        )}
      </FormControl>

      {disableEmailField && (
        <Box style={{ width: "100%" }}>
          <TextField
            variant="standard"
            required
            label="OTP"
            slotProps={{
              htmlInput: {
                minLength: 6,
                maxLength: 6,
              },
            }}
            error={OTP.length > 0 && OTP.length !== 6}
            onChange={(e) => setOTP(e.target.value)}
            value={OTP}
            name="otp"
            sx={{ margin: "0.5rem", width: "100%" }}
          />
          <TextField
            variant="standard"
            required
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            sx={{ margin: "0.5rem", width: "100%" }}
          />
          <TextField
            variant="standard"
            required
            label="Re-Enter Password"
            type="password"
            error={password !== repass && repass !== ""}
            onChange={(e) => setRepass(e.target.value)}
            value={repass}
            name="repassword"
            sx={{ margin: "0.5rem", width: "100%" }}
          />
          <Button
            onClick={handleFormSubmitChangePass}
            fullWidth
            type="submit"
            disabled={loading}
            color="primary"
          >
            Submit
          </Button>
        </Box>
      )}

      {loading && <Loading />}

      {/* MyAlert component to display messages */}
      <MyAlert 
        open={!!errMsg || !!successMsg}
        onClose={() => { setErrMsg(null); setSuccessMsg(null); }}
        message={errMsg || successMsg}
        severity={errMsg ? "error" : "success"}
      />
    </FlexBetween>
  );
};

export default ForgotPassword;
