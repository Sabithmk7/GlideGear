import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from 'react-icons/md'; 
import { Link } from 'react-router-dom'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { addRemoveWishlist, getWishList } from '../Redux/Slices/WishListSlice';

function WhishList() {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const handleDelete = (itemId) => {
    dispatch(addRemoveWishlist(itemId));
    dispatch(getWishList());
  };

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-500">Your wishlist is currently empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md relative">
                <Link 
                  to={`/product/${item.productId}`} // Adjust the path to match your routing setup
                  className="block" // Ensures that the link covers the entire card area
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-semibold mb-1">{item.productName}</h2>
                  <p className="text-gray-600 text-sm">{item.categoryName}</p>
                  <p className="text-gray-800 font-bold mt-2">${item.price}</p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                    {item.productDescription}
                  </p>
                </Link>
                <button 
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(item.productId)}
                  aria-label="Delete item" 
                >
                  <MdDelete size={24} />
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

export default WhishList;
