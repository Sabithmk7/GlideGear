import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addRemoveWishlist, getWishList } from "../Redux/Slices/WishListSlice";

function Collection() {
  const [data, setData] = useState([]);
  const { products } = useSelector((state) => state.product);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(products);
    dispatch(getWishList());
  }, [products, dispatch]);

  const handleWishlist = (productId) => {
    dispatch(addRemoveWishlist(productId));
    dispatch(getWishList());
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  return (
    <>
      <Navbar />
      <div className="p-4 sm:p-6 md:p-8 lg:p-16 xl:p-32 bg-gray-200">
        <div className="py-4 flex gap-4">
          <div className="w-6 bg-black h-10 rounded"></div>
          <h1 className="text-2xl md:text-3xl font-bold">All Shoes</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              className="relative p-4 border border-gray-200 rounded-lg bg-white shadow-md text-center transition-transform transform hover:scale-105"
            >
              <Link to={`/product/${item.id}`} className="block">
                <img
                  src={item.productImage}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-4 transition-transform transform hover:scale-105"
                />
              </Link>
              <button
                onClick={() => handleWishlist(item.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg"
              >
                {isProductInWishlist(item.id) ? (
                  <AiFillHeart size={24} className="text-red-500" />
                ) : (
                  <AiOutlineHeart size={24} className="text-gray-500" />
                )}
              </button>
              <div className="relative mt-2">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Collection;
