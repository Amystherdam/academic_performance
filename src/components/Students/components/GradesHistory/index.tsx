import { useEffect, useState } from "react";
import api from "@services/Api";

interface IProps {
  studentId: number;
}

interface IGrade {
  student_id: number;
  student_name: string;
  subject_name: string;
  obtained: number;
}

export default function GradesHistory(props: IProps) {
  const { studentId } = props;
  const [gradesHistory, setGradeHistory] = useState<IGrade[]>([]);

  const fetchGrades = async () => {
    const response = await api.get(`/students/${studentId}/parcial_grades`);

    setGradeHistory(response.data);
  };

  useEffect(() => {
    fetchGrades();
  });

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
