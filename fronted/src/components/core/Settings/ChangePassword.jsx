import { useState } from 'react';
import './ChangePassword.css';
import { useSelector } from 'react-redux';
import { changePassword } from '../../../services/operations/SettingAPi';
import IconBtn from "../../../common/IconBtn"
import { useNavigate } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useForm } from "react-hook-form"

function ChangePassword() {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const { register, handleSubmit, formState: { errors }, watch } = useForm(); // Add watch here
      
    const submitPasswordForm = async (data) => {
        // Check if new password and confirm password match
        if (data.newPassword !== data.confirmPassword) {
          toast.error("New password and confirm password do not match");
          return;
        }
      
        // Use correct field name here
        const formData = {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
          confirmNewPassword: data.confirmPassword // Change here
        };
      
        try {
          await changePassword(token, formData);
          toast.success("Password Changed Successfully");
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message);
        }
      };

    return (
        <form onSubmit={handleSubmit(submitPasswordForm)}>
            <div className="chnagepassword-form-container">
                <h2 className="chnagepassword_form-heading">Password</h2>
                <div className="chnagepassword-input-group">
                    <div className="chnagepassword-field">
                        <label htmlFor="oldPassword" className="chnagepassword_label-style">Current Password</label>
                        <input
                            type={showOldPassword ? "text" : "password"}
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter Current Password"
                            className="chnagepassword_input-style"
                            {...register("oldPassword", { required: true })}
                        />
                        <span onClick={() => setShowOldPassword((prev) => !prev)} className="toggle-chnagepassword-visibility">
                            {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                        {errors.oldPassword && (
                            <span className="error-message">Please enter your Current Password.</span>
                        )}
                    </div>

                    <div className="chnagepassword-field">
                        <label htmlFor="newPassword" className="chnagepassword_label-style">New Password</label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter New Password"
                            className="chnagepassword_input-style"
                            {...register("newPassword", { required: true })}
                        />
                        <span onClick={() => setShowNewPassword((prev) => !prev)} className="toggle-chnagepassword-visibility">
                            {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                        {errors.newPassword && (
                            <span className="error-message">Please enter your New Password.</span>
                        )}
                    </div>

                    <div className="password-field">
                        <label htmlFor="confirmPassword" className="chnagepassword_label-style">Confirm New Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm New Password"
                            className="chnagepassword_input-style"
                            {...register("confirmPassword", {
                                required: true,
                                validate: value => value === watch('newPassword') || "Passwords do not match"
                            })}
                        />
                        <span onClick={() => setShowConfirmPassword((prev) => !prev)} className="toggle-chnagepassword-visibility">
                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                        {errors.confirmPassword && (
                            <span className="chnagepassword_error-message">{errors.confirmPassword.message}</span>
                        )}
                    </div>
                </div>
                <div className="form-actions">
                <button type="button" onClick={() => navigate("/dashboard/my-profile")}>Cancel</button>
                <IconBtn type="submit" text="Update" />
            </div>
            </div>

       
        </form>
    );
}

export default ChangePassword;
