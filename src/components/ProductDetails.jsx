import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../Redux/Slices/CartSlice";
import { toast } from 'react-toastify';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchProductById } from "../Redux/Slices/ProductSlice";

function ProductDetails() {
  const { id } = useParams();
  const { error, cart } = useSelector((state) => state.cart);
  const { product } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // console.log(cart)
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // useEffect(() => {
  //   if (error==null) {
  //     toast.success("Added to cart succesfully")
  //   }else{
  //     toast.error(error); // Display the error message in a toast notification
  //   }
  // }, [error]);

  const handleAddToCart = () => {
    dispatch(AddToCart(product.id));
  };

  if (!product) return <p className="text-center">No Products available</p>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 p-4 md:p-8 flex justify-center items-center min-h-screen">
        <div className="h-full w-full md:w-[80vw] lg:w-[70vw] bg-white shadow-lg flex flex-col md:flex-row items-center justify-between p-8 gap-6 rounded-lg border border-gray-200">
          <div className="flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
            <img
              className="h-[60vh] w-full object-contain rounded-lg"
              src={product.productImage}
              alt={product.title}
            />
          </div>
          <div className="flex-grow text-center md:text-left w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-semibold mb-2">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="text-gray-800 mb-4">
              <p className="text-lg font-bold">Price: ${product.price}</p>
              <p>Category: {product.category}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white font-medium p-4 rounded hover:bg-blue-700 transition w-full md:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
