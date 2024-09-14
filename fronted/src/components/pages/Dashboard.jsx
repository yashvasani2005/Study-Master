import React from "react";
import './Dashboard.css'
import Spinner from "../../common/Spinner";
import { useSelector } from "react-redux";
import Sidebar from "../core/Dashboard/Sidebar";

function Dashboard() {
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const {loading:profileLoading}=useSelector((state)=>state.profile);

    if(authLoading || profileLoading){
        return  (
               <div>
                    <Spinner/>
               </div>
        )
    }


    return (
        <div>

            <Sidebar/>
            
        </div>
    );
}

export default Dashboard;
