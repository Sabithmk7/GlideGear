import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://localhost:7295/api/Category/getCategories"
      );
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default categorySlice.reducer;
