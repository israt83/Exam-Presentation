import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Registration = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const years = Array.from({ length: 2025 - 1971 + 1 }, (_, i) => 1971 + i);

  const inputClass =
    "col-span-2 w-full rounded-md px-3 py-2 border-2 border-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400";

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      for (const key in data) {
        if (key === "image" && data[key]?.[0]) {
          formData.append("image", data[key][0]); // ✅ ফাইল
        } else if (key === "department" && Array.isArray(data[key])) {
          formData.append("department", data[key].join(",")); // ✅ array → string
        } else {
          formData.append(key, data[key]);
        }
      }

      const response = await axios.post("https://backend-two-phi-97.vercel.app/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        reset();
     
        const fileInput = document.querySelector("input[type=file]");
        if (fileInput) fileInput.value = "";
        navigate("/students");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto p-8 rounded-lg"
      >
        <h1 className="text-xl lg:text-4xl font-serif text-yellow-400 font-bold text-center mb-10">
          Student Registration Form
        </h1>

        {/* Basic Info */}
        <div className="space-y-5 text-white text-lg font-medium">
          <div className="grid grid-cols-3 gap-4 items-center">
            <label>Roll No :</label>
            <input {...register("roll")} className={inputClass} />
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <label>Student Name :</label>
            <div className="col-span-2 flex gap-3">
              <input
                {...register("firstName")}
                placeholder="First Name"
                className={inputClass}
              />
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <label>Father's Name :</label>
            <input {...register("fatherName")} className={inputClass} />
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <label>Date of Birth :</label>
            <input type="date" {...register("dob")} className={inputClass} />
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <label>Mobile No :</label>
            <input type="text" {...register("mobile")} className={inputClass} />
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <label>Email :</label>
            <input type="email" {...register("email")} className={inputClass} />
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <label>Password :</label>
            <input
              type="password"
              {...register("password")}
              className={inputClass}
            />
          </div>
        </div>

        {/* Gender */}
        <div className="grid grid-cols-3 gap-4 mt-6 items-center text-white text-lg">
          <label>Gender :</label>
          <div className="col-span-2 flex gap-6">
            <label className="flex items-center gap-2">
              <input type="radio" value="Male" {...register("gender")} />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" value="Female" {...register("gender")} />
              Female
            </label>
          </div>
        </div>

        {/* Department */}
        <div className="grid grid-cols-3 gap-4 mt-5 items-center text-white text-lg">
          <label>Department :</label>
          <div className="col-span-2 flex gap-4">
            {["CST", "DTNT", "TCT"].map((dept) => (
              <label key={dept} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={dept}
                  {...register("department")}
                />
                {dept}
              </label>
            ))}
          </div>
        </div>

        {/* Course */}
        <div className="grid grid-cols-3 gap-4 mt-5 items-center text-white text-lg">
          <label>Course :</label>
          <select {...register("course")} className={`${inputClass} bg-black text-white`}>
            <option value="">Select Current Course</option>
            <option className="text-white">Diploma in Engineering</option>
            <option className="text-white">Diploma in Textile</option>
            <option className="text-white">Diploma in Nursing</option>
            <option className="text-white">Diploma in Marine</option>
          </select>
        </div>

        {/* Passing Year */}
        <div className="grid grid-cols-3 gap-4 mt-5 items-center text-white text-lg">
          <label>Passing Year :</label>
          <select {...register("passingYear")} className={`${inputClass} bg-black text-white`}>
            <option value="">Select Passing Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="grid grid-cols-3 gap-4 mt-6 items-center text-white text-lg">
          <label>Student Image :</label>
          <div className="col-span-2">
            <input
              type="file"
              accept=".ai,.pdf,.png,.jpeg,.jpg,.svg,.eps"
              {...register("image")}
            />
            <p className="text-sm text-gray-300 mt-1">
              Image size must be 300 × 300 px <br />
              Formats: ai, pdf, png, jpeg, svg, eps
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-3 gap-4 mt-6 items-center text-white text-lg">
          <label>Address :</label>
          <textarea
            {...register("address")}
            rows="4"
            className={inputClass}
          />
        </div>

        {/* Submit */}
        <div className="text-center mt-10">
          <button
            type="submit"
            disabled={loading}
            className="py-2 w-full rounded-md bg-yellow-400 text-white text-lg font-semibold hover:bg-yellow-500 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
