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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white shadow-xl rounded-lg overflow-hidden p-4 transition-transform transform hover:scale-105 cursor-pointer" 
              onClick={() => handleCardClick(product)} 
            >
              <img 
                src={product.productImage} 
                alt={product.title} 
                className="w-full h-40 object-cover mb-4 rounded-md" 
              />
              <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
              <p className="text-lg font-bold text-blue-600 mt-2">₹{product.price}</p>
              

              <div className="flex justify-between mt-4">
                <button
                  className="flex-1 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition mr-2" 
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
                  className="flex-1 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition ml-2" 
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
