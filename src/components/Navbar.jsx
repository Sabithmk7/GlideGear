import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdAccountCircle, MdMenu, MdClose, MdLogout } from "react-icons/md";

function Navbar() {
  const [show, setshow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const userId = localStorage.getItem("id");
    setIsLoggedIn(!!userId);
  }, []);

  const toggleMenu = () => {
    setshow(!show);
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    navigate('/');
    // Optionally, force a page reload
    // window.location.reload();
  };

  return (
    <div className="flex justify-between md:flex-row md:justify-between items-center p-8">
      <div className="font-bold text-2xl mb-4 md:mb-0">
        GLIDEGEAR
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl">
          {show ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      <div
        className={`w-full md:w-auto ${show ? 'block' : 'hidden'} md:flex md:items-center md:justify-between`}
      >
        <ul className="flex flex-col md:flex-row gap-6 text-slate-400 font">
          <li className="hover:text-black">
            <Link className="text-black" to="/">HOME</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/men">MEN</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/women">WOMEN</Link>
          </li>
          <li className="hover:text-black">
            <Link to="/collections">COLLECTIONS</Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-col md:flex-row gap-6 text-slate-400 mt-4 md:mt-0">
        <Link to="/contact" className="hidden md:block hover:text-black">
          CONTACT
        </Link>
        <div className="flex items-center gap-6 text-2xl text-black">
          <Link to="/cart">
            <FaShoppingCart />
          </Link>
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={handleLogout} className="text-2xl">
                <MdLogout />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <MdAccountCircle />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
