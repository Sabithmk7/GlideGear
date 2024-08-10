import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function displayCartItems() {
      try {
        const userId = localStorage.getItem("id");
        const res = await axios.get(`http://localhost:3001/users/${userId}`);
        const cartList = res.data.cart;
        setCartItems(cartList);

        const initialSizes = {};
        const initialQuantities = {};
        cartList.forEach((item) => {
          initialSizes[item.id] = item.sizes[0];
          initialQuantities[item.id] = item.quantity || 1; // Set default quantity if not present
        });
        setSelectedSizes(initialSizes);
        setQuantities(initialQuantities);
      } catch (error) {
        toast.warning("Something went wrong");
        console.log(error);
      }
    }
    displayCartItems();
  }, []);

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: size,
    }));
  };

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * (quantities[item.id] || 1), 0).toFixed(2);
  };

  function handleCheckout() {
    const totalAmount = calculateTotal(); // Calculate the total amount
    navigate('/checkout', { state: { cartItems, selectedSizes, quantities, totalAmount } });
  }

  async function handleRemove(item) {
    try {
      // Remove item from local state
      const updatedCartItems = cartItems.filter(x => x.id !== item.id);
      setCartItems(updatedCartItems);

      // Get user ID
      const userId = localStorage.getItem("id");

      // Patch updated cart to backend
      await axios.patch(`http://localhost:3001/users/${userId}`, {
        cart: updatedCartItems
      });

      toast.success("Item removed from cart");
    } catch (error) {
      toast.warning("Failed to remove item from cart");
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-100 p-4 md:p-8 lg:p-16 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg text-center">Your cart is empty</p>
        ) : (
          <ul className="space-y-6 flex flex-col">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white shadow-lg p-4 md:w-full h-auto"
              >
                <img
                  className="w-48 h-48 object-cover"
                  src={item.image}
                  alt={item.name}
                />
                <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-3 text-left flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600 flex-grow">{item.description}</p>
                  <div className="flex items-center gap-2">
                    <label className="font-semibold">Size:</label>
                    <select
                      value={selectedSizes[item.id]}
                      onChange={(e) => handleSizeChange(item.id, e.target.value)}
                      className="p-2 border-2"
                    >
                      {item.sizes.map((size, i) => (
                        <option key={i} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="font-semibold">Quantity:</label>
                    <select
                      value={quantities[item.id] || 1}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="p-2 border-2"
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-gray-600">
                    <span className="text-black">Color:</span> {item.colors[0]}
                  </p>
                  <p>Rating: {item.rating}</p>
                  <p className="text-lg font-bold">Price: ${item.price * (quantities[item.id] || 1)}</p>
                </div>
                <div>
                  <MdDelete onClick={() => handleRemove(item)} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="w-full md:w-1/3 lg:w-1/4 mt-16">
          <div className="bg-white shadow-lg p-6">
            <h1 className="text-2xl md:text-3xl px-3">Summary</h1>
            <p className="border-b-2 border-gray-500 px-3 py-4 flex justify-between">
              <span>Total</span> <span>${calculateTotal()}</span>
            </p>
            <button
              onClick={handleCheckout}
              className="border-2 shadow-lg w-full h-12 mt-4 font-semibold"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;