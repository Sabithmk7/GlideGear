import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { handleAddCart } from "../Context/HandleCart";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { UserContext } from "../App";

function ProductDetails() {
  const { fetchCart } = useContext(UserContext);
  const { id } = useParams();
  const [product, setproduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/products/${id}`);
        setproduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async (product) => {
    await handleAddCart(product);
    await fetchCart();
  };

  if (!product) return <p>No Products available</p>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-200 p-4 md:p-8 flex justify-center items-center">
        <div className="h-auto md:h-[80vh] w-full md:w-[70vw] shadow-lg bg-gray-100 flex flex-col md:flex-row items-center justify-around p-4 md:p-8 gap-6">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <img
              className="shadow-lg h-[40vh] w-full md:h-[70vh] md:w-full object-contain "
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className="w-full md:w-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-1">
              {product.name}
            </h1>
            <p>{product.description}</p>
            <div className="mt-3 text-gray-500">
              <p className="text-black">Price : $ {product.price}</p>
              <p>Category : {product.category}</p>
              <p>Color : {product.colors[0]}</p>
              <p>Rating : {product.rating}</p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="border-gray-300 border-2 p-3 shadow-lg w-full mt-6"
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
