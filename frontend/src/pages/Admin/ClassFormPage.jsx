import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addClass, updateClass, fetchClassById, fetchTeachers } from "../../redux/adminSlice";
import Button from "../../components/Button";
import ErrorToast from "../../components/ErrorToast";

const ClassFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [classData, setClassData] = useState({
    className: "",
    department: "",
    teacherId: null,
  });

  useEffect(() => {
    dispatch(fetchTeachers()).then((res) => {
      if (res.payload) setTeachers(res.payload);
    });

    if (isEdit) {
      dispatch(fetchClassById(id)).then((res) => {
        if (res.payload) {
          setClassData({
            className: res.payload.className,
            department: res.payload.department,
            teacherId: res.payload.teacherId || null,
          });
        }
      });
    }
  }, [dispatch, id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClassData({
      ...classData,
      [name]: name === "teacherId" 
        ? (value ? Number(value) : null)
        : value,
    });
  };

  const handleSubmit = async () => {
    if (!classData.className.trim()) {
      setToastMessage("Class name is required");
      return;
    }
    if (!classData.department.trim()) {
      setToastMessage("Department is required");
      return;
    }

    setIsLoading(true);
    try {
      if (isEdit) {
        await dispatch(updateClass({ id, classData }));
      } else {
        await dispatch(addClass(classData));
      }
      navigate("/classes");
    } catch (error) {
      console.error("Error:", error);
      setToastMessage("Error saving class: " + (error?.message || error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            {isEdit ? "Edit Class" : "Create New Class"}
          </h2>
          <p className="text-gray-600 text-center mt-2">
            {isEdit 
              ? "Update class information below" 
              : "Fill in the details to add a new class"}
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Class Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Class Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="className"
              value={classData.className}
              onChange={handleChange}
              placeholder="e.g., Class 10-A"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="department"
              value={classData.department}
              onChange={handleChange}
              placeholder="e.g., Science, Arts, Commerce"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          {/* Assign Teacher */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Assign Teacher
            </label>
            <select
              name="teacherId"
              value={classData.teacherId ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
            >
              <option value="">Select Teacher (Optional)</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.firstName} {t.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {toastMessage && (
          <div className="mt-4">
            <ErrorToast message={toastMessage} onClose={() => setToastMessage("")} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3">
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold"
          >
            {isLoading ? "Saving..." : (isEdit ? "Update Class" : "Create Class")}
          </Button>

          <Button
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold"
            onClick={() => navigate("/classes")}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassFormPage;
