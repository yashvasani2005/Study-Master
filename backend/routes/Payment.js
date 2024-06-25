
const express = require("express")
const router = express.Router()

const { capturePayment, verifythesignature, sendPaymentSuccessEmail } = require("../controller/payment")
const { auth, isInstructor, isstudent, isAdmin } = require("../middleware/auth")  


router.post("/capturePayment", auth, isstudent, capturePayment)
router.post("/verifyPayment",auth, isstudent, verifythesignature)
// router.post("/sendPaymentSuccessEmail", auth, isstudent, sendPaymentSuccessEmail);


module.exports = router
