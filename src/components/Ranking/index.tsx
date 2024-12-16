import { useEffect, useState } from "react";
import api from "@services/Api";
import { AxiosError } from "axios";

interface IRanking {
  student_id: number;
  student_name: string;
  obtained: number;
}

export default function Ranking() {
  const [ranking, setRanking] = useState<IRanking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchRanking = async (size: number = 5) => {
    try {
      const response = await api.get(`/students/bests?size=${size}`);
      setRanking(response.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.errors[0].title || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl text-[#80297d] font-bold">{error}</h1>
      </div>
    );
  }

  if (ranking.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl text-[#80297d] font-bold">
          Overall average not calculated
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-3">
      <div className="w-1/2 block p-6 bg-white border border-gray-200 rounded-t-lg shadow  dark:bg-gray-800 dark:border-gray-700 ">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Top Bests
        </h5>
        <p className="mb-5 font-normal text-gray-700 dark:text-gray-400">
          Students closer to 100!
        </p>
        <span
          onClick={() => {
            fetchRanking(1);
          }}
          className="font-normal text-white mr-2 bg-[#80297d] rounded-full p-3 cursor-pointer"
        >
          1
        </span>
        <span
          onClick={() => {
            fetchRanking(5);
          }}
          className="font-normal text-white mr-2 bg-[#80297d] rounded-full p-3 cursor-pointer"
        >
          5
        </span>
        <span
          onClick={() => {
            fetchRanking(10);
          }}
          className="font-normal text-white mr-2 bg-[#80297d] rounded-full p-3 cursor-pointer"
        >
          10
        </span>
        <span
          onClick={() => {
            fetchRanking(20);
          }}
          className="font-normal text-white mr-2 bg-[#80297d] rounded-full p-3 cursor-pointer"
        >
          20
        </span>
        <span
          onClick={() => {
            fetchRanking(50);
          }}
          className="font-normal text-white mr-2 bg-[#80297d] rounded-full p-3 cursor-pointer"
        >
          50
        </span>
      </div>

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
  );
}
