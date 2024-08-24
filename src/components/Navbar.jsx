import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle, MdMenu, MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { UserContext } from "../App";

function Navbar() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");
  const { products, cartItems,setCartItems,fetchCart } = useContext(UserContext);

  useEffect(() => {
    setItems(products);
    setRecords(products);
  }, [products]);

  async function fetchUser() {
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("id");
    if (userId) {
      setIsLoggedIn(true);
      setName(name);
      fetchCart()
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setRecords(items.filter((u) => u.name.toLowerCase().includes(value)));
  };

  const toggleMenu = () => {
    setShow(!show);
  };

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
        setCartItems([])
        toast.warn("Logged Out");
        setIsLoggedIn(false);
        setIsDropdownOpen(false);
        setName("")
        navigate("/");
      }
    });
  };

  const handleDetails = () => {
    setRecords([]);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  return (
    <>
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
          <div
            className={`${
              show ? "block" : "hidden"
            } w-full md:w-auto md:flex md:items-center`}
          >
            <ul className="flex flex-col md:flex-row gap-6 text-slate-400 font mt-4 md:mt-0">
              <li className="hover:text-black">
                <Link className="text-black" to="/" onClick={toggleMenu}>
                  HOME
                </Link>
              </li>
              <li className="hover:text-black">
                <Link to="/men" onClick={toggleMenu}>
                  MEN
                </Link>
              </li>
              <li className="hover:text-black">
                <Link to="/women" onClick={toggleMenu}>
                  WOMEN
                </Link>
              </li>
              <li className="hover:text-black">
                <Link to="/collections" onClick={toggleMenu}>
                  ALL PRODUCTS
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-black">
                  CONTACT
                </Link>
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
              {query && records.length > 0 && (
                <div className="absolute left-0 mt-2 z-10 bg-white border w-full max-h-[500px] overflow-auto border-gray-300 rounded shadow-lg">
                  {records.map((record) => (
                    <Link
                      onClick={handleDetails}
                      key={record.id}
                      to={`/product/${record.id}`}
                    >
                      <div className="p-4 w-full flex justify-between items-center rounded-md mb-2 bg-gray-50 hover:bg-gray-100 transition duration-300">
                        <div className="text-lg font-medium text-black">
                          {record.name}
                        </div>
                        <img
                          src={record.image}
                          alt={record.name}
                          className="w-[50px] h-[50px] object-cover rounded-md border border-gray-200"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/cart" className="relative">
              <FaShoppingCart />
              <span className="absolute top-[-8px] right-[-8px] bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
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
    </>
  );
}

export default Navbar;
