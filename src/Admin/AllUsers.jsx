import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from "flowbite-react";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  async function fetchUsers() {
    try {
      const res = await axios.get('http://localhost:3001/users');
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 shadow-md rounded-lg border border-gray-200 cursor-pointer"
              onClick={() => handleUserClick(user)}
            >
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      )}

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{selectedUser?.name}'s Order Details</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {selectedUser?.orders && selectedUser.orders.length > 0 ? (
              selectedUser.orders.map((order, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 mb-4">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <strong>Order ID:</strong> {order.orderId}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <strong>Full Name:</strong> {order.fullName}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <strong>Address:</strong> {order.address}, {order.city}, {order.postalCode}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <strong>Phone Number:</strong> {order.phoneNumber}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <strong>Amount:</strong> ${order.amount}
                  </p>
                  <div className="space-y-2">
                    {order.cartItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="p-2 border border-gray-200 rounded-md">
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                          <strong>Item Name:</strong> {item.name}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                          <strong>Price:</strong> ${item.price}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                          <strong>Quantity:</strong> {item.quantity}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                          <strong>Colors:</strong> {item.colors.join(', ')}
                        </p>
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                          <strong>Sizes:</strong> {item.sizes.join(', ')}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                No orders found for this user.
              </p>
            )}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AllUsers;
