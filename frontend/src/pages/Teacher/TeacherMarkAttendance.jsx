import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignedClasses, fetchStudentsInClass, addAttendance } from '../../redux/teacherSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import ErrorToast from '../../components/ErrorToast';

const TeacherMarkAttendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { assignedClasses, studentsInClass, loading, error } = useSelector((state) => state.teacher);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [remarks, setRemarks] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch assigned classes on mount
  useEffect(() => {
    dispatch(fetchAssignedClasses());
  }, [dispatch]);

  // Fetch students when class is selected
  useEffect(() => {
    if (selectedClass) {
      dispatch(fetchStudentsInClass(selectedClass));
      // reset remarks; attendance will be initialized once students load
      setRemarks({});
      setAttendance({});
    }
  }, [dispatch, selectedClass]);

  // When students are loaded, initialize attendance defaults to Present
  useEffect(() => {
    if (Array.isArray(studentsInClass) && studentsInClass.length > 0) {
      const initial = {};
      studentsInClass.forEach((s) => {
        initial[s.id] = true; // default to Present
      });
      // preserve any existing toggles, but ensure defaults exist
      setAttendance((prev) => ({ ...initial, ...prev }));
    }
  }, [studentsInClass]);

  const handleTogglePresence = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleRemarksChange = (studentId, value) => {
    setRemarks((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedClass || !selectedDate) {
      setToastMessage('Please select both class and date');
      return;
    }

    if (!studentsInClass || studentsInClass.length === 0) {
      setToastMessage('No students to mark attendance for');
      return;
    }

    setSubmitting(true);
    let hasError = false;
    let errorMessage = '';

    try {
      const safeStudents = Array.isArray(studentsInClass) ? studentsInClass : [];

      for (const student of safeStudents) {
        const attendanceDTO = {
          studentId: student.id,
          classId: selectedClass,
          date: selectedDate,
          present: attendance[student.id] === undefined ? true : !!attendance[student.id],
          remarks: remarks[student.id] || '',
        };

        try {
          // Post each attendance record
          await dispatch(
            addAttendance({
              classId: selectedClass,
              attendanceData: attendanceDTO,
            })
          ).unwrap();
        } catch (err) {
          // Check if error is about duplicate attendance (already marked)
          const errMsg = typeof err === 'string' ? err : err?.message || '';
          
          if (errMsg.toLowerCase().includes('already') || 
              errMsg.toLowerCase().includes('duplicate') || 
              errMsg.toLowerCase().includes('exists')) {
            errorMessage = 'Attendance already marked for this date';
            hasError = true;
            break; // Stop processing remaining students
          } else {
            errorMessage = errMsg || 'Failed to mark attendance';
            hasError = true;
            break; // Stop processing remaining students
          }
        }
      }

      if (!hasError) {
        setToastMessage('Attendance marked successfully!');
      } else {
        setToastMessage(errorMessage);
      }
      // keep attendance state as-is (do not clear) so UI persists

    } catch (err) {
      // Outer catch - should rarely execute now
      const errMsg = typeof err === 'string' ? err : err?.message || 'Failed to mark attendance';
      setToastMessage(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const safeAssignedClasses = Array.isArray(assignedClasses) ? assignedClasses : [];
  const safeStudents = Array.isArray(studentsInClass) ? studentsInClass : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Mark Attendance</h1>

        {error && <ErrorToast message={error} />}
        {toastMessage && <ErrorToast message={toastMessage} onClose={() => setToastMessage('')} />}

        {/* --- Class & Date Selection --- */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">-- Choose a class --</option>
                {safeAssignedClasses.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.className}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* --- Students Attendance Table --- */}
        {selectedClass && (
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                    STUDENT NAME
                  </th>
                  <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                    EMAIL
                  </th>
                  <th className="px-6 py-3 text-center text-base font-medium text-gray-500 uppercase tracking-wider">
                    PRESENT
                  </th>
                  <th className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider">
                    REMARKS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      Loading students...
                    </td>
                  </tr>
                ) : safeStudents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                      No students found in this class.
                    </td>
                  </tr>
                ) : (
                  safeStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-base font-medium text-gray-900">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="px-6 py-4 text-base text-gray-600">{student.email}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleTogglePresence(student.id)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            attendance[student.id]
                              ? 'bg-green-500 text-white'
                              : 'bg-red-200 text-red-700'
                          }`}
                        >
                          {attendance[student.id] ? 'Present' : 'Absent'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          placeholder="Add remarks (optional)"
                          value={remarks[student.id] || ''}
                          onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {safeStudents.length > 0 && (
              <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
                <Button
                  onClick={() => navigate('/teacher')}
                  className="bg-gray-400 hover:bg-gray-500 text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {submitting ? 'Submitting...' : 'Submit Attendance'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherMarkAttendance;