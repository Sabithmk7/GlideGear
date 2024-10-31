import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchUsers() {
    try {
      const res = await axios.get("http://localhost:3001/users");
      const nonAdminUsers = res.data.filter((user) => !user.admin);
      setUsers(nonAdminUsers);
      setFilteredUsers(nonAdminUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtere = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtere);
  }, [searchQuery, users]);

  async function handleBlockUser(userId) {
    try {
      await axios.patch(`http://localhost:3001/users/${userId}`, {
        blocked: true,
      });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, blocked: true } : user
        )
      );
      toast.success("User blocked successfully");
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Error blocking user");
    }
  }

  async function handleUnblockUser(userId) {
    try {
      await axios.patch(`http://localhost:3001/users/${userId}`, {
        blocked: false,
      });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, blocked: false } : user
        )
      );
      toast.success("User unblocked successfully");
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Error unblocking user");
    }
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded "
        />
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`bg-white p-4 shadow-md rounded-lg border border-gray-200 cursor-pointer `}
                onClick={() => handleUserClick(user)}
              >
                <div className="mb-4">
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  {!user.blocked ? (
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBlockUser(user.id);
                      }}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnblockUser(user.id);
                      }}
                    >
                      Unblock
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No users found</p>
          )}
        </div>
      )}
      {openModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-2xl mx-4 max-h-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium">
                {selectedUser.name}'s Order Details
              </h3>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto max-h-96">
              {selectedUser.orders && selectedUser.orders.length > 0 ? (
                selectedUser.orders.map((order, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 mb-4 text-gray-600"
                  >
                    <p className="text-base">
                      <strong>Order ID:</strong> {order.orderId}
                    </p>
                    <p className="text-base">
                      <strong>Full Name:</strong> {order.fullName}
                    </p>
                    <p className="text-base">
                      <strong>Address:</strong> {order.address}, {order.city},{" "}
                      {order.postalCode}
                    </p>
                    <p className="text-base">
                      <strong>Phone Number:</strong> {order.phoneNumber}
                    </p>
                    <p className="text-base">
                      <strong>Payment Method:</strong> {order.paymentMethod}
                    </p>
                    <p className="text-base">
                      <strong>Amount:</strong> ${order.amount}
                    </p>
                    <div className="space-y-2">
                      {order.cartItems.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="p-2 border border-gray-200 rounded-md"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <p className="text-sm leading-relaxed">
                            <strong>Item Name:</strong> {item.name}
                          </p>
                          <p className="text-sm leading-relaxed">
                            <strong>Price:</strong> ${item.price}
                          </p>
                          <p className="text-sm leading-relaxed">
                            <strong>Quantity:</strong> {item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-base leading-relaxed text-gray-500">
                  No orders found for this user.
                </p>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 text-right">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setOpenModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUsers;
