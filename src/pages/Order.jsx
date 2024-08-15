import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

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
    <div className="bg-gray-100 p-4 md:p-8 lg:p-16">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      {userData.orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div>
          {userData.orders.map((order) => (
            <div key={order.orderId} className="bg-white shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order ID: {order.orderId}</h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Address:</h3>
                <p>{order.address}</p>
                <p>{order.city}</p>
                <p>{order.postalCode}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Payment Method:</h3>
                <p>{order.paymentMethod}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Items:</h3>
                <ul className="space-y-4">
                  
                </ul>
                <p className="text-lg font-bold mt-4">Total: ${order.amount}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;
