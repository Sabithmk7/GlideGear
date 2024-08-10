import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({}); 

  useEffect(() => {
    async function displayCartItems() {
      try {
        const userId = localStorage.getItem("id");
        const res = await axios.get(`http://localhost:3001/users/${userId}`);
        const cartList = res.data.cart;
        setCartItems(cartList);

        
        const initialSizes = {};
        cartList.forEach((item) => {
          initialSizes[item.id] = item.sizes[0];
        });
        setSelectedSizes(initialSizes);
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

  return (
    <div className="bg-gray-100 p-16">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <ul className="space-y-6 flex flex-col items-center">
        {cartItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg w-[50vw] h-[40vh]"
          >
            <img
              className="w-48 h-48 rounded-md"
              src={item.image}
              alt={item.name}
            />
            <div className="ml-6 flex flex-col gap-3">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <div>
                <label className="font-semibold">Size:</label>
                <select
                  value={selectedSizes[item.id]}
                  onChange={(e) => handleSizeChange(item.id, e.target.value)}
                  className="ml-2 p-2 border-2 rounded-md"
                >
                  {item.sizes.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-gray-600">
                <span className="text-black">Color:</span> {item.colors[0]}
              </p>
              <p>Rating : {item.rating}</p>
              <p className="text-lg font-bold">Price : ${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
