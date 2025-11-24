// layouts/StudentLayout.jsx
import { Outlet } from "react-router-dom";
import SidebarMenu from "../components/Sidebar";
import Header from "../components/Header";

const StudentLayout = () => {
  const menuItems = [
    { name: "Profile", path: "/student/profile" },
    { name: "Attendance Report", path: "/student/attendance" },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-100 flex-col md:flex-row">
      <SidebarMenu menuItems={menuItems} />
      <div className="flex flex-col flex-1">
        <Header title="Student Dashboard" />
        <main className="p-4 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
