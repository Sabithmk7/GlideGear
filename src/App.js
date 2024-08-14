import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Authentication/LoginPage";
import Navbar from "./components/Navbar";
import SignUp from "./pages/Authentication/SignUp";
import ProductDetails from "./pages/ProductDetails";
import MenPage from "./pages/MenPage";
import Footer from "./components/Footer";
import WomenPage from "./pages/WomenPage";
import Collection from "./pages/Collection";
import axios from "axios";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";

export const UserContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users")
    .then((res) => setUsers(res.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/products")
      .then((res) => setproducts(res.data));
  }, []);

  
  return (
    <Router>
      <UserContext.Provider value={{ users, setUsers, products, setproducts }}>
      <Navbar />
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
        </Routes>
      </UserContext.Provider>
      <ToastContainer />
      <Footer />
    </Router>
  );
}

export default App;
