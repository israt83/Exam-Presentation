import { useEffect, useState } from "react";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/students");
        if (res.data.success) {
          setStudents(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Student List</h1>
      <table className="w-full border-collapse border border-gray-300 text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="border p-2">Roll</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Passing Year</th>
            <th className="border p-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.roll}</td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">{s.course}</td>
              <td className="border p-2">{s.passing_year}</td>
              <td className="border p-2">
                {s.image && (
                  <img
                    src={s.image} 
                    alt={s.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
