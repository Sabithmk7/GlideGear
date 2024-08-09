import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/Home";
import LoginPage from "./pages/Authentication/LoginPage";
import Navbar from "./components/Navbar";
import SignUp from "./pages/Authentication/SignUp";
import ProductDetails from "./pages/ProductDetails";
import MenPage from "./pages/MenPage";
import Footer from "./components/Footer";
import WomenPage from "./pages/WomenPage";
import Collection from "./pages/Collection";
import BuyNow from "./pages/BuyNow";
import AddToCart from "./pages/AddToCart";


export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null); 

  return (
    <Router>
   <Navbar />
      <UserContext.Provider value={{ user, setUser}}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/men" element={<MenPage/>} />
          <Route path="/women" element={<WomenPage/>} />
          <Route path="/collections" element={<Collection/>} />
          <Route path="/buy-now" element={<BuyNow/>} />
        </Routes>
      </UserContext.Provider>
      <ToastContainer/>
      <Footer />
    </Router>
  );
}

export default App;
