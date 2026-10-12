import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DashboardOverview from "./components/DashboardOverview";
import ComingSoon from "./components/ComingSoon";
// import LeetCodeProfile from "./components/LeetcodeProfile";
// import ResumePage from "./components/ResumePage";

function RoleBasedAccess() {
  return (
    <Routes>
      <Route index element={<DashboardOverview />} />

      {/* <Route path="leetcode" element={<LeetCodeProfile />} /> */}
      {/* <Route path="resumes" element={<ResumePage />} /> */}

      <Route
        path="share"
        element={<ComingSoon title="Share Profile & Contact" />}
      />

      <Route path="*" element={<Navigate to="/role-dashboard" replace />} />
    </Routes>
  );
}

export default RoleBasedAccess;
