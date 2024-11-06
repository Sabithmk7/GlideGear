// authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

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
      toast.error()
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  registerData: null,
  loginStatus: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loginStatus = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.loginStatus = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerData = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action.error.message);
        state.registerData=action.error;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
