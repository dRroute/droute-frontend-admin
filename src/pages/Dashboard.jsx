import React from "react";
import Navigation from "../component/navigation";
import { Outlet } from "react-router-dom";
function Dashboard() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1 overflow-y-auto bg-orange-50">
       <Outlet />
      </div>
    </div>
  );
}
// src/pages/Dashboard.jsx
export default Dashboard;
