import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Loading from "../../Components/Loading/Loading";
import FlexEvenly from "../../Components/FlexEvenly";
import { validateUserNameAPI } from "./auth.api";
import FlexBetween from "../../Components/FlexBetween";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  CheckCircle,
  EditOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import SelectLocation from "../../Components/MyCompoenents/SelectLocation";

const FormFields = ({
  onChangehandle,
  values,
  isRegister,
  isLogin,
  isUsernameAvailable,
  setIsUsernameAvailable,
  editProfile,
  imgChangeHandl,
}) => {
  const { palette } = useTheme();
  const [addPic, setAddPic] = useState(false);

  const validateUsername = async () => {
    const tmp = await validateUserNameAPI({ username: values.username });
    setIsUsernameAvailable(tmp.isAvailable);
  };

  return (
    <>
      {isRegister && (
        <FlexEvenly>
          <TextField
            variant="standard"
            required
            label="First Name"
            onChange={(e) => onChangehandle(e.target.value, "firstName")}
            value={values.firstName}
            sx={{ margin: "0.5rem", width: "100%" }}
          />
          <TextField
            variant="standard"
            required
            label="Last Name"
            onChange={(e) => onChangehandle(e.target.value, "lastName")}
            value={values.lastName}
            sx={{ margin: "0.5rem", width: "100%" }}
          />
        </FlexEvenly>
      )}

      <FlexEvenly flexDirection="column" margin={"0 .5rem"}>
        <TextField
          variant="standard"
          required
          type={isRegister ? "email" : "text"}
          label={isLogin ? "Email or Username" : "Email"}
          onChange={(e) =>
            isLogin
              ? onChangehandle(e.target.value, "uid")
              : onChangehandle(e.target.value, "email")
          }
          value={values.email}
          sx={{ margin: "0.5rem", width: "100%" }}
        />

        {!editProfile && (
          <TextField
            variant="standard"
            required
            label="Password"
            type="password"
            onChange={(e) => onChangehandle(e.target.value, "password")}
            value={values.password}
            sx={{ margin: "0.5rem", width: "100%" }}
          />
        )}

        {isRegister && (
          <>
            <FlexBetween width={"102.5%"}>
              <TextField
                required
                variant="standard"
                label="Username"
                error={
                  isUsernameAvailable !== undefined && !isUsernameAvailable
                }
                onChange={(e) => {
                  onChangehandle(e.target.value, "username");
                  setIsUsernameAvailable(undefined);
                }}
                value={values.username}
                helperText={
                  isUsernameAvailable === false ? "Try another username" : ""
                }
                sx={{ margin: "0.5rem", width: "100%" }}
              />

              {!editProfile &&
                (isRegister ? (
                  !isUsernameAvailable ? (
                    <Button onClick={validateUsername}>
                      Check Availability
                    </Button>
                  ) : (
                    <FlexBetween alignItems="center">
                      <CheckCircle sx={{ color: "green", fontSize: "30px" }} />
                    </FlexBetween>
                  )
                ) : (
                  <Loading />
                ))}
            </FlexBetween>

            <TextField
              variant="standard"
              label="About"
              onChange={(e) => onChangehandle(e.target.value, "about")}
              value={values.about}
              sx={{ margin: "0.5rem", width: "100%" }}
            />

            <FlexBetween width={"100%"}>
              <IconButton
                onClick={() => {
                  setAddPic((prev) => !prev);
                  imgChangeHandl("", "picPath");
                }}
              >
                {addPic ? <CheckBox /> : <CheckBoxOutlineBlank />}
              </IconButton>
              <Typography flexGrow={"1"}>
                {addPic
                  ? "Click to turn off Picture Option"
                  : "Click to turn on Picture Option"}
              </Typography>
            </FlexBetween>

            {addPic && (
              <Box
                border={`2px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                width={"100%"}
                p="1rem"
                margin={"0.5rem"}
              >
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) => {
                    imgChangeHandl(acceptedFiles[0], "picPath");
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <Box
                      {...getRootProps()}
                      border={`1px dashed ${palette.primary.main}`}
                      textAlign="center"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {values.picPath ? (
                        <FlexBetween>
                          <Typography padding={"0.5rem"}>
                            {values.picPath.name}
                          </Typography>
                          <EditOutlined />
                        </FlexBetween>
                      ) : (
                        <p>Add Picture Here</p>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            )}
          </>
        )}
      </FlexEvenly>

      {isRegister && (
        <SelectLocation
          location={values.location}
          inputValues={onChangehandle}
        />
      )}
    </>
  );
};

export default FormFields;
