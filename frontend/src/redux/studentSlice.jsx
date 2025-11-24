~~~{"variant":"standard","title":"Student Slice","id":"78421"}
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/api/student";




export const fetchStudentProfile = createAsyncThunk(
  "student/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch profile failed");
    }
  }
);


export const updateStudentProfile = createAsyncThunk(
  "student/updateProfile",
  async (studentData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(`${API_URL}/profile`, studentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update profile failed");
    }
  }
);

export const fetchStudentAttendance = createAsyncThunk(
  "student/fetchAttendance",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${API_URL}/attendance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data?.data ?? response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch attendance failed");
    }
  }
);


export const fetchStudentAttendanceBetweenDates = createAsyncThunk(
  "student/fetchAttendanceBetweenDates",
  async ({ from, to }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${API_URL}/attendance/search`, {
        params: { from, to },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data?.data ?? response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch attendance failed");
    }
  }
);


const studentSlice = createSlice({
  name: "student",
  initialState: {
    profile: null,
    attendance: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    
    builder
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    
    builder
      .addCase(updateStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    
    builder
      .addCase(fetchStudentAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addCase(fetchStudentAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    
    builder
      .addCase(fetchStudentAttendanceBetweenDates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentAttendanceBetweenDates.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addCase(fetchStudentAttendanceBetweenDates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default studentSlice.reducer;

