import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
addStudent,
updateStudent,
addTeacher,
updateTeacher,
addClass,
updateClass,
} from "../../redux/slices/adminSlice";

const formFieldsConfig = {
student: [
{ name: "name", type: "text", placeholder: "Student Name", required: true },
{ name: "email", type: "email", placeholder: "Student Email", required: true },
{ name: "classId", type: "text", placeholder: "Class ID", required: true },
],
teacher: [
{ name: "name", type: "text", placeholder: "Teacher Name", required: true },
{ name: "email", type: "email", placeholder: "Teacher Email", required: true },
{ name: "subject", type: "text", placeholder: "Subject", required: true },
],
class: [
{ name: "name", type: "text", placeholder: "Class Name", required: true },
{ name: "teacherId", type: "text", placeholder: "Teacher ID", required: true },
],
};

const EntityForm = ({ entityType, initialValues = {}, onClose }) => {
const dispatch = useDispatch();
const [formData, setFormData] = useState(initialValues);
const [errors, setErrors] = useState({});

useEffect(() => {
setFormData(initialValues);
setErrors({});
}, [initialValues]);

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const validate = () => {
const newErrors = {};
formFieldsConfig[entityType].forEach((field) => {
if (field.required && !formData[field.name]?.trim()) {
newErrors[field.name] = `${field.placeholder} is required`;
}
if (field.type === "email" && formData[field.name]) {
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
if (!emailRegex.test(formData[field.name])) {
newErrors[field.name] = "Invalid email format";
}
}
});
setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

const handleSubmit = (e) => {
e.preventDefault();
if (!validate()) return;


switch (entityType) {  
  case "student":  
    formData.id  
      ? dispatch(updateStudent({ id: formData.id, studentData: formData }))  
      : dispatch(addStudent(formData));  
    break;  
  case "teacher":  
    formData.id  
      ? dispatch(updateTeacher({ id: formData.id, teacherData: formData }))  
      : dispatch(addTeacher(formData));  
    break;  
  case "class":  
    formData.id  
      ? dispatch(updateClass({ id: formData.id, classData: formData }))  
      : dispatch(addClass(formData));  
    break;  
  default:  
    console.error("Unknown entity type");  
}  

if (onClose) onClose();  

};

return ( <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-3">
{formFieldsConfig[entityType]?.map((field) => ( <div key={field.name} className="flex flex-col">
<input
type={field.type}
name={field.name}
placeholder={field.placeholder}
value={formData[field.name] || ""}
onChange={handleChange}
className={`border p-2 rounded w-full ${errors[field.name] ? "border-red-500" : ""}`}
/>
{errors[field.name] && ( <span className="text-red-500 text-sm mt-1">{errors[field.name]}</span>
)} </div>
))}


  <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">  
    {formData.id ? "Update" : "Add"} {entityType.charAt(0).toUpperCase() + entityType.slice(1)}  
  </button>  
</form>  


);
};

export default EntityForm;
