import React from "react";
import SidebarMenu from "../components/Sidebar";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Components/SidebarMenu",
  component: SidebarMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: "300px", height: "100vh" }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};


export const AdminSidebar = {
  args: {
    menuItems: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Students", path: "/students" },
      { name: "Teachers", path: "/teachers" },
      { name: "Classes", path: "/classes" },
    ],
  },
};

// TEACHER SIDEBAR
export const TeacherSidebar = {
  args: {
    menuItems: [
      { name: "Profile", path: "/teacher/profile" },
      { name: "Mark Attendance", path: "/teacher/attendance/mark" },
    ],
  },
};

// STUDENT SIDEBAR
export const StudentSidebar = {
  args: {
    menuItems: [
      { name: "Profile", path: "/student/profile" },
      { name: "Attendance Report", path: "/student/attendance" },
    ],
  },
};
