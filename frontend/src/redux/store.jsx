import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import teacherReducer from "./teacherSlice";
import studentReducer from "./studentSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    teacher: teacherReducer,
    student: studentReducer,
  },
});

export default store;
