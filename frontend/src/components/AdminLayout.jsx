// layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import SidebarMenu from "./Sidebar";
import Header from "./Header";

const AdminLayout = () => {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Students", path: "/students" },
    { name: "Teachers", path: "/teachers" },
    { name: "Classes", path: "/classes" },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-100 flex-col md:flex-row">
      <SidebarMenu menuItems={menuItems} />
      <div className="flex flex-col flex-1">
        <Header title="Admin Dashboard" />
        <main className="p-4 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
