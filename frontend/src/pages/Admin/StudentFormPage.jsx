import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStudent, updateStudent, fetchStudents, deleteStudent } from "../../redux/adminSlice";
import Button from "../../components/Button"; 
import ErrorToast from "../../components/ErrorToast";

const StudentFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    department: "",
    semester: "",
    admissionNumber: "",
    classId: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchStudents()).then((res) => {
        const existing = res.payload.find((s) => s.id === Number(id));
        if (existing) {
          setStudent({
            username: existing.username || "",
            firstName: existing.firstName || "",
            lastName: existing.lastName || "",
            email: existing.email || "",
            phone: existing.phone || "",
            gender: existing.gender || "",
            address: existing.address || "",
            department: existing.department || "",
            semester: existing.semester || "",
            admissionNumber: existing.admissionNumber || "",
            classId: existing.classId || "",
          });
        }
      });
    }
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!student.username.trim()) newErrors.username = "Username required";
    if (!student.firstName.trim()) newErrors.firstName = "First name required";
    if (!student.lastName.trim()) newErrors.lastName = "Last name required";
    if (!student.email.trim()) newErrors.email = "Email required";
    if (!student.department.trim()) newErrors.department = "Department required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...student,
      roleId: 3,
      enabled: true,
      password: "Student123",
    };

    setIsSubmitting(true);
    try {
      if (id) {
        await dispatch(updateStudent({ id: Number(id), studentData: payload })).unwrap();
      } else {
        await dispatch(addStudent(payload)).unwrap();
      }
      navigate("/students");
    } catch (err) {
      console.error(err);
      setToastMessage("Error saving student: " + (err?.message || err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { label: "Username", name: "username" },
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Email", name: "email", type: "email" },
    { label: "Phone", name: "phone", type: "tel" },
    { label: "Department", name: "department" },
    { label: "Semester", name: "semester" },
    { label: "Admission Number", name: "admissionNumber" },
    { label: "Address", name: "address" },
    { label: "Class ID", name: "classId" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {id ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-base font-medium mb-2">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={student[field.name] || ""}
                onChange={handleChange}
                className={`border rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div className="md:col-span-2 flex justify-end space-x-4 mt-4">

            {/* Cancel Button */}
            <Button
              type="button"
              className="!bg-gray-300 !text-black hover:!bg-gray-400"
              onClick={() => navigate("/students")}
            >
              Cancel
            </Button>

            {/* ❌ DELETE BUTTON REMOVED COMPLETELY */}

            {/* Save Button */}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>

          </div>
        </form>
        {toastMessage && <ErrorToast message={toastMessage} onClose={() => setToastMessage("")} />}
      </div>
    </div>
  );
};

export default StudentFormPage;
