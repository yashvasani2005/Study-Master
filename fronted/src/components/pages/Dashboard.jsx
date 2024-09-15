import React from "react";
import './Dashboard.css';
import Spinner from "../../common/Spinner";
import { useSelector } from "react-redux";
import Sidebar from "../core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (authLoading || profileLoading) {
        return (
            <div className="dashboard-container">
                <Sidebar />
                <div className="dashboard-content">
                    <div className="dashboard-inner">
                        <Spinner />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <div className="dashboard-inner">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
