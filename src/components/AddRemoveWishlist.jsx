import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addRemoveWishlist, getWishList } from "../Redux/Slices/WishListSlice";
import { useDispatch } from "react-redux";

function AddRemoveWishlist({ id }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  function handleWishlist(productId) {
    dispatch(addRemoveWishlist(productId));
    dispatch(getWishList());
  }
  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };
  return (
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
  );
}

export default AddRemoveWishlist;
