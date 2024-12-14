import { useEffect, useState } from "react";
import api from "@services/Api";

interface IStudent {
  name: string;
}

export default function Students() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchStudents = async () => {
    try {
      const response = await api.get(`/students`);
      setStudents(response.data);
    } catch {
      setError("Query error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <td>Student Name</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
