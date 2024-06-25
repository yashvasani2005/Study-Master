const express = require("express")
const router = express.Router()

// Routes for Login, Signup,sendotp ,changepassword  and Authentication and resetpassword;


// Import the required controllers and middleware functions
const { login, signup, Otpgenerator, changePassword,} = require("../controller/Auth")
const { resetpasswordtoken,  resetpassword,} = require("../controller/resetpassword")
const { auth } = require("../middleware/auth")


// ********************************************************************************************************
//                                      Authentication routes                                             *
// ********************************************************************************************************
router.post("/login", login)                      // Route for user login
router.post("/signup", signup)                    // Route for user signup
router.post("/sendotp", Otpgenerator)                  // Route for sending OTP to the user's email
// router.post("/changepassword", auth, changePassword)     // Route for Changing the password



// ********************************************************************************************************
//                                      Reset Password                                                    *
// ********************************************************************************************************
router.post("/reset-password-token", resetpasswordtoken)                 // Route for generating a reset password token
router.post("/reset-password", resetpassword)                          // Route for resetting user's password after verification


module.exports = router

 