import React, { useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import './Forgotpassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetToken } from "../../services/operations/authAPI";

function Forgotpassword() {
    const { loading } = useSelector((state) => state.auth);
    const [sentmail, setsentmail] = useState(false);
    const [mail, setmail] = useState("");
   const dispatch=useDispatch()

const Handleonsubmit=(e)=>{
   e.preventDefault();
   dispatch(getPasswordResetToken(mail,setsentmail))

}
    return (
        <div className="forgot-password">
            {
                loading ?
                    <div className="forgot-password__loading">Loading...</div>
                    :
                    <div className="forgot-password__container">
                        <h1 className="forgot-password__title">
                            { !sentmail ? "Reset Your Password" : "Check Your Email" }
                        </h1>
                        <p className="forgot-password__description">
                            {
                                !sentmail
                                    ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
                                    : `We have sent the reset email to ${mail}`
                            }
                        </p>
                        <form className="forgot-password__form" onSubmit={Handleonsubmit}>
                            {
                                !sentmail && (
                                    <label htmlFor="email" className="forgot-password__label">
                                        <p>Email Address <span className="resetpasswordspan">*</span></p>
                                        <input 
                                            required
                                            type="email"
                                            name="email"
                                            value={mail}
                                            onChange={(e) => setmail(e.target.value)}
                                            placeholder="Enter Your Email Address"
                                            className="forgot-password__input"
                                        />
                                    </label>
                                )
                            }
                            <button type="submit" className="forgot-password__button">
                                { !sentmail ? "Reset Password" : "Resend Email" }
                            </button>
                        </form>
                        <div className="forgot-password__back-to-login">
                            <Link to="/login">
                                <p>Back to Login</p>
                            </Link>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Forgotpassword;
