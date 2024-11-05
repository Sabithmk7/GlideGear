import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const res = await axios.get("https://localhost:7295/api/Product/All");
    return res.data;
  }
);
export const categorizeProducts = createAsyncThunk(
  "product/categorizeProducts",
  async (category) => {
    const res =await  axios.get(
      `https://localhost:7295/api/Product/getByCategory?categoryName=${category}`
    );
    console.log(res.data);
    return res.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const res = await axios.get(
      `https://localhost:7295/api/Product/GetById/${id}`
    );
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId,{dispatch}) => {
    try {
      const res = await axios.delete(
        `https://localhost:7295/api/Product/Delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      dispatch(fetchProducts());
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProduct=createAsyncThunk('product/addProduct',async(values,{dispatch})=>{
  console.log(values)
  try{
    let res=await axios.post('https://localhost:7295/api/Product/Add',values,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    dispatch(fetchProducts())
    
    console.log(res)
  }catch(error){
    console.log(error)
  }
})

export const updateProduct=createAsyncThunk('product/updateProduct',async({productId,values},{dispatch})=>{
  try{
    const res=await axios.put(`https://localhost:7295/api/Product/UpdateProduct/${productId}`,values,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    dispatch(fetchProducts())
    console.log(res)
  }catch(error){
    console.log(error)
  }
})


export const search=createAsyncThunk('product/search',async(query)=>{
  try{
    const res=await axios.get(`https://localhost:7295/api/Product/search-item?search=${query}`);
    return res.data;
  }catch(error){
    console.log(error)
  }
})

const initialState = {
  products: [],
  filteredProducts: [],
  search:[],
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
        console.log("failed");
      })
      .addCase(categorizeProducts.fulfilled, (state, action) => {
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.product = action.payload;
      }).addCase(deleteProduct.fulfilled,(state,action)=>{
        console.log(action.payload)
      }).addCase(search.fulfilled,(state,action)=>{
        state.search=action.payload
      })
  },
});

export default ProductSlice.reducer;
