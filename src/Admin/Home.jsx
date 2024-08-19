import React, {  useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddProducts from "./AddProducts";
import { VscThreeBars } from "react-icons/vsc";
import Dashboard from "./Dashboard";
import Order from "./Order";
import AllUsers from "./AllUsers";
import EditProducts from "./EditProducts";
import Error from "../components/Error";
import axios from "axios";

const Home = () => {
  const { url } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin,setIsAdmin]=useState(false)

  useEffect(()=>{
    fetchUser()
  },[])
  async function fetchUser(){
    let userId=localStorage.getItem('id')
    if(userId){
      let res = await axios.get(`http://localhost:3001/users/${userId}`);
      if(res.data?.admin === true)setIsAdmin(true)
    }
  }

  const Data = [
    { title: "All Users", url: "allusers" },
    { title: "Add Products", url: "addproducts" },
    { title: "Dashboard", url: "dashboard" },
    { title: "Edit Products", url: "editproducts" },
    { title: "Orders", url: "orders" },
  ];

  return (
    <>
    {isAdmin?<div className="min-h-screen flex flex-col md:flex-row bg-gray-50 w-full">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow w-full fixed top-0 left-0 z-20">
        <div className="mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              className="text-gray-200 md:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <VscThreeBars size={24} />
            </button>
            <div className="text-xl font-semibold text-gray-200">
              Admin Panel
            </div>
          </div>
          <div className="flex items-center">
            <Link to={"/"}>
              <button className="text-gray-200 hover:text-gray-400 mr-4">
                Home
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-700 text-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-72 h-full pt-20 z-10 md:translate-x-0`}
      >
        {Data.map((item, ind) => (
          <Link
            key={ind}
            className="block w-[80%] mx-auto"
            to={`/admin/${item.url}`}
            onClick={() => setIsOpen(false)}
          >
            <div className="hover:bg-gray-600 rounded-lg px-6 py-3 mb-4 transition-colors">
              {item.title}
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-72 w-full p-6 pt-20">
        {url === "dashboard" ? (
          <Dashboard />
        ) : url === "allusers" ? (
          <AllUsers />
        ) : url === "addproducts" ? (
          <AddProducts />
        ) : url === "editproducts" ? (
          <EditProducts />
        ) : url === "orders" ? (
          <Order />
        ) : null}
      </div>
    </div>:<Error/>}
    </>
  );
};

export default Home;
