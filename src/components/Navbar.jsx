import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle, MdMenu, MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { UserContext } from "../App";

function Navbar() {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");
  const { products } = useContext(UserContext);
  const name = localStorage.getItem("name");


  useEffect(() => {
    setItems(products);
    setRecords(products);
  }, [products]);

  const filter = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setRecords(items.filter((u) => u.name.toLowerCase().includes(value)));
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setShow(!show);
  };

  const handleLogout = () => {
    localStorage.clear()
    toast.warn("Logged Out");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleDetails = () => {
    setRecords([]);
  };

  return (
    <>
      <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between ">
          {/* Logo */}
          <div className="font-bold text-2xl">
            <Link to="/">GLIDEGEAR</Link>
          </div>

          {/* Hamburger Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl">
              {show ? <MdClose /> : <MdMenu />}
            </button>
          </div>

          {/* Nav Links */}
          <div
            className={`${
              show ? "block" : "hidden"
            } w-full md:w-auto md:flex md:items-center`}
          >
            <ul className="flex flex-col md:flex-row gap-6 text-slate-400 font mt-4 md:mt-0">
              <li className="hover:text-black">
                <Link className="text-black" to="/" onClick={toggleMenu}>HOME</Link>
              </li>
              <li className="hover:text-black">
                <Link to="/men" onClick={toggleMenu}>MEN</Link>
              </li>
              <li className="hover:text-black">
                <Link to="/women" onClick={toggleMenu}>WOMEN</Link>
              </li>
              <li className="hover:text-black">
                <Link to="/collections" onClick={toggleMenu}>COLLECTIONS</Link>
              </li>
              <li>
              <Link to="/contact" className=" hover:text-black">
              CONTACT
            </Link>
              </li>
            </ul>
          </div>

          {/* Right-side Icons */}
          <div className="flex items-center gap-6 text-2xl text-black">
            <div className="hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                onChange={filter}
                className="w-full max-w-md p-2 h-[30px] text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            
            <Link to="/cart">
              <FaShoppingCart />
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-2xl flex flex-col items-center justify-center">
                <MdAccountCircle />
                <p className="text-base">Hey, {name}!</p>
              </button>
            ) : (
              <Link to="/login">
                <MdAccountCircle />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Search Results Dropdown (positioned below the navbar) */}
      {query && records.length > 0 && (
        <div className="relative z-[999] bg-white border mx-auto w-[60vw] max-h-[500px] overflow-auto border-gray-300 rounded shadow-lg">
          {records.map((record) => (
            <Link onClick={handleDetails} key={record.id} to={`/product/${record.id}`}>
              <div className="p-4 w-[90%] flex justify-between m-auto mt-4 rounded-md mb-2 bg-gray-50 hover:bg-gray-100 transition duration-300">
                <div>{record.name}</div>
                <img src={record.image} alt="" className="w-[50px]" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
