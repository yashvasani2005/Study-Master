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
  LOGOUT_API:`${BASE_URL}/api/v1/auth/logout`,

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

// PROFILE ENDPOINTS
export const profileEndpoints = {
  // GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/api/v1/profile/getEnrolledCourses",
  // GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}


// COURSE ENDPOINTS
export const courseEndpoints = {
  // GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  // COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
   EDIT_COURSE_API: BASE_URL + "/api/v1/course/editCourse",
 COURSE_CATEGORIES_API: BASE_URL + "/api/v1/course/showAllCategories",
  // CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  // CREATE_SECTION_API: BASE_URL + "/course/addSection",
  // CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  // UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  // UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/api/v1/course/getInstructorCourses",
  // DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  // DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/api/v1/course/deleteCourse",
//   GET_FULL_COURSE_DETAILS_AUTHENTICATED:
//     BASE_URL + "/course/getFullCourseDetails",
//   LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
//   CREATE_RATING_API: BASE_URL + "/course/createRating",
}