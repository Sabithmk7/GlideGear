import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../Slices/CartSlice";
import authReducer from "../Slices/AuthSlice";
import userReducer from "../Slices/UserSlice";
import productReducer from "../Slices/ProductSlice"
import orderReducer from "../Slices/OrderSlice"
import dashboardReducer from "../Slices/DashboardSlice"
import wishlistReducer from "../Slices/WishListSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
    product:productReducer,
    order:orderReducer,
    dashboard:dashboardReducer,
    wishlist:wishlistReducer
  },
});

export default store;
