import { useEffect, useState } from "react";
import api from "@services/Api";

interface IRanking {
  student_id: number;
  student_name: string;
  obtained: number;
}

export default function Ranking() {
  const [ranking, setRanking] = useState<IRanking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchranking = async () => {
    try {
      const response = await api.get(`/students/bests?size=5`);
      setRanking(response.data);
    } catch {
      setError("Query error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchranking();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <>
        <p className="text-red-700">{error}</p>
      </>
    );
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Student ID</td>
            <td>Student Name</td>
            <td>Obtained</td>
          </tr>
        </thead>
        <tbody>
          {ranking.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.student_name}</td>
              <td>{student.obtained}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
