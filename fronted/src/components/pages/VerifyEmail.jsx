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
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} className="otp-input" />}
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
