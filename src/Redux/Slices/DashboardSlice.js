import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getTotalRevenue = createAsyncThunk(
  "dashboard/getTotalRevenue",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://localhost:7295/api/Order/totalRevenue",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );
      console.log(response.data);
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch total revenue"
      );
    }
  }
);

export const getTotalProductsPurchased = createAsyncThunk(
  "dashboard/getTotalProductsPurchased",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://localhost:7295/api/Order/totalProductsPurchased",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch total products purchased"
      );
    }
  }
);

// Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalRevenue: null,
    loading: false,
    totalProductsPurchased: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.totalRevenue = action.payload;
      })
      .addCase(getTotalRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTotalProductsPurchased.fulfilled, (state, action) => {
        state.loading = false;
        state.totalProductsPurchased = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
