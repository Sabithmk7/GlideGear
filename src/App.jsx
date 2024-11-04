import React, { createContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Authentication/LoginPage";
import SignUp from "./pages/Authentication/SignUp";
import ProductDetails from "./components/ProductDetails";
// import MenPage from "./pages/MenPage";
// import WomenPage from "./pages/WomenPage";
import Collection from "./pages/Collection";
import axios from "axios";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./components/Contact";
import Order from "./pages/Order";
import Home from "./Admin/Home";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./Redux/Slices/UserSlice";
import { fetchProducts } from "./Redux/Slices/ProductSlice";
import FilteredProducts from "./pages/FilteredProducts";
import UserDetails from "./Admin/Users/UserDetails";

export const UserContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  // const{cart}=useSelector(state=>state.cart)

  // useEffect(() => {
  //   axios.get("http://localhost:3001/users").then((res) => setUsers(res.data));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/products")
  //     .then((res) => setProducts(res.data));
  // }, []);

  // async function fetchCart() {
  //   const userId=localStorage.getItem("id")
  //   if(userId){
  //     try{
  //       const res=await axios.get(`http://localhost:3001/users/${userId}`)
  //       setCartItems(res.data.cart)
  //     }
  //     catch(error)
  //     {
  //       console.error("Failed to fetch cart items", error);
  //     }
  //   }
  // }

  // useEffect(()=>{
  //   fetchCart()
  // },[])
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          users,
          setUsers,
          products,
          setProducts,
          cartItems,
          setCartItems,
          // fetchCart
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/products/:category" element={<FilteredProducts />} />
          

          {/* <Route path="/men" element={<MenPage />} /> */}
          {/* <Route path="/women" element={<WomenPage />} /> */}
          <Route path="/collections" element={<Collection />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="admin/:url" element={<Home />} />
          <Route path="admin/allusers/:userId" element={<UserDetails />} />
        </Routes>
      </UserContext.Provider>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
