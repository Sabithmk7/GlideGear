import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Slices/CartSlice";
import authReducer from "../Slices/AuthSlice";
import userReducer from "../Slices/UserSlice";
import productReducer from "../Slices/ProductSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
    product:productReducer
  },
});

export default store;
