import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Updatepassword.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from "../../services/operations/authAPI";

function Updatepassword() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { loading } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const { password, confirmPassword } = formData;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    };

    return (
        <div className="forgot-password-container">
            {
                loading ?
                    <div className="spinner"></div>
                    :
                    <div className="form-container">
                        <h1>Choose New Password</h1>
                        <p>Almost done. Enter your new password and you're all set.</p>
                        <form onSubmit={handleOnSubmit}>
                            <label>
                                <p>New Password <span>*</span></p>
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={password}
                                    onChange={handleOnChange}
                                    placeholder="New Password"
                                />
                                <span onClick={() => setShowPassword((prev) => !prev)} className="showpassword">
                                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </label>
                            <label>
                                <p>Confirm New Password <span>*</span></p>
                                <input
                                    required
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleOnChange}
                                    placeholder="Confirm New Password"
                                />
                                <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="showpassword">
                                    {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            </label>
                            <button type="submit" className="buuton-resetpassword">Reset Password</button>
                        </form>
                        <div className="back-to-login">
                            <Link to="/login">
                                <p>Back to Login</p>
                            </Link>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Updatepassword;
