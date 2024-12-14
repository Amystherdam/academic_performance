import { Route, Navigate, Routes } from "react-router";

import Students from "@components/Students";
import GradesHistory from "@components/GradesHistory";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/students" />} />
      <Route path="/students" element={<Students />} />
      <Route
        path="/students/:studentId/parcial_grades"
        element={<GradesHistory />}
      />
    </Routes>
  );
}