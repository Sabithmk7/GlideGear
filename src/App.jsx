import React, { createContext, useEffect, useState } from "react";
import {  Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home/Home";
import LoginPage from "./pages/Authentication/LoginPage";
import SignUp from "./pages/Authentication/SignUp";
import ProductDetails from "./components/ProductDetails";
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import Collection from "./pages/Collection";
import axios from "axios";
import Cart from "./components/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./components/Contact";
import Order from "./pages/Order";
import Home from "./Admin/Home";


export const UserContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [products, setproducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((res) => setUsers(res.data));
  }, [users]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setproducts(res.data));
  }, [products]);

  return (
    <>
      <UserContext.Provider
        value={{
          users,
          setUsers,
          products,
          setproducts,
          cartCount,
          setCartCount
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/collections" element={<Collection />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="admin/:url" element={<Home />} />
        </Routes>
      </UserContext.Provider>
      <ToastContainer position="bottom-right" />
      </>
  );
}

export default App;
