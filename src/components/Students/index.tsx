import { useEffect, useState } from "react";
import api from "@services/Api";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

interface IStudent {
  id: number;
  name: string;
  obtained: number;
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.errors[0].title || error.message);
      }
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

  return (
    <>
      {error ? (
        <div className=" flex items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl text-[#80297d] font-bold">{error}</h1>
        </div>
      ) : students.length === 0 ? (
        <div className=" flex items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl text-[#80297d] font-bold">
            No students registered
          </h1>
        </div>
      ) : (
        <div className="flex justify-center mt-3 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-3 ">
                  <div className="flex justify-center">
                    Overall Student Grade
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex justify-center">Options</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {student.name}
                  </th>
                  <td
                    scope="row"
                    className="px-6 py-4 flex justify-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {student.obtained
                      ? student.obtained
                      : "Overall average not calculated"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-around">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/students/${student.id}/parcial_grades`)
                        }
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <span className="mt-2">Historical</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/students/${student.id}/final_grades`)
                        }
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <span className="mt-2">Average by Subjects</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
