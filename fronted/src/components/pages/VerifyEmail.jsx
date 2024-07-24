import React, { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import './VerifyEmail.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/operations/authAPI";
import { sendOtp } from "../../services/operations/authAPI";

function VerifyEmail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, signupData } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [navigate, signupData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    };

    return (
        <div className="verify-email-container">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="verify-email-form-container">
                    <h1>Verify Email</h1>
                    <p>A verification code has been sent to you. Enter the code below</p>
                    <form onSubmit={handleSubmit}>
                    <OtpInput value={otp} onChange={setOtp} numInputs={6}                      // this otp box conatiner is copied from internet  
                  renderInput = {(props) => (
                    <input {...props}  placeholder="-"  style={{boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",}}  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"  />
                        )}
                  containerStyle = {{ justifyContent: "space-between", gap: "0 6px", }} 
                />
                        <button className="verifyemailbutton" type="submit">
                            Verify Email
                        </button>
                    </form>
                    <div className="back-to-login">
                        <Link to="/login">
                            <p>Back to Login</p>
                        </Link>
                    </div>
                    <button className="resendit" onClick={() => dispatch(sendOtp(signupData.email))}>
                        Resend it
                    </button>
                </div>
            )}
        </div>
    );
}

export default VerifyEmail;
