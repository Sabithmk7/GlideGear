import React from "react";
import { useLocation } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const { cartItems, selectedSizes, quantities, totalAmount } = location.state;

  return (
    <div className="bg-gray-100 p-4 md:p-8 lg:p-16 flex flex-col lg:flex-row gap-8">

      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout Form</h1>
        <form className="bg-white shadow-lg p-6 space-y-6">
          <div>
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block font-semibold">Address</label>
            <input
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your address"
            />
          </div>
          <div>
            <label className="block font-semibold">City</label>
            <input
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your city"
            />
          </div>
          <div>
            <label className="block font-semibold">Postal Code</label>
            <input
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your postal code"
            />
          </div>
          <div>
            <label className="block font-semibold">Phone Number</label>
            <input
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <button className="w-full border-2 border-gray-400 shadow-lg py-2 font-semibold">
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
                    <p className="text-gray-600">Quantity: {quantities[item.id] || 1}</p>
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
