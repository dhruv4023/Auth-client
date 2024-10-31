import axios from 'axios';
import { setLogin } from "../../state/index";

// Base URL and config
const api = axios.create({
  baseURL: process.env.REACT_APP_REST_API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// Function to register a user
export const registerApiCall = async (values) => {
  try {
    const formData = new FormData();
    if (values["picPath"] === "") delete values["picPath"];
    appendData(formData, values);

    const response = await api.post(`/auth/register`, formData);
    return { success: true, message: response.data.message || "Registration successful. Please log in!" };
  } catch (error) {
    const message = error?.response?.data?.message || "Error while registering";
    return { success: false, message };
  }
};

// Function to log in a user
export const loginApiCall = async ({ values, dispatch, navigate }) => {
  try {
    const loggedInResponse = await api.post(`/auth/login`, values);
    const loggedIn = loggedInResponse.data;
    dispatch(setLogin({
      user: loggedIn.data.user,
      token: loggedIn.data.token,
    }));
    navigate(`/`);
    return { success: true, message: loggedIn.message || "Login successful!" };
  } catch (error) {
    const message = error?.response?.data?.message || "Error logging in";
    return { success: false, message };
  }
};

// Function to change password with OTP verification
export const changePasswordApiCall = async ({ email, password, otp }) => {
  try {
    const response = await api.post(`/auth/change/password`, { email, password, otp });
    return { success: true, message: response.data.message || "Password changed successfully!" };
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to change password";
    return { success: false, message };
  }
};

// Function to validate username availability
export const validateUserNameAPI = async ({ username }) => {
  try {
    const response = await api.get(`/auth/is-available/username/${username}`);
    return { success: true, isAvailable: response.data.data.isAvailable };
  } catch (error) {
    const message = error?.response?.data?.message || "Error checking username availability";
    return { success: false, message };
  }
};

// Function to update a user's profile
export const updateProfile = async ({ values, dispatch, token, navigate }) => {
  try {
    const formData = new FormData();
    appendData(formData, values);
    if (values["picPath"] === "") delete values["picPath"];

    const savedUserResponse = await api.put(`/user/update`, formData, {
      headers: { Authorization: token },
    });
    const savedUser = savedUserResponse.data;
    if (savedUser?.data?.user) {
      dispatch(setLogin({
        user: savedUser.data.user,
        token: token?.split("Bearer ")[1],
      }));
      navigate(`/profile/${savedUser.data.user.username}`);
      return { success: true, message: savedUser.message || "Profile updated successfully!" };
    } else {
      return { success: true, message: savedUser.message || "Profile updated" };
    }
  } catch (error) {
    const message = error?.response?.data?.message || "Error updating profile";
    return { success: false, message };
  }
};

// Function to send OTP for email verification
export const sendOTPRequest = async (email) => {
  try {
    const response = await api.post(`/mail/send-otp`, { email });
    return { success: true, message: response.data.message || "OTP sent successfully to your email!" };
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to send OTP";
    return { success: false, message };
  }
};

// Function to log out a user
export const logout = async () => {
  try {
    const response = await api.get(`/auth/logout`);
    return { success: true, message: response.data.message || "Logged out successfully" };
  } catch (error) {
    const message = "Internal server error: " + (error?.message || "Unknown error");
    return { success: false, message };
  }
};

// Function to get session details
export const getSession = () => async (dispatch) => {
  try {
    const response = await api.get(`/auth/get/session`);
    dispatch(setLogin({ ...response.data.data }));
  } catch (error) {
    console.log(error);
  }
};



/**
 * Recursively appends data to a FormData object.
 * @param {FormData} formData - The FormData object to append data to.
 * @param {object} object - The data object to append.
 * @param {string} parentKey - The parent key (used for nested objects).
 */
export const appendData = (formData, object, parentKey) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      // Check if the value is an object and not an instance of File.
      if (typeof object[key] === "object" && !(object[key] instanceof File)) {
        // Recursively append nested object data.
        appendData(formData, object[key], currentKey);
      } else {
        formData.append(currentKey, object[key]);
      }
    }
  }
}