import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:8080/api/admin";

export const fetchStudents = createAsyncThunk(
"admin/fetchStudents",
async (_, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.get(`${API_URL}/students`, {
  headers: { Authorization: `Bearer ${token}` },
});

return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Fetch students failed");
}
}
);

export const addStudent = createAsyncThunk(
"admin/addStudent",
async (studentData, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.post(`${API_URL}/students`, studentData, {
  headers: { Authorization: `Bearer ${token}` },
});
return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Add student failed");
}
}
);

export const updateStudent = createAsyncThunk(
"admin/updateStudent",
async ({ id, studentData }, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.put(`${API_URL}/students/${id}`, studentData, {
  headers: { Authorization: `Bearer ${token}` },
});
return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Update student failed");
}
}
);

export const deleteStudent = createAsyncThunk(
"admin/deleteStudent",
async (id, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
await axios.delete(`${API_URL}/students/${id}`, {
headers: { Authorization: `Bearer ${token}` },
});
return id;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Delete student failed");
}
}
);


export const fetchTeachers = createAsyncThunk(
"admin/fetchTeachers",
async (_, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.get(`${API_URL}/teachers`, {
  headers: { Authorization: `Bearer ${token}` },
});
return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Fetch teachers failed");
}
}
);

export const addTeacher = createAsyncThunk(
"admin/addTeacher",
async (teacherData, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.post(`${API_URL}/teachers`, teacherData, {
  headers: { Authorization: `Bearer ${token}` },
});
return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Add teacher failed");
}
}
);

export const updateTeacher = createAsyncThunk(
"admin/updateTeacher",
async ({ id, teacherData }, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.put(`${API_URL}/teachers/${id}`, teacherData, {
  headers: { Authorization: `Bearer ${token}` },
});
return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Update teacher failed");
}
}
);

export const deleteTeacher = createAsyncThunk(
"admin/deleteTeacher",
async (id, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
await axios.delete(`${API_URL}/teachers/${id}`, {
headers: { Authorization: `Bearer ${token}` },
});
return id;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Delete teacher failed");
}
}
);


export const fetchClasses = createAsyncThunk(
"admin/fetchClasses",
async (_, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.get(`${API_URL}/classes`, {
  headers: { Authorization: `Bearer ${token}` },
});
return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Fetch classes failed");
}
}
);

export const fetchClassById = createAsyncThunk(
"admin/fetchClassById",
async (id, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.get(`${API_URL}/classes/${id}`, {
  headers: { Authorization: `Bearer ${token}` },
});
return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Fetch class failed");
}
}
);

export const addClass = createAsyncThunk(
"admin/addClass",
async (classData, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.post(`${API_URL}/classes`, classData, {
  headers: { Authorization: `Bearer ${token}` },
});
return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Add class failed");
}
}
);

export const updateClass = createAsyncThunk(
"admin/updateClass",
async ({ id, classData }, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.put(`${API_URL}/classes/${id}`, classData, {
  headers: { Authorization: `Bearer ${token}` },
});
return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Update class failed");
}
}
);

export const deleteClass = createAsyncThunk(
"admin/deleteClass",
async (id, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
await axios.delete(`${API_URL}/classes/${id}`, {
headers: { Authorization: `Bearer ${token}` },
});
return id;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Delete class failed");
}
}
);


export const searchUsers = createAsyncThunk(
"admin/searchUsers",
async (keyword, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.get(`${API_URL}/users/search?q=${keyword}`, {
  headers: { Authorization: `Bearer ${token}` },
});
return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "User search failed");
}
}
);


export const fetchAttendanceBetweenDates = createAsyncThunk(
"admin/fetchAttendanceBetweenDates",
async ({ from, to }, { getState, rejectWithValue }) => {
try {
const token = getState().auth.token;
const response = await axios.get(`${API_URL}/attendance/search?from=${from}&to=${to}`, {
  headers: { Authorization: `Bearer ${token}` },
});

return response.data?.data ?? response.data;
} catch (err) {
return rejectWithValue(err.response?.data?.message || "Fetch attendance failed");
}
}
);


const adminSlice = createSlice({
name: "admin",
initialState: {
students: [],
teachers: [],
classes: [],
searchResults: [],
attendanceBetweenDates: [],
loading: false,
error: null,
},
reducers: {},
extraReducers: (builder) => {
builder

.addCase(fetchStudents.pending, (state) => { state.loading = true; state.error = null; })
.addCase(fetchStudents.fulfilled, (state, action) => { state.loading = false; state.students = action.payload; })
.addCase(fetchStudents.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
.addCase(addStudent.fulfilled, (state, action) => { state.students.push(action.payload); })
.addCase(updateStudent.fulfilled, (state, action) => {
const index = state.students.findIndex(s => s.id === action.payload.id);
if (index !== -1) state.students[index] = action.payload;
})
.addCase(deleteStudent.fulfilled, (state, action) => {
state.students = state.students.filter(s => s.id !== action.payload);
})


   
  .addCase(fetchTeachers.fulfilled, (state, action) => { state.teachers = action.payload; })  
  .addCase(addTeacher.fulfilled, (state, action) => { state.teachers.push(action.payload); })  
  .addCase(updateTeacher.fulfilled, (state, action) => {  
    const index = state.teachers.findIndex(t => t.id === action.payload.id);  
    if (index !== -1) state.teachers[index] = action.payload;  
  })  
  .addCase(deleteTeacher.fulfilled, (state, action) => {  
    state.teachers = state.teachers.filter(t => t.id !== action.payload);  
  })  

   
  .addCase(fetchClasses.fulfilled, (state, action) => { state.classes = action.payload; })  
  .addCase(fetchClassById.fulfilled, (state, action) => {})  
  .addCase(addClass.fulfilled, (state, action) => { state.classes.push(action.payload); })  
  .addCase(updateClass.fulfilled, (state, action) => {  
    const index = state.classes.findIndex(c => c.id === action.payload.id);  
    if (index !== -1) state.classes[index] = action.payload;  
  })  
  .addCase(deleteClass.fulfilled, (state, action) => {  
    state.classes = state.classes.filter(c => c.id !== action.payload);  
  })  

  
  .addCase(searchUsers.pending, (state) => { state.loading = true; state.error = null; })  
  .addCase(searchUsers.fulfilled, (state, action) => { state.loading = false; state.searchResults = action.payload; })  
  .addCase(searchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })  

  
  .addCase(fetchAttendanceBetweenDates.pending, (state) => { state.loading = true; state.error = null; })  
  .addCase(fetchAttendanceBetweenDates.fulfilled, (state, action) => { state.loading = false; state.attendanceBetweenDates = action.payload; })  
  .addCase(fetchAttendanceBetweenDates.rejected, (state, action) => { state.loading = false; state.error = action.payload; })  

   
  .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {  
    state.error = action.payload || "Something went wrong";  
    state.loading = false;  
  });  


},
});

export default adminSlice.reducer;
