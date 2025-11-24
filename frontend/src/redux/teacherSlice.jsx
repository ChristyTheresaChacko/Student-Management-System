import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api/teacher";

// ==================== TEACHER APIs ====================

// Fetch teacher profile
export const fetchTeacherProfile = createAsyncThunk(
  "teacher/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load profile");
    }
  }
);

// Fetch assigned classes
export const fetchAssignedClasses = createAsyncThunk(
  "teacher/fetchAssignedClasses",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.get(`${API_URL}/assigned-classes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load assigned classes");
    }
  }
);

// Fetch students of a class (with backend filter)
export const fetchStudentsInClass = createAsyncThunk(
  "teacher/fetchStudentsInClass",
  async (classId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.get(`${API_URL}/classes/${classId}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load students");
    }
  }
);

// Fetch attendance of a class
export const fetchAttendance = createAsyncThunk(
  "teacher/fetchAttendance",
  async ({ classId, date }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.get(`${API_URL}/classes/${classId}/attendance`, {
        params: { date }, // send date as query param
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load attendance");
    }
  }
);


// Add attendance
export const addAttendance = createAsyncThunk(
  "teacher/addAttendance",
  async ({ classId, attendanceData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.post(`${API_URL}/classes/${classId}/attendance`, attendanceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add attendance");
    }
  }
);

// Update attendance
export const updateAttendance = createAsyncThunk(
  "teacher/updateAttendance",
  async ({ classId, id, attendanceData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.put(
        `${API_URL}/classes/${classId}/attendance/${id}`,
        attendanceData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return res.data?.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update attendance");
    }
  }
);
export const fetchAttendanceForClassAndDate = createAsyncThunk(
  "teacher/fetchAttendanceForClassAndDate",
  async ({ classId, date }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `${API_URL}/attendance/class/${classId}?date=${date}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data?.data ?? response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to get attendance");
    }
  }
);



// Delete attendance
export const deleteAttendance = createAsyncThunk(
  "teacher/deleteAttendance",
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(`${API_URL}/attendance/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete attendance");
    }
  }
);

// ==================== SLICE ====================

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    profile: null,
    assignedClasses: [],
    studentsInClass: [],
    attendance: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Profile
      .addCase(fetchTeacherProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // Assigned Classes
      .addCase(fetchAssignedClasses.fulfilled, (state, action) => {
        state.assignedClasses = action.payload;
      })

      // Students
      .addCase(fetchStudentsInClass.fulfilled, (state, action) => {
        state.studentsInClass = action.payload;
      })

      // Attendance
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.attendance = action.payload;
      })
      .addCase(addAttendance.fulfilled, (state, action) => {
        state.attendance.push(action.payload);
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        const index = state.attendance.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.attendance[index] = action.payload;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.attendance = state.attendance.filter(a => a.id !== action.payload);
      })

      // Loading + Errors
      .addMatcher(
        (action) => action.type.startsWith("teacher/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("teacher/") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("teacher/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default teacherSlice.reducer;
