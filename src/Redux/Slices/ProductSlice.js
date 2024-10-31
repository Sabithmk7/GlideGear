import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const res = axios.get("https://localhost:7295/api/Product/All");
    return (await res).data;
  }
);
export const categorizeProducts = createAsyncThunk(
  "product/categorizeProducts",
  async (category) => {
    const res = axios.get(
      `https://localhost:7295/api/Product/getByCategory?categoryName=${category}`
    );
    console.log((await res).data);
    return (await res).data;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const res = axios.get(`https://localhost:7295/api/Product/GetById/${id}`);
    return (await res).data;
  }
);

const initialState = {
  products: [],
  filteredProducts: [],
  product: null,
};
const ProductSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, () => {
        console.log("faoled");
      })
      .addCase(categorizeProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export default ProductSlice.reducer;
