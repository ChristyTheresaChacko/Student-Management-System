import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTeacher, updateTeacher, fetchTeachers } from "../../redux/adminSlice";
import Button from "../../components/Button";
import ErrorToast from "../../components/ErrorToast";

const TeacherFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [teacher, setTeacher] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Load teacher for editing
  useEffect(() => {
    if (id) {
      dispatch(fetchTeachers()).then((res) => {
        const existing = res.payload.find((t) => t.id === Number(id));
        if (existing) {
          setTeacher({
            username: existing.username || "",
            firstName: existing.firstName || "",
            lastName: existing.lastName || "",
            email: existing.email || "",
            gender: existing.gender || "",
            phone: existing.phone || "",
            address: existing.address || "",
          });
        }
      });
    }
  }, [id, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher({ ...teacher, [name]: value });
  };

  const validate = () => {
    const errs = {};
    if (!teacher.username.trim()) errs.username = "Username required";
    if (!teacher.firstName.trim()) errs.firstName = "First name required";
    if (!teacher.email.trim()) errs.email = "Email required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...teacher,
      password: "teacher123",
      roleId: 2,
      enabled: true,
    };

    setIsSubmitting(true);

    try {
      if (id) {
        await dispatch(updateTeacher({ id: Number(id), teacherData: payload })).unwrap();
      } else {
        await dispatch(addTeacher(payload)).unwrap();
      }
      navigate("/teachers");
    } catch (err) {
      console.error(err);
      setToastMessage("Error saving teacher: " + (err?.message || err));
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
    { label: "Gender", name: "gender" },
    { label: "Address", name: "address" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {id ? "Edit Teacher" : "Add Teacher"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-base font-medium mb-2">{field.label}</label>
              <input
                type={field.type || "text"}
                name={field.name}
                value={teacher[field.name] || ""}
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
            <Button
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={() => navigate("/teachers")}
            >
              Cancel
            </Button>

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

export default TeacherFormPage;
