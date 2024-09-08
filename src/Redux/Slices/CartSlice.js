import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const addToCart = createAsyncThunk("cart/addToCart", async (item) => {
  let user = localStorage.getItem("id");
  if (user) {
    try {
      let res = await axios.get(`http://localhost:3001/users/${user}`);
      const currentCart = res.data.cart;
      const itemExists = currentCart.find((v) => v.id === item.id);
      if (itemExists) {
        toast.info("Item already exists");
      } else {
        const updatedCart = [...currentCart, item];
        axios.put(`http://localhost:3001/users/${user}`, { cart: updatedCart });
        toast.success("Item succesfully added");
        return updatedCart;
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  } else {
    toast.info("Please login");
  }
});

export const removeItem = createAsyncThunk("cart/removeItem", async (item) => {
  const userId = localStorage.getItem("id");
  if (userId) {
    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}`);
      const currentCart = response.data.cart;

      const updatedCart = currentCart.filter(
        (cartItem) => cartItem.id !== item.id
      );
      await axios.patch(`http://localhost:3001/users/${userId}`, {
        cart: updatedCart,
      });
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error(error);
    }
  }
});
const initialState = {
  cart: [],
  error: "",
};

const cartSice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cart = [];
        state.error = action.error.message;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.cart = [];
        state.error = action.error.message;
      });
  },
});

export default cartSice.reducer;
