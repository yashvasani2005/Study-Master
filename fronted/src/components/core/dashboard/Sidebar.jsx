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
    const [Confirmmationmodel, setconfirmationmodel] = useState(null);

    if (authLoading || profileLoading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    return (
        <div className="mainbodyofsidebar">
            {
                sidebarLinks.map((link, index) => {
                    if (link.type && user?.accountType !== link.type) return null;
                    return (
                        <Sidebarlink 
                            key={index}  // Ensure a unique key for each item
                            link={link} 
                            iconName={link.icon} 
                        />
                    );
                })
            }
            <hr />
            <div className="secondbody">
                <Sidebarlink
                    link={{ name: "Settings", path: "dashboard/settings" }}
                    iconName={<VscSettingsGear />}
                />
                <button
                    onClick={() =>
                        setconfirmationmodel({
                            text1: "Are you Sure",
                            text2: "You will be logged out of your account",
                            btn1text: "Logout",
                            btn2text: "Cancel",
                            btn1handler: () => dispatch(logout(navigate)),
                            btn2handler: () => setconfirmationmodel(null),
                        })
                    }
                    className="logoutbutton"
                >
                    <div>
                        <VscSignOut />
                        <span>LogOut</span>
                    </div>
                </button>
            </div>
            {Confirmmationmodel && <Confirmationmodal modelData={Confirmmationmodel} />}
        </div>
    );
}

export default Sidebar;
