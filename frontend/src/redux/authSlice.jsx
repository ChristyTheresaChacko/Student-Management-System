import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: userName,    
          password: password
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      return response.data.data; 
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload; 
        state.token = action.payload.token; 

        localStorage.setItem("token", action.payload.token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
