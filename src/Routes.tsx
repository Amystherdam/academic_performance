import { Route, Navigate, Routes } from "react-router";

import MainContainer from "@components/MainContainer";

import Ranking from "@components/Ranking";
import Students from "@components/Students";
import GradesHistory from "@components/GradesHistory";
import AverageByStudentSubjects from "@components/AverageByStudentSubjects";

export default function Router() {
  return (
    <Routes>
      <Route element={<MainContainer />}>
        <Route path="/" element={<Navigate to="/students" />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/ranking" element={<Ranking />} />
        <Route
          path="/students/:studentId/parcial_grades"
          element={<GradesHistory />}
        />
        <Route
          path="/students/:studentId/final_grades"
          element={<AverageByStudentSubjects />}
        />
      </Route>
    </Routes>
  );
}
