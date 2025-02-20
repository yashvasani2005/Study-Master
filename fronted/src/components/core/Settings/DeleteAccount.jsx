import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../services/operations/SettingAPi";
import "./DeleteAccount.css";

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  return (
    <div className="delete-account-container">
      <div className="delete-account-icon-container">
        <FiTrash2 className="delete-trash-icon" />
      </div>
      <div className="delete-text-container">
        <h2 className="delete-account-title">Delete Account</h2>
        <div className="delete-account-message">
          <p>Would you like to delete your account?</p>
          <p>
            This account may contain Paid Courses. Deleting your account is
            permanent and will remove all content associated with it.
          </p>
        </div>
        <button
          type="button"
          className="delete-account-button"
          onClick={handleDeleteAccount}
        >
          I want to delete my account.
        </button>
      </div>
    </div>
  );
}
