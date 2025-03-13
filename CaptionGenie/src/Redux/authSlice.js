import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await axios.get("http://localhost:5000/auth", { withCredentials: true });
  return response.data;
});

export const login = createAsyncThunk("api/auth/login", async (userData) => {
  console.log("login in auth")
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",  // ✅ Corrected URL
    userData,
    { withCredentials: true }
  );
  return response.data;
});



export const signup = createAsyncThunk("api/auth/signup", async (userData) => {
  const response = await axios.post("http://localhost:5000/api/auth/signup", userData, { withCredentials: true });
  return response.data;
});


export const logout = createAsyncThunk("api/auth/logout", async () => {
  await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
  return null;
});


const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
