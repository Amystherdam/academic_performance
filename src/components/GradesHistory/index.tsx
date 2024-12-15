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
    <div className="flex justify-center mt-3 overflow-x-auto shadow-md sm:rounded-lg">
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
              Subject Name
            </th>
            <th scope="col" className="px-6 py-3">
              Obtained
            </th>
          </tr>
        </thead>
        <tbody>
          {gradesHistory.map((grade, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {grade.student_id}
              </th>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {grade.student_name}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {grade.subject_name}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {grade.obtained}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
