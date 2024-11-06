import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditProductModal from './EditProductModal';
import ProductDetailModal from './ProductDetailModal'; 
import { deleteProduct } from '../../Redux/Slices/ProductSlice';

function EditProducts() {
  const { products } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [productDetail, setProductDetail] = useState(null); 

  const handleEditClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCardClick = (product) => {
    setProductDetail(product);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
  };

  const closeDetailModal = () => {
    setProductDetail(null);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Manage Your Products</h1>
      
      {products.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No products available. Please add some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              onClick={() => handleCardClick(product)} 
            >
              <img 
                src={product.productImage} 
                alt={product.title} 
                className="w-full h-48 object-cover mb-4 rounded-t-lg" 
              />
              <div className="px-4 py-2">
                <h2 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h2>
                <p className="text-xl font-semibold text-green-600 mt-2">₹{product.price}</p>
              </div>

              <div className="flex justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                <button
                  className="w-full py-2 text-sm font-semibold text-white bg-indigo-500 rounded-l-lg hover:bg-indigo-600 transition-all"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleEditClick(product);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    dispatch(deleteProduct(product.id));
                  }}
                  className="w-full py-2 text-sm font-semibold text-white bg-red-500 rounded-r-lg hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          closeModal={closeEditModal}
        />
      )}

      {productDetail && (
        <ProductDetailModal
          product={productDetail}
          closeModal={closeDetailModal}
        />
      )}
    </div>
  );
}

export default EditProducts;
