import { useEffect, useState } from "react";
import api from "@services/Api";
import { useNavigate } from "react-router";

interface IStudent {
  id: number;
  name: string;
}

export default function Students() {
  const navigate = useNavigate();
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
    return (
      <>
        <p className="text-red-700">{error}</p>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center mt-3 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3 flex justify-center">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {student.name}
                </th>
                <td className="px-6 py-4">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/students/${student.id}/parcial_grades`)
                      }
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <span className="mt-2">Histórico de Notas</span>
                    </button>

                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Notas por Disciplina
                    </a>

                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Nota Final
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
