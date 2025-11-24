
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentAttendanceBetweenDates } from '../../redux/studentSlice';
import { Download } from 'lucide-react';
import Button from '../../components/Button';
import ErrorToast from '../../components/ErrorToast';

const getStatusClasses = (status) => {
  if (typeof status === 'boolean') {
    return status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  }
  switch (status) {
    case 'Present':
      return 'bg-green-100 text-green-700';
    case 'Absent':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusLabel = (status) => {
  if (typeof status === 'boolean') {
    return status ? 'Present' : 'Absent';
  }
  return status || 'Unknown';
};

const StudentAttendance = () => {
  const dispatch = useDispatch();
  const { attendance, loading, error } = useSelector((state) => state.student);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (startDate && endDate) {
      dispatch(fetchStudentAttendanceBetweenDates({ from: startDate, to: endDate }));
    }
  }, [dispatch, startDate, endDate]);

  const safeAttendance = Array.isArray(attendance) ? attendance : [];
  const total = safeAttendance.length;
  const presentCount = safeAttendance.filter((item) => item.present === true).length;
  const overallPercentage = total ? Math.round((presentCount / total) * 100) : 0;

  const downloadCSV = () => {
    if (safeAttendance.length === 0) {
      <ErrorToast message={"No attendance data to download"}/>

      return;
    }
    const headers = ['Date', 'Status', 'Remarks'];
    const rows = safeAttendance.map((item) => [
      item.date || '',
      getStatusLabel(item.present),
      item.remarks || '',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `attendance_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <div className="p-8 bg-red-100 rounded-2xl shadow-xl max-w-5xl mx-auto text-center font-semibold text-lg text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800">My Attendance</h1>
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-3 items-center">
            <label className="flex flex-col">
              <span className="text-sm text-gray-600">Start Date</span>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 px-3 py-2 border rounded-lg" />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-gray-600">End Date</span>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 px-3 py-2 border rounded-lg" />
            </label>
          </div>
          <Button onClick={downloadCSV} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
            <Download size={18} /> Download CSV
          </Button>
        </div>

        {startDate && endDate && (
          <div className="mt-6 bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 60}
                    strokeDashoffset={2 * Math.PI * 60 * (1 - overallPercentage / 100)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-800">{overallPercentage}%</span>
                  <span className="text-sm text-gray-500 mt-1">Present</span>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                <p className="text-sm text-gray-600">Days Present</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{total - presentCount}</p>
                <p className="text-sm text-gray-600">Days Absent</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">REMARKS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">Loading...</td></tr>
                ) : safeAttendance.length === 0 ? (
                  <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">{startDate && endDate ? 'No attendance records found.' : 'Select a date range to view attendance.'}</td></tr>
                ) : (
                  safeAttendance.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(item.present)}`}>{getStatusLabel(item.present)}</span></td>
                      <td className="px-6 py-4 text-sm text-gray-600">{item.remarks || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
