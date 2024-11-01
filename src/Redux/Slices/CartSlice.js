  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import axios from "axios";
  import { toast } from "react-toastify";

  export const AddToCart = createAsyncThunk(
    "cart/addtocart",
    async (id, { dispatch,rejectWithValue }) => {
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
        dispatch(fetchCart()); 
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

  export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
      try {
        const res = await axios.get('https://localhost:7295/api/Cart/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return res.data.data; // Ensure this is the correct path to your data
      } catch (error) {
        toast.warn(error.response?.data.message || 'Error fetching cart');
        return rejectWithValue(error.response?.data || 'Error fetching cart');
      }
    }
  );
  export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (pId, { dispatch, rejectWithValue }) => {
      try {
        const res = await axios.delete(`https://localhost:7295/api/Cart/Delete/${pId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(fetchCart());
        console.log(res.data) // This will fetch the updated cart
        toast.success(res.data);
        return res.data; // Assuming the response contains the updated cart data
      } catch (error) {
        toast.warn(error.response.data.message);
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  
  export const IncreaseQty = createAsyncThunk(
    'cart/increaseQty', // Ensure the action type is unique
    async (pId, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.put(`https://localhost:7295/api/Cart/IncreaseQty/${pId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            
            dispatch(fetchCart()); // Use dispatch here
            return res.data.data;
        } catch (error) {
            toast.warn(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const DecreaseQty = createAsyncThunk(
    'cart/decreaseQty', // Ensure the action type is unique
    async (pId, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.put(`https://localhost:7295/api/Cart/DecreaseQty/${pId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(fetchCart()); 
            // Use dispatch here
            return res.data.data;
        } catch (error) {
            toast.warn(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);


  const initialState = {
    cart:[],
    status: [],
    error: null,
  };

  const CartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(AddToCart.fulfilled, (state, action) => {
          // state.cart.push(action.payload) ;
          state.error = null; 
        })
        .addCase(AddToCart.rejected, (state, action) => {
          state.error = action.payload; // Set the error to the payload returned from rejectWithValue
          console.log(action.payload); // Log the error for debugging
        }).addCase(fetchCart.fulfilled, (state, action) => {
          state.cart = action.payload  // Fallback to empty array
          state.error = null;
        })
        .addCase(fetchCart.rejected, (state, action) => {
          console.error(action.payload); // Log the error for debugging
          state.cart = []; // Ensure cart is empty on error
          state.error = action.payload; // Store error message if needed
        });
    },
  });

  export default CartSlice.reducer;
