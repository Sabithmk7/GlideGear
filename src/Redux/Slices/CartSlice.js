import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const AddToCart = createAsyncThunk(
  "cart/addtocart",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://localhost:7295/api/Cart/add/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      toast.success("Item added to cart");  
      return res.data; // This will be the fulfilled action payload
    } catch (error) {
      // Use rejectWithValue to return a custom error message

      toast.warn(error.response.data.message);
      // This can include specific data from the server
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  cart: [],
  error: null,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(AddToCart.fulfilled, (state, action) => {
        // state.cart.push(action.payload) ;
        state.error = null; // Clear any previous errors
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.error = action.payload; // Set the error to the payload returned from rejectWithValue
        console.log(action.payload); // Log the error for debugging
      });
  },
});

export default CartSlice.reducer;
