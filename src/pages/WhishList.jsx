import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addRemoveWishlist, getWishList } from "../Redux/Slices/WishListSlice";
import { addToCart } from "../Redux/Slices/CartSlice";

function WishList() {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch]);

  const handleDelete = (itemId) => {
    dispatch(addRemoveWishlist(itemId));
    dispatch(getWishList());
  };

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-500">
            Your wishlist is currently empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg relative hover:shadow-xl transition-shadow"
              >
                <Link to={`/product/${item.productId}`} className="block mb-4">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.productName}
                  </h2>
                  <p className="text-gray-500 text-sm mb-1">
                    {item.categoryName}
                  </p>
                  <p className="text-gray-900 font-bold text-lg mt-1">
                    ₹{item.price}
                  </p>
                </Link>

                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => handleDelete(item.productId)}
                  aria-label="Delete item"
                >
                  <MdDelete size={24} />
                </button>

                <button
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition-colors"
                  onClick={() => handleAddToCart(item.productId)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default WishList;
