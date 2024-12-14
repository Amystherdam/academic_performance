import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "@services/Api";

interface IGrade {
  student_id: number;
  student_name: string;
  subject_name: string;
  obtained: number;
}

export default function GradesHistory() {
  const [gradesHistory, setGradeHistory] = useState<IGrade[]>([]);
  const { studentId } = useParams();

  const fetchGrades = async () => {
    const response = await api.get(`/students/${studentId}/parcial_grades`);

    setGradeHistory(response.data);
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <table>
      <tr>
        <td>Student ID</td>
        <td>Student Name</td>
        <td>Subject Name</td>
        <td>Obtained</td>
      </tr>
      {gradesHistory.map((grade) => (
        <tr key={grade.student_id}>
          <td>{grade.student_id}</td>
          <td>{grade.student_name}</td>
          <td>{grade.subject_name}</td>
          <td>{grade.obtained}</td>
        </tr>
      ))}
    </table>
  );
}
