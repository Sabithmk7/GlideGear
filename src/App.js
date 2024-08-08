import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/Home";
import LoginPage from "./pages/Authentication/LoginPage";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import SignUp from "./pages/Authentication/SignUp";
import ProductDetails from "./components/ProductDetails";
import MenPage from "./pages/MenPage";
import Footer from "./components/Footer";
import WomenPage from "./pages/WomenPage";
import Collection from "./pages/Collection";


export const UserContext = createContext();

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [users, setUsers] = useState([]); 
  const [user, setUser] = useState(null); 
  const [checkNav, setCheckNav] = useState(true);

  return (
    <Router>
      {checkNav && <Navbar />}
      <UserContext.Provider value={{ user, setUser, formData, setFormData, users, setUsers }}>
        <Routes>
          <Route path="/" element={<HomePage setCheckNav={setCheckNav}/>} />
          <Route path="/login" element={<LoginPage setCheckNav={setCheckNav} />} />
          <Route path="/signup" element={<SignUp setCheckNav={setCheckNav} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/men" element={<MenPage/>} />
          <Route path="/women" element={<WomenPage/>} />
          <Route path="/collections" element={<Collection/>} />

        </Routes>
      </UserContext.Provider>
      <ToastContainer/>
      <Footer />
    </Router>
  );
}

export default App;
