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
        return res.data;
      } catch (error) {

        toast.warn(error.response.data.message);
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
        return res.data.data; 
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
        console.log(res.data) 
        toast.success(res.data);
        return res.data; 
      } catch (error) {
        toast.warn(error.response.data.message);
        return rejectWithValue(error.response.data);
      }
    }
  );
  

  
  export const IncreaseQty = createAsyncThunk(
    'cart/increaseQty',
    async (pId, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.put(`https://localhost:7295/api/Cart/IncreaseQty/${pId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            
            dispatch(fetchCart()); 
            return res.data.data;
        } catch (error) {
            toast.warn(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

export const DecreaseQty = createAsyncThunk(
    'cart/decreaseQty', 
    async (pId, { dispatch, rejectWithValue }) => {
        try {
            const res = await axios.put(`https://localhost:7295/api/Cart/DecreaseQty/${pId}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(fetchCart()); 
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
          state.error = action.payload; 
          console.log(action.payload); 
        }).addCase(fetchCart.fulfilled, (state, action) => {
          state.cart = action.payload  
          state.error = null;
        })
        .addCase(fetchCart.rejected, (state, action) => {
          console.error(action.payload);
          state.cart = []; 
          state.error = action.payload; 
        });
    },
  });

  export default CartSlice.reducer;
