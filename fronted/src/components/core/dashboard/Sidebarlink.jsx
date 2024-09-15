import React from "react";
import './Sidebarlink.css';
import * as VscIcons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

function Sidebarlink({ link, iconName }) {
    const Icon = VscIcons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <NavLink to={link.path} onClick={() => dispatch(resetCourseState())}
            className={`sidebar-link ${matchRoute(link.path) ? "sidebar-link-active" : "sidebar-link-inactive"} transition-all duration-200`}>

            <span className={`sidebar-highlight ${matchRoute(link.path) ? "highlight-active" : "highlight-inactive"}`}></span>

            <div className="sidebar-link-content">
                <Icon className="sidebar-icon" />
                <span className="sidebar-link-text">{link.name}</span>
            </div>
        </NavLink>
    );
}

export default Sidebarlink;
