// ProductDetailModal.js
import React from 'react';

const ProductDetailModal = ({ product, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-semibold text-gray-800">{product.title}</h2>
        <img 
          src={product.productImage} 
          alt={product.title} 
          className="w-full h-48 object-cover rounded-md mb-4" 
        />
        <p className="text-gray-600 mb-2">{product.description}</p>
        <p className="text-sm font-medium text-gray-500">Category: <span className="font-normal">{product.category}</span></p>
        <p className="text-lg font-bold text-blue-600 mt-2">Price: ₹{product.price}</p>
        <button 
          className="mt-4 py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;
