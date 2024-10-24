import { useState } from 'react';
import './ChangePassword.css';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../services/operations/SettingAPi';
import { toast } from 'react-hot-toast'; // To display toast messages

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleCancel = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword(''); // Reset confirm password as well
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if new password and confirm password match
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
            return; // Stop form submission if passwords do not match
        }

        const data = {
            oldPassword: currentPassword,
            newPassword,
        };

        if (token) {
            try {
                await dispatch(changePassword(token, data)); // Dispatch the action
            } catch (error) {
                console.error("Error in handleSubmit in ChangePassword:", error);
            }
        } else {
            console.error("No token available for the user.");
        }
    };

    return (
        <div className="Change-password-container">
            <h2 className="Change_Password_h2">Change Password</h2>

            <form className="Change-Password-alldiv_form" onSubmit={handleSubmit}>
                <label htmlFor="oldPassword" className="current_password">Current Password</label>
                <input
                    name="oldPassword"
                    id="oldPassword"
                    type="password"
                    placeholder="Enter Old Password"
                    className="current_password_input"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <label htmlFor="newPassword" className="new_password">New Password</label>
                <input
                    name="newPassword"
                    id="newPassword"
                    type="password"
                    placeholder="Enter New Password"
                    className="new_password_input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <label htmlFor="confirmPassword" className="confirm_password">Confirm Password</label>
                <input
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    className="confirm_password_input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="change_password_allbuttons">
                    <button type="submit">
                        Update
                    </button>
                    <button type="button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;
