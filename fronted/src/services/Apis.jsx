// const BASE_URL = import.meta.env.VITE_BASE_URL;

// export const categories = {
//     CATEGORIES_API: `${BASE_URL}/backend/controller/Category/fetchallcategory`
// };
// export const endpoints = {
//     // SENDOTP_API: BASE_URL + "/auth/sendotp",
//     SENDOTP_API: `${BASE_URL}/backend/controller/Auth/Otpgenerator`,
//     // SIGNUP_API: BASE_URL + "/auth/signup",
//       SIGNUP_API: BASE_URL + "/backend/controller/Auth/signup",

//     LOGIN_API: BASE_URL + "/backend/controller/Auth/login",
//     RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
//     RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
//   }
  

const BASE_URL = "http://localhost:4000";

export const categories = {
  CATEGORIES_API: `${BASE_URL}/backend/controller/Category/fetchallcategory`
};

export const endpoints = {
  SENDOTP_API: `${BASE_URL}/api/v1/auth/sendotp`,
  SIGNUP_API: `${BASE_URL}/api/v1/auth/signup`,
  LOGIN_API: `${BASE_URL}/api/v1/auth/login`,

  RESETPASSTOKEN_API: `${BASE_URL}/api/v1/auth/reset-password-token`,
  RESETPASSWORD_API: `${BASE_URL}/api/v1/auth/reset-password`,

  // UPDATE_PROFILE:`${BASE_URL}/api/v1/profile/updateProfile`
  
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/api/v1/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/api/v1/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/api/v1/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/api/v1/profile/deleteProfile",
}
