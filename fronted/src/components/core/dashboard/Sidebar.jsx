import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import Spinner from "../../../common/Spinner";
import './Sidebar.css';
import { useDispatch, useSelector } from "react-redux";
import Sidebarlink from "./Sidebarlink";
import Confirmationmodal from "../../../common/Confirmationmodal";
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationmodel, setconfirmationmodel] = useState(null);

  if (authLoading || profileLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="custom-sidebar-container">
      <div className="custom-sidebar-links">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accounttype !== link.type) return null;
          return (
            <Sidebarlink key={link.id} link={link} iconName={link.icon} />
          );
        })}
      </div>

      <div className="custom-sidebar-divider" />
      <div className="custom-sidebar-options">
        <Sidebarlink link={{ name: "Settings", path: "/dashboard/settings" }} iconName="VscSettingsGear" />

        <button
          className="custom-sidebar-logout-button"
          onClick={() =>
            setconfirmationmodel({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
        >
          <div className="custom-sidebar-logout-content">
            <VscSignOut className="custom-sidebar-logout-icon" />
            <span>Logout</span>
          </div>
        </button>
      </div>
      {confirmationmodel && <Confirmationmodal modalData={confirmationmodel} />}
    </div>
  );
}

export default Sidebar;
