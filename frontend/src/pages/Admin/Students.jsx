import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, fetchClasses, deleteStudent } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Table from "../../components/Table";
import ErrorToast from "../../components/ErrorToast";

const StudentManagementContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, classes, loading, error } = useSelector((state) => state.admin);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchClasses());
  }, [dispatch]);

  // Ensure students is always an array
  const safeStudents = Array.isArray(students) ? students : [];
  const safeClasses = Array.isArray(classes) ? classes : [];

  // Filter students by name and class
  const filteredStudents = safeStudents.filter((s) => {
    const fullName = `${s.firstName || s.name || ""} ${s.lastName || ""}`.toLowerCase();
    const nameMatch = fullName.includes(search.toLowerCase());

    // Get the class name (handle different property names)
    const studentClassName = s.className || s.class?.name || s.classAssigned?.className || "";
    const classMatch = classFilter === "" || studentClassName.toString() === classFilter.toString();

    return nameMatch && classMatch;
  });

  // Table column definitions
  const columns = [
    {
      header: "NAME",
      key: "firstName",
      render: (val, row) => `${row.firstName || row.name || ""} ${row.lastName || ""}`,
    },
    {
      header: "EMAIL",
      key: "email",
    },
    {
      header: "CLASS",
      key: "classAssigned.className",
      render: (val, row) => row.className || row.class?.name || row.classAssigned?.className || "-",
    },
  ];

  // Action buttons
  const actions = [
    {
      label: "Edit",
      className: "bg-blue-600 hover:bg-blue-700 text-white",
      onClick: (row) => navigate(`/students/edit/${row.id}`),
    },
    {
      label: "Delete",
      className: "bg-red-400 hover:bg-red-600 text-white",
      onClick: (row) => dispatch(deleteStudent(row.id)),
      confirm: "Are you sure you want to delete this student?",
    },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Management</h1>

      {error && <ErrorToast message={error} />}

      {/* Search + Filters + Add Student */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="flex-grow p-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="p-2 border rounded bg-white min-w-[180px]"
          >
            <option value="">All Classes</option>
            {safeClasses.map((cls) => (
              <option key={cls.id} value={cls.className}>
                {cls.className}
              </option>
            ))}
          </select>
          <Button
            onClick={() => navigate("/students/add")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add Student
          </Button>
        </div>
      </div>

      {/* Reusable Table Component */}
      <Table
        columns={columns}
        data={filteredStudents}
        actions={actions}
        loading={loading}
        emptyMessage="No students found."
      />
    </div>
  );
};

export default StudentManagementContent;
