const User = require("../models/User")
const MailSender = require("../utiles/MailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto");

exports.resetpasswordtoken = async (req, res) => {
    try {
        //get mail from request body

        const { mail } = req.body;

        //cheking--->mail must be altready registered

        const user = await User.findOne({ email: mail })

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your mail is no tregistered with us so please you are must be registered"
            })
        }

        //generate the token


        const token = crypto.randomUUID();  

        //update the user by adding token and expiring time

        const updateduser = await User.findOneAndUpdate(
            { email: mail },
            { token: token, resetpasswordexpire: Date.now() + 5 * 60 * 1000 }, { new: true })
        console.log(updateduser)
        // create the url
        const url = `http://localhost:5173/update-password/${token}`

        //send the mail

        await MailSender(
            mail,
            "Reser Your Password ",
            `password reset link ${url}`
        )

        return res.json({
            success: true,
            message: "Email sent Succesfully open the link and reset your password"
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Error in While sending mail for reset password"
        })
    }


}

//reset password means whole password reseting


exports.resetpassword = async (req, res) => {

    try {
        //data fetch
        const { password, confirmPassword, token } = req.body

        //validation

        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: "Both password does not matching"
            })
        }
        //get userdetails

        const userdetails = await User.findOne({ token: token })

        //check the uservalidation

        if (!userdetails) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid"
            })
        }

        //token time checking

        if (userdetails.resetpasswordexpire < Date.now()) {
            return res.json({
                success: false,
                message: "Token Expired please try Again Later"
            })
        }
        //hash the password

        const hashpassword = await bcrypt.hash(password, 10)

        //find and update the entry of the passsword in database

        await User.findOneAndUpdate(
            { token: token },
            { password: hashpassword },
            { new: true })

            return res.status(200).json({
                success:true,
                message:"Password Updated Succesfully"
            })

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Error while reseting password"
        })
    }



}