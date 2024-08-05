import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Profiledropdown.css";
import useOnClickOutside from "../../components/hooks/useOnClickOutside";
import { logout } from "../../services/operations/authAPI";

export default function Profiledropdown() {
  const {user} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));
  if (!user) return null;

  return (
    <div className="nkContainre">
    <button className="profileDropdown-button" onClick={() => setOpen(true)}>
      <div className="profileDropdown-container">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="profileDropdown-avatar"
        />
        <AiOutlineCaretDown className="profileDropdown-icon" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          className="profileDropdown-menu"
        >
          <Link
            to="/dashboard/my-profile"
            className="profileDropdown-link"
            onClick={() => setOpen(false)}
          >
            <div className="profileDropdown-item">
              <VscDashboard className="profileDropdown-item-icon" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="profileDropdown-item"
          >
            <VscSignOut className="profileDropdown-item-icon" />
            Logout
          </div>
        </div>
      )}
    </button>
    </div>
  );
}
