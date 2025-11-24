import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssignedClasses, fetchStudentsInClass, fetchAttendance, addAttendance, updateAttendance } from "../../redux/teacherSlice";
import ErrorToast from "../../components/ErrorToast";

const TeacherAttendance = () => {
const dispatch = useDispatch();
const { assignedClasses, studentsInClass, attendance, loading, error } = useSelector(state => state.teacher);

const [selectedClass, setSelectedClass] = useState("");
const [selectedDate, setSelectedDate] = useState("");
const [localAttendance, setLocalAttendance] = useState([]);


useEffect(() => {
dispatch(fetchAssignedClasses());
}, [dispatch]);

useEffect(() => {
if (selectedClass) {
dispatch(fetchStudentsInClass(selectedClass));
}
}, [selectedClass, dispatch]);


useEffect(() => {
if (selectedClass && selectedDate) {
dispatch(fetchAttendance({ classId: selectedClass, date: selectedDate }));
}
}, [selectedClass, selectedDate, dispatch]);

useEffect(() => {
if (studentsInClass.length > 0) {
const attendanceMap = studentsInClass.map(student => {
const record = attendance.find(a => a.studentId === student.id);
return {
studentId: student.id,
studentName: student.fullName || student.name,
present: record ? record.present : false,
remarks: record ? record.remarks : "",
};
});
setLocalAttendance(attendanceMap);
} else {
setLocalAttendance([]);
}
}, [studentsInClass, attendance]);

const handleStatusChange = (studentId, present) => {
setLocalAttendance(prev => prev.map(a => a.studentId === studentId ? { ...a, present } : a));
};

const handleRemarksChange = (studentId, remarks) => {
setLocalAttendance(prev => prev.map(a => a.studentId === studentId ? { ...a, remarks } : a));
};

const handleSubmit = () => {
localAttendance.forEach(a => {
const existing = attendance.find(record => record.studentId === a.studentId);
const payload = {
classId: selectedClass,
date: selectedDate,
studentId: a.studentId,
present: a.present,
remarks: a.remarks
};
if (existing) {
dispatch(updateAttendance({ id: existing.id, attendanceData: payload }));
} else {
dispatch(addAttendance({ classId: selectedClass, attendanceData: payload }));
}
});
<ErrorToast message={"Attendance submitted!"}/>

};

return ( <div className="p-8 bg-gray-50 min-h-screen"> <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6"> <h2 className="text-2xl font-bold mb-6">Mark Attendance</h2>


    {/* Class & Date Selection */}
    <div className="flex gap-4 mb-6">
      <select
        value={selectedClass}
        onChange={e => setSelectedClass(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 flex-1"
      >
        <option value="">Select Class</option>
        {assignedClasses.map(c => <option key={c.id} value={c.id}>{c.className}</option>)}
      </select>

      <input
        type="date"
        value={selectedDate}
        onChange={e => setSelectedDate(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 flex-1"
      />
    </div>

    {loading && <p className="text-gray-500 mb-4">Loading...</p>}
    {error && <p className="text-red-500 mb-4">{error}</p>}

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Student Name</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Present</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Remarks</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {localAttendance.length > 0 ? localAttendance.map(a => (
            <tr key={a.studentId} className="hover:bg-gray-50">
              <td className="px-4 py-2">{a.studentName}</td>
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={a.present}
                  onChange={() => handleStatusChange(a.studentId, !a.present)}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  value={a.remarks}
                  onChange={e => handleRemarksChange(a.studentId, e.target.value)}
                  className="border border-gray-300 rounded-lg p-1 w-full"
                />
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">No students found for this class/date.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    
    <div className="flex justify-end mt-6">
      <button
        onClick={handleSubmit}
        disabled={!selectedClass || !selectedDate || localAttendance.length === 0}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
      >
        Submit Attendance
      </button>
    </div>
  </div>
</div>


);
};

export default TeacherAttendance;
