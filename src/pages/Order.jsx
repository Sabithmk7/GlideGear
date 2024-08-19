import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Order() {
  const { users } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const user = users.find((v) => v.id === userId);
    setUserData(user);
  }, [users, userId]);

  if (!userData) return <p>Loading...</p>;

  return (
    <>
    <Navbar/>
    <div className="bg-gray-100 p-4 md:p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>
      {userData.orders.length === 0 ? (
        <p className="text-center text-lg">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {userData.orders.map((order) => (
            <div key={order.orderId} className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-3">Order ID: {order.orderId}</h2>
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {order.address}, {order.city}, {order.postalCode}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600">Payment Method: {order.paymentMethod}</p>
              </div>
              <ul className="divide-y divide-gray-200">
                {order.cartItems.map((v) => (
                  <li key={v.id} className="py-2 flex items-center">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="w-16 h-16 object-cover rounded border mr-3"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium">{v.name}</p>
                      <p className="text-sm text-gray-600">Qty: {v.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-semibold">${v.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-lg font-bold text-right mt-4">Total: ${order.amount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default Order;
