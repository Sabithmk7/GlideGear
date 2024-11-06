import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  DecreaseQty,
  fetchCart,
  IncreaseQty,
  removeItemFromCart,
} from "../Redux/Slices/CartSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const totalPrice = cart?.reduce((acc, c) => {
    return acc + c.price * c.quantity;
  }, 0);

  function handleCheckout() {
    navigate("/checkout");
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 p-4 md:p-8 lg:p-16 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
          {cart && cart.length === 0 ? (
            <p className="text-lg text-center">Your cart is empty</p>
          ) : (
            <ul className="space-y-6 flex flex-col">
              {cart.map((item) => (
                <li
                  key={item.productId}
                  className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white shadow-md rounded-lg p-6 border border-gray-200"
                >
                  <img
                    className="w-40 h-40 object-cover rounded-lg"
                    src={item.productImage}
                    alt={item.productName}
                  />
                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2 flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.productName}
                    </h2>
                    <div className="flex items-center gap-2">
                      <label className="font-semibold text-gray-600">Quantity:</label>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => dispatch(DecreaseQty(item.productId))}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-l-md"
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(IncreaseQty(item.productId))}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-r-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-lg text-gray-700">Price: ₹{item.price}</p>
                    <p className="text-lg font-semibold text-gray-800">
                      Total: ₹{item.totalAmount}
                    </p>
                  </div>
                  <MdDelete
                    onClick={() => dispatch(removeItemFromCart(item.productId))}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size={24}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart && cart.length > 0 && (
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Summary</h2>
              <div className="border-b pb-4 mb-4 text-gray-700">
                <p className="flex justify-between">
                  <span>Subtotal</span> <span>₹{totalPrice}</span>
                </p>
                <p className="flex justify-between mt-2">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </p>
              </div>
              <div className="flex justify-between text-xl font-bold mb-4 text-gray-800">
                <span>Total</span> <span>₹{totalPrice}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full py-3 text-white bg-blue-950 hover:bg-blue-900 rounded-md font-semibold transition-colors duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
