import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("https://backend-two-phi-97.vercel.app/students");
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
    <div className="p-4 md:p-8">
      <div className="">
          <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
        >
          Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 text-center my-5">
          Student List
        </h1>

      
      </div>

      
      <div className="overflow-x-auto rounded-t-lg border  border-gray-300">
        <table className="min-w-full border-collapse  text-white">
          <thead>
            <tr className="bg-gray-800 text-sm md:text-base">
              <th className="border p-2">Roll</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Passing Year</th>
              <th className="border p-2">Image</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="text-sm md:text-base">
                <td className="border p-2">{s.roll}</td>
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.email}</td>
                <td className="border p-2">{s.course}</td>
                <td className="border p-2">{s.department}</td>
                <td className="border p-2">{s.passing_year}</td>
                <td className="border p-2">
                  {s.image && (
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded items-center mx-auto"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
