import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers, fetchClasses, deleteTeacher } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Table from "../../components/Table";
import ErrorToast from "../../components/ErrorToast";

const Teachers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teachers = [], classes = [], loading, error } = useSelector((state) => state.admin);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("");

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchClasses());
  }, [dispatch]);

  const safeClasses = Array.isArray(classes) ? classes : [];
  const safeTeachers = Array.isArray(teachers) ? teachers : [];

  // Filter teachers by name and assigned class
  const filteredTeachers = safeTeachers.filter((t) => {
    if (!t) return false;
    
    const fullName = `${t.firstName || ""} ${t.lastName || ""}`.toLowerCase();
    const nameMatch = fullName.includes(search.toLowerCase());

    // Get classes taught by this teacher
    const taughtClasses = safeClasses.filter((cls) => cls.teacherId === t.id || cls.teacher?.id === t.id);
    const classNames = taughtClasses.map((cls) => cls.className).join(", ");
    const classMatch = classFilter === "" || classNames.includes(classFilter);

    return nameMatch && classMatch;
  });

  // Helper function to get classes taught by a teacher
  const getTeacherClasses = (teacherId) => {
    const taughtClasses = safeClasses.filter((cls) => cls.teacherId === teacherId || cls.teacher?.id === teacherId);
    return taughtClasses.map((cls) => cls.className).join(", ") || "-";
  };

  // Table column definitions
  const columns = [
    {
      header: "NAME",
      key: "firstName",
      render: (val, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      header: "EMAIL",
      key: "email",
    },
    {
      header: "GENDER",
      key: "gender",
    },
    {
      header: "CLASSES TAUGHT",
      key: "id",
      render: (val, row) => getTeacherClasses(row.id),
    },
  ];

  // Action buttons
  const actions = [
    {
      label: "Edit",
      className: "bg-blue-600 hover:bg-blue-700 text-white",
      onClick: (row) => navigate(`/teachers/edit/${row.id}`),
    },
    {
      label: "Delete",
      className: "bg-red-400 hover:bg-red-500 text-white",
      onClick: (row) => dispatch(deleteTeacher(row.id)),
      confirm: "Are you sure you want to delete this teacher?",
    },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Management</h1>

      {error && <ErrorToast message={error} />}

      {/* Search + Filters + Add Teacher */}
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
            onClick={() => navigate("/teachers/add")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add Teacher
          </Button>
        </div>
      </div>

      {/* Reusable Table Component */}
      <Table
        columns={columns}
        data={filteredTeachers}
        actions={actions}
        loading={loading}
        emptyMessage="No teachers found."
      />
    </div>
  );
};

export default Teachers;
