import React from "react";
import './Sidebarlink.css';
import * as VscIcons from "react-icons/vsc"; // Import all icons from Vsc
import { matchPath, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

function Sidebarlink({ link, iconName }) {
    const Icon = VscIcons[iconName]; // Use the correct dynamic reference for VscIcons
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <div className="mainbodyofthesublink">
            <NavLink to={link.path}>
                <div className="contentoflink">
                    {Icon ? <Icon className="icon" /> : <span className="icon-placeholder" />} {/* Handle undefined icons */}
                    <span className="nameofthelink">{link.name}</span>
                </div>
            </NavLink>
        </div>
    );
}

export default Sidebarlink;
