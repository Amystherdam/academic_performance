import { useCallback, useEffect, useState } from "react";
import api from "@services/Api";
import { AxiosError } from "axios";
import Paginator from "@components/Paginator";

interface IRanking {
  student_id: number;
  student_name: string;
  obtained: number;
}

export default function Ranking() {
  const [ranking, setRanking] = useState<IRanking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(5);

  const fetchRanking = useCallback(async () => {
    try {
      const response = await api.get(`/students/bests?size=${pageSize}`);
      setRanking(response.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.errors[0].title || error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {error ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl text-[#80297d] font-bold">{error}</h1>
        </div>
      ) : ranking.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl text-[#80297d] font-bold">
            Overall average not calculated
          </h1>
        </div>
      ) : (
        <>
          <Paginator setPageSize={setPageSize} />

          <div className="flex flex-col items-center mt-3">
            <div className="w-full flex justify-center overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Student ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Student Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Obtained
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((student) => (
                    <tr
                      key={student.student_id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {student.student_id}
                      </th>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {student.student_name}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {student.obtained}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
