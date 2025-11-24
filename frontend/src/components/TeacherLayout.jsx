// layouts/TeacherLayout.jsx
import { Outlet } from "react-router-dom";
import SidebarMenu from "../components/Sidebar";
import Header from "../components/Header";

const TeacherLayout = () => {
  const menuItems = [
    { name: "Profile", path: "/teacher/profile" },
    { name: "Mark Attendance", path: "/teacher/attendance/mark" },
  ];

  return (
    <div className="flex h-screen w-full bg-gray-100 flex-col md:flex-row">
      <SidebarMenu menuItems={menuItems} />
      <div className="flex flex-col flex-1">
        <Header title="Teacher Dashboard" />
        <main className="p-1 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
