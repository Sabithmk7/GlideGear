// authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://localhost:7295/api/Auth/login",
        credentials
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://localhost:7295/api/Auth/Register",
        userData
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const response = await axios.get("https://localhost:7295/api/Auth/logout", {
    withCredentials: true,
  });
  return response.data;
});

const initialState = {
  userStatus: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userStatus = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = action.payload.message || "Error creating user"; 
        state.error = action.payload || action.error.message;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = action.payload;
        state.userStatus = false;
      });
  },
});

export default authSlice.reducer;
