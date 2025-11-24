import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, fetchTeachers, fetchClasses, fetchAttendanceBetweenDates } from "../../redux/adminSlice";
import StatCard from "../../components/StatCard";

import { Bar, Line } from "react-chartjs-2";
import {
Chart as ChartJS,
BarElement,
LineElement,
PointElement,
CategoryScale,
LinearScale,
Tooltip,
Legend,
Filler
} from "chart.js";

// Register chart elements including Filler for line chart fill
ChartJS.register(
BarElement,
LineElement,
PointElement,
CategoryScale,
LinearScale,
Tooltip,
Legend,
Filler
);

// Safe wrapper to avoid map/forEach errors
const safeData = (data) => (data?.datasets ? data : { labels: [], datasets: [] });

// ----------------------------
// MAIN DASHBOARD
// ----------------------------
const Dashboard = () => {
const dispatch = useDispatch();
const { students, teachers, classes, attendanceBetweenDates } = useSelector((state) => state.admin);

// Ensure arrays to prevent runtime errors
const studentList = Array.isArray(students) ? students : [];
const teacherList = Array.isArray(teachers) ? teachers : [];
const classList = Array.isArray(classes) ? classes : [];
const attendanceList = Array.isArray(attendanceBetweenDates) ? attendanceBetweenDates : [];

// Calculate last 7 days date range
const calculateLast7Days = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const formatDate = (date) => date.toISOString().split('T')[0];
  return {
    from: formatDate(sevenDaysAgo),
    to: formatDate(today)
  };
};

// Fetch data once on mount
useEffect(() => {
dispatch(fetchStudents());
dispatch(fetchTeachers());
dispatch(fetchClasses());

// Fetch last 7 days attendance
const { from, to } = calculateLast7Days();
dispatch(fetchAttendanceBetweenDates({ from, to }));
}, [dispatch]);

// ----------------------------
// CARD TOTALS & ATTENDANCE STATS
// ----------------------------
const totalStudents = studentList.length;
const totalTeachers = teacherList.length;
const totalClasses = classList.length;

// Calculate overall attendance percentage
const totalAttendanceRecords = attendanceList.length;
const presentCount = attendanceList.filter((a) => a.present === true).length;
const avgAttendancePercentage = totalAttendanceRecords > 0 ? Math.round((presentCount / totalAttendanceRecords) * 100) : 0;

// ----------------------------
// CLASS DISTRIBUTION CHART
// ----------------------------
const classDistribution = useMemo(() => {
if (!studentList.length || !classList.length) {
return {
labels: classList.map((cls) => cls.className || "Unknown"),
datasets: [
{ label: "Students", data: classList.map(() => 0), backgroundColor: "rgba(16, 185, 129, 0.5)" }
],
};
}

const labels = classList.map((cls) => cls.className || "Unknown");
const data = classList.map((cls) => {
  // Try multiple possible property paths to get class ID
  const classId = cls.id;
  return studentList.filter((s) => {
    const studentClassId = s.classAssigned?.id || s.classId || s.class?.id;
    return studentClassId === classId;
  }).length;
});

return {
  labels,
  datasets: [
    {
      label: "Students",
      data,
      backgroundColor: "rgba(16, 185, 129, 0.6)",
      borderColor: "rgba(6, 95, 70, 1)",
      borderWidth: 2,
      borderRadius: 12,
    },
  ],
};


}, [studentList, classList]);

// ----------------------------
// ATTENDANCE TREND (LAST 7 DAYS)
// ----------------------------
const attendanceTrend = useMemo(() => {
  if (attendanceList.length === 0) {
    return {
      labels: ["No Data"],
      datasets: [{
        label: "Attendance %",
        data: [0],
        borderColor: "rgba(16, 185, 129, 1)",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
      }],
    };
  }

  // Group attendance by date
  const attendanceByDate = {};
  attendanceList.forEach((record) => {
    const date = record.date;
    if (!attendanceByDate[date]) {
      attendanceByDate[date] = { present: 0, total: 0 };
    }
    attendanceByDate[date].total += 1;
    if (record.present) {
      attendanceByDate[date].present += 1;
    }
  });

  // Sort by date
  const sortedDates = Object.keys(attendanceByDate).sort();
  const labels = sortedDates.map((date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  const data = sortedDates.map((date) => {
    const { present, total } = attendanceByDate[date];
    return total > 0 ? Math.round((present / total) * 100) : 0;
  });

  return {
    labels,
    datasets: [{
      label: "Attendance %",
      data,
      borderColor: "rgba(16, 185, 129, 1)",
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 5,
    }],
  };
}, [attendanceList]);

const chartOptions = {
responsive: true,
maintainAspectRatio: false,
plugins: { legend: { position: "bottom" } },
animation: { duration: 900 },
};

return ( <div className="p-6 space-y-6">
{/* Stats */} <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6"> <StatCard title="Total Students" value={totalStudents} /> <StatCard title="Total Teachers" value={totalTeachers} /> <StatCard title="Total Classes" value={totalClasses} /> <StatCard title="Avg Attendance (7 Days)" value={`${avgAttendancePercentage}%`} /> </div>


  {/* Charts */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
    {/* Class Distribution */}
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Class Distribution</h2>
      <div className="h-64">
        <Bar data={safeData(classDistribution)} options={chartOptions} />
      </div>
    </div>

    {/* Attendance Trend */}
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Weekly Attendance Trend (Last 7 Days)</h2>
      <div className="h-64">
        <Line data={safeData(attendanceTrend)} options={chartOptions} />
      </div>
    </div>
  </div>
</div>


);
};

export default Dashboard;
