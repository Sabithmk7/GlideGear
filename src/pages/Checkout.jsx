import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout() {
  const [orderDetails, setOrderDetails] = useState({});
  const location = useLocation();
  const { cartItems, selectedSizes, quantities, totalAmount } = location.state;

  function handleChange(e) {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,  
      [name]: value,
      cartItemsId:cartItems.map(value=>value.id),
      quanities:quantities,
      amount:totalAmount
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const requiredFields = ["fullName", "address", "city", "postalCode", "phoneNumber", "paymentMethod"];
    for (const field of requiredFields) {
      if (!orderDetails[field]) {
        toast.error(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }
    try {
      const userId = localStorage.getItem("id");
      await axios.patch(`http://localhost:3001/users/${userId}`, {
        orderDetails: orderDetails,
      });
      toast.success("Order Successful");
      setOrderDetails('')
    } catch (error) {
      console.log(error);
      toast.error("Order failed");
    }
  }

  return (
    <div className="bg-gray-100 p-4 md:p-8 lg:p-16 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout Form</h1>
        <form
          className="bg-white shadow-lg p-6 space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="fullName" className="block font-semibold">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              value={orderDetails.fullName}
              onChange={handleChange}
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block font-semibold">
              Address
            </label>
            <input
              id="address"
              name="address"
              value={orderDetails.address}
              onChange={handleChange}
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your address"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block font-semibold">
              City
            </label>
            <input
              id="city"
              name="city"
              value={orderDetails.city}
              onChange={handleChange}
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your city"
              required
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block font-semibold">
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              value={orderDetails.postalCode}
              onChange={handleChange}
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your postal code"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block font-semibold">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              value={orderDetails.phoneNumber}
              onChange={handleChange}
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="flex flex-col gap-4">
            <span className="block font-semibold">Payment Options:</span>
            <div>
              <input
                id="paymentUpi"
                name="paymentMethod"
                type="radio"
                value="UPI"
                checked={orderDetails.paymentMethod === "UPI"}
                onChange={handleChange}
                required
              />
              <label htmlFor="paymentUpi" className="ml-2">
                UPI
              </label>
            </div>
            <div>
              <input
                id="paymentCard"
                name="paymentMethod"
                type="radio"
                value="Card"
                checked={orderDetails.paymentMethod === "Card"}
                onChange={handleChange}
                required
              />
              <label htmlFor="paymentCard" className="ml-2">
                Card
              </label>
            </div>
            <div>
              <input
                id="paymentAccount"
                name="paymentMethod"
                type="radio"
                value="Account"
                checked={orderDetails.paymentMethod === "Account"}
                onChange={handleChange}
                required
              />
              <label htmlFor="paymentAccount" className="ml-2">
                Account
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full border-2 border-gray-400 shadow-lg py-2 font-semibold"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Summary Section */}
      <div className="w-full md:w-1/3 lg:w-1/4">
        <div className="bg-white shadow-lg p-6">
          <h1 className="text-2xl md:text-3xl px-3">Summary</h1>
          <ul className="mt-4 space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <img
                    className="w-24 h-24 object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                      Size: {selectedSizes[item.id]}
                    </p>
                    <p className="text-gray-600">Color: {item.colors[0]}</p>
                    <p className="text-gray-600">
                      Quantity: {quantities[item.id] || 1}
                    </p>
                    <p className="text-lg font-bold">
                      ${item.price * (quantities[item.id] || 1)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="border-t-2 border-gray-500 px-3 py-4 flex justify-between mt-6">
            <span>Total</span> <span>${totalAmount}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
