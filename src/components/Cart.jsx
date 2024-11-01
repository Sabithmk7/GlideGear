import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { DecreaseQty, fetchCart, IncreaseQty, removeItemFromCart } from "../Redux/Slices/CartSlice";

function Cart() {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector(state => state.cart);

  const fetchData = async () => {
    try {
      dispatch(fetchCart());
    } catch (error) {
      console.error('Error occurred while fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: size,
    }));
  };

  // const handleQuantityChange = (itemId, delta) => {
  //   setQuantities((prevQuantities) => {
  //     const newQuantity = (prevQuantities[itemId] || 1) + delta;
  //     return {
  //       ...prevQuantities,
  //       [itemId]: Math.max(newQuantity, 1), // Ensure quantity is at least 1
  //     };
  //   });
  // };

  // const totalPrice = cart.reduce((total, item) => total + item.price * (quantities[item.productId] || 1), 0).toFixed(2);

  async function removeCartItem(item) {
    // This should dispatch a remove action to Redux, adjust as necessary
    // dispatch(removeItem(item));
    toast.success(`${item.productName} removed from cart!`);
  }

  // function handleCheckout() {
  //   navigate("/checkout", {
  //     state: { cart, selectedSizes, quantities, totalPrice },
  //   });
  // }

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
                  className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white shadow-lg p-4 md:w-full h-auto"
                >
                  <img
                    className="w-48 h-48 object-cover"
                    src={item.productImage}
                    alt={item.productName}
                  />
                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-3 text-left flex-1">
                    <h2 className="text-xl font-semibold">{item.productName}</h2>
                    <div className="flex items-center gap-2">
                      <label className="font-semibold">Quantity:</label>
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => dispatch(DecreaseQty(item.productId))}
                          className="p-2 text-xl font-bold text-gray-700 hover:bg-gray-200 rounded-l"
                        >
                          -
                        </button>
                        <span className="px-4 text-lg">{item.quantity}</span>
                        <button
                          onClick={() =>dispatch(IncreaseQty(item.productId))}
                          className="p-2 text-xl font-bold text-gray-700 hover:bg-gray-200 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-lg font-bold">
                      Price: {item.price}
                    </p>
                    <p className="text-lg font-bold">
                      TotalPrice: {item.totalAmount}
                    </p>
                  </div>
                  <div>
                    <MdDelete
                      onClick={() => dispatch(removeItemFromCart(item.productId))}
                      className="scale-150 cursor-pointer"
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="w-full md:w-1/3 lg:w-1/4 mt-16">
            <div className="bg-white shadow-lg p-6">
              <h1 className="text-2xl md:text-3xl px-3">Summary</h1>
              <p className="border-b-2 border-gray-500 px-3 py-4 flex justify-between">
                {/* <span>Total</span> <span>${}</span> */}
              </p>
              <button
                // onClick={handleCheckout}
                className="border-2 shadow-lg w-full h-12 mt-4 font-semibold"
              >
                Checkout
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
