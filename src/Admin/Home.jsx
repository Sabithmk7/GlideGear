import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AddProducts from "./AddProducts";
import { VscThreeBars } from "react-icons/vsc";
import Dashboard from "./Dashboard";
import AllUsers from "./AllUsers";
import EditProducts from "./EditProducts";
import NotFound from "../components/NotFound";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const { url } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { users } = useSelector((state) => state.user);
const role=localStorage.getItem('role');

  useEffect(()=>{
    // console.log(users)
    // const user=users?.find(u=>u.id==id)
    // console.log(user)
    if(role==='admin'){
      setIsAdmin(true);
    }
  })
  // useEffect(() => {
  //   fetchUser();
  // }, []);

  // async function fetchUser() {
  //   let userId = localStorage.getItem("id");
  //   if (userId) {
  //     let res = await axios.get(`http://localhost:3001/users/${userId}`);
  //     if (res.data?.admin === true) setIsAdmin(true);
  //   }
  // }

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/login");
      }
    });
  };

  const Data = [
    { title: "Dashboard", url: "dashboard" },
    { title: "All Users", url: "allusers" },
    { title: "All Products", url: "editproducts" },
    { title: "Add Products", url: "addproducts" },
  ];

  return (
    <>
      {isAdmin ? (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 w-full">
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
              <div className="flex items-center gap-4">
                <button
                  className="text-gray-200 hover:text-gray-400"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>

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

          <div className="flex-1 ml-0 md:ml-72 w-full p-6 pt-20">
            {url === "dashboard" ? (
              <Dashboard />
            ) : url === "allusers" ? (
              <AllUsers />
            ) : url === "addproducts" ? (
              <AddProducts />
            ) : url === "editproducts" ? (
              <EditProducts />
            ) : null}
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Home;
