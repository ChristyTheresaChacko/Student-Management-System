import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts (lazy-loaded)
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const TeacherLayout = lazy(() => import("./components/TeacherLayout"));
const StudentLayout = lazy(() => import("./components/StudentLayout"));

// Pages (lazy-loaded)
const Login = lazy(() => import("./pages/Auth/Login"));

// Admin Pages
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const Students = lazy(() => import("./pages/Admin/Students"));
const Teachers = lazy(() => import("./pages/Admin/Teachers"));
const Classes = lazy(() => import("./pages/Admin/Classes"));
const StudentFormPage = lazy(() => import("./pages/Admin/StudentFormPage"));
const TeacherFormPage = lazy(() => import("./pages/Admin/TeacherFormPage"));
const ClassFormPage = lazy(() => import("./pages/Admin/ClassFormPage"));

// Teacher Pages
const TeacherProfile = lazy(() => import("./pages/Teacher/TeacherProfile"));
const TeacherClasses = lazy(() => import("./pages/Teacher/TeacherAttendance"));
const TeacherMarkAttendance = lazy(() => import("./pages/Teacher/TeacherMarkAttendance"));

// Student Pages
const StudentProfile = lazy(() => import("./pages/Student/StudentProfile"));
const StudentAttendance = lazy(() => import("./pages/Student/StudentAttendance"));

function App() {
return ( <Router>
<Suspense fallback={<div>Loading...</div>}> <Routes>
{/* Public Route */}
<Route path="/login" element={<Login />} />


      {/* Admin Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="classes" element={<Classes />} />

        {/* Admin Forms */}
        <Route path="students/add" element={<StudentFormPage />} />
        <Route path="students/edit/:id" element={<StudentFormPage />} />
        <Route path="teachers/add" element={<TeacherFormPage />} />
        <Route path="teachers/edit/:id" element={<TeacherFormPage />} />
        <Route path="classes/add" element={<ClassFormPage />} />
        <Route path="classes/edit/:id" element={<ClassFormPage />} />
      </Route>

      {/* Teacher Routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={["TEACHER"]}>
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherProfile />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="classes" element={<TeacherClasses />} />
        <Route path="attendance/mark" element={<TeacherMarkAttendance />} />
      </Route>

      {/* Student Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["STUDENT"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentProfile />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="attendance" element={<StudentAttendance />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Login />} />
    </Routes>
  </Suspense>
</Router>

);
}

export default App;
