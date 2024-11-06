import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle, MdMenu, MdClose } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../Redux/Slices/CartSlice";
import { getWishList } from "../Redux/Slices/WishListSlice";
import { search } from "../Redux/Slices/ProductSlice";
import { logout } from "../Redux/Slices/AuthSlice";

function Navbar() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const records = useSelector((state) => state.product.search); // Search results from redux
  const { cart } = useSelector((state) => state.cart); // Cart from redux
  const { loginStatus } = useSelector((state) => state.auth); // Login status from redux

  useEffect(() => {
    if (loginStatus) {
      dispatch(fetchCart());
      dispatch(getWishList());
    }
  }, [dispatch, loginStatus]);

  const fetchUser = () => {
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("id");
    if (userId) {
      setIsLoggedIn(true);
      setName(name);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    dispatch(search(value || "")); // Dispatch search query, empty string if value is empty
  };

  const toggleMenu = () => setShow(!show);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        toast.warn("Logged Out");
        setIsLoggedIn(false);
        setName("");
        navigate("/");
        dispatch(logout());
      }
    });
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <div className="font-bold text-2xl">
          <Link to="/">GLIDEGEAR</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {show ? <MdClose /> : <MdMenu />}
          </button>
        </div>
        <div className={`${show ? "block" : "hidden"} w-full md:w-auto md:flex md:items-center`}>
          <ul className="flex flex-col md:flex-row gap-6 text-slate-400 font mt-4 md:mt-0">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "text-black font-bold" : "hover:text-black")}
                onClick={toggleMenu}
              >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products/Men"
                className={({ isActive }) => (isActive ? "text-black font-bold" : "hover:text-black")}
                onClick={toggleMenu}
              >
                MEN
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products/Female"
                className={({ isActive }) => (isActive ? "text-black font-bold" : "hover:text-black")}
                onClick={toggleMenu}
              >
                FEMALE
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products/All"
                className={({ isActive }) => (isActive ? "text-black font-bold" : "hover:text-black")}
                onClick={toggleMenu}
              >
                ALL PRODUCTS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "text-black font-bold" : "hover:text-black")}
              >
                CONTACT
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6 text-2xl text-black">
          <div className="hidden md:block relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              value={query}
              className="w-full p-2 h-[30px] text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
            />
            {query && (
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                onClick={() => setQuery("")}
              >
                <MdClose />
              </button>
            )}
            {query && records?.length > 0 && (
              <div className="absolute left-0 mt-2 z-10 bg-white border w-full max-h-[500px] overflow-auto border-gray-300 rounded shadow-lg">
                {records.map((record) => (
                  <Link key={record.id} to={`/product/${record.id}`} onClick={toggleMenu}>
                    <div className="p-4 w-full flex justify-between items-center rounded-md mb-2 bg-gray-50 hover:bg-gray-100 transition duration-300">
                      <div>
                        <div className="text-lg font-medium text-black">{record.title}</div>
                        <div className="text-sm text-gray-500">${record.price}</div>
                      </div>
                      <img
                        src={record.productImage}
                        alt={record.title}
                        className="w-[50px] h-[50px] object-cover rounded-md border border-gray-200"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/wishlist" className="relative">
            <IoMdHeart className="text-black" />
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart />
            <span className="absolute top-[-8px] right-[-8px] bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          </Link>
          <div className="relative">
            <button
              className="text-2xl flex flex-col items-center justify-center"
              onClick={toggleDropdown}
            >
              <MdAccountCircle />
              {isLoggedIn && <p className="text-base mt-1">{name}</p>}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                <ul className="py-1">
                  {isLoggedIn ? (
                    <>
                      <li>
                        <Link
                          to="/order"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdown}
                        >
                          Order History
                        </Link>
                      </li>
                      <li>
                        <button
                          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeDropdown}
                      >
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
