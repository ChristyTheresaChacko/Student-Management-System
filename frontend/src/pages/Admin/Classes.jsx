import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses, deleteClass } from "../../redux/adminSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Table from "../../components/Table";
import ErrorToast from "../../components/ErrorToast";

const Classes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes = [], loading, error } = useSelector((state) => state.admin);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const safeClasses = Array.isArray(classes) ? classes : [];

  const filteredClasses = safeClasses.filter(
    (c) =>
      c &&
      `${c.className || ""} ${c.department || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // Table column definitions
  const columns = [
    {
      header: "CLASS NAME",
      key: "className",
    },
    {
      header: "DEPARTMENT",
      key: "department",
    },
    {
      header: "TEACHER",
      key: "teacherName",
      render: (val, row) => row.teacherName || (row.teacher ? `${row.teacher.firstName || ''} ${row.teacher.lastName || ''}` : "-"),
    },
  ];

  // Action buttons
  const actions = [
    {
      label: "Edit",
      className: "bg-blue-600 hover:bg-blue-700 text-white",
      onClick: (row) => navigate(`/classes/edit/${row.id}`),
    },
    {
      label: "Delete",
      className: "bg-red-400 hover:bg-red-500 text-white",
      onClick: (row) => dispatch(deleteClass(row.id)),
      confirm: "Are you sure you want to delete this class?",
    },
  ];

  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Class Management</h1>

      {error && <ErrorToast message={error} />}

      {/* Search + Add Class */}
      <div className="flex items-center justify-between mb-6 space-x-4">
        <input
          type="text"
          placeholder="Search classes..."
          className="flex-grow p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          onClick={() => navigate("/classes/add")}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Add Class
        </Button>
      </div>

      {/* Reusable Table Component */}
      <Table
        columns={columns}
        data={filteredClasses}
        actions={actions}
        loading={loading}
        emptyMessage="No classes found."
      />
    </div>
  );
};

export default Classes;
