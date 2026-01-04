import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AllUsers from "./pages/allUsers";
import AllDrivers from "./pages/allDrivers";
import Landing from "./pages/Landing";
import VerifyDriver from "./pages/VerifyDriver";
import DriverJourney from "./pages/driverJourney";
import AllJourney from "./pages/allJourney";
import AllOrders from "./pages/allOrders";
import JourneyOrders from "./pages/journeyOrders";
import SupportAdminDashboard from "./pages/SupportAdminDashboard";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/selector";

function App() {
  
  const user = useSelector(selectUser);
  return (
    <Routes>
      {/* 👇 Route for "/" based on user */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />

      {/* Dashboard + Nested Routes for logged-in users */}
      {user && (
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="verifydriver" />} />
          <Route path="verifydriver" element={<VerifyDriver />} />
          <Route path="user" element={<AllUsers />} />
          <Route path="driver" element={<AllDrivers />} />
          <Route path="driverjourney" element={<DriverJourney />} />
          <Route path="alljourney" element={<AllJourney />} />
          <Route path="support" element={<SupportAdminDashboard />} />
          <Route path="allorders" element={<AllOrders />} />
          <Route path="journeyorders" element={<JourneyOrders />} />
        </Route>
      )}

      {/* Catch-all route */}
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default App;
