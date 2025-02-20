import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/Authslice";
import { resetCart } from "../../slices/Cartslice";
import { setUser } from "../../slices/Profileslice";
import {ApiConnector} from "../Apiconnector"
import { endpoints } from "../Apis";
import Cookies from "js-cookie";
/*
 const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })
           here "POST" Is request and LOGIN_API is api and input me (emali , password) hai so basically we are making
           a request("POST") to the API("LOGIN_API") and passing input (emali , password)
 
*/

const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API, LOGOUT_API } = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await ApiConnector("POST", SENDOTP_API, { email, checkUserPresent: true });
      console.log("SENDOTP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await ApiConnector("POST", SIGNUP_API, { accountType, firstName, lastName, email, password, confirmPassword, otp });
      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await ApiConnector("POST", LOGIN_API, { email, password });
      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log("your reponse is here::",response);
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      
      const userImage = response.data?.user?.image ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    try {
      // Call the logout API endpoint
      await ApiConnector("POST", LOGOUT_API);
      
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Clear Redux state
      dispatch(setToken(null));
      dispatch(setUser(null));
      dispatch(resetCart());

      toast.success("Logged Out");
      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);
      toast.error("Logout failed");
    }
  };
}

export function getPasswordResetToken(mail, setsentmail) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await ApiConnector("POST", RESETPASSTOKEN_API, { mail });
      console.log("RESET PASSWORD TOKEN RESPONSE....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setsentmail(true);
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await ApiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });
      console.log("RESET Password RESPONSE ... ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Password has been reset successfully");
    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  };
}
