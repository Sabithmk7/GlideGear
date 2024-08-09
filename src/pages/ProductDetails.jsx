import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/products/${id}`);
        setProducts(res.data);
        setError(null);
      } catch (error) {
        setError("Error fetching product details");
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (error)
    return (
      <p className="h-[65vh] w-[98vw] flex items-center justify-center text-4xl font-bold">
        {error}
      </p>
    );
  if (!products) return <p>Loading...</p>;

  function handleNavigate() {
    toast.success("Item added to cart")
  }

  function handleBuy() {
    navigate("/buy-now");
  }

  return (
    <div className="bg-gray-200 p-4 md:p-8 flex justify-center items-center">
      <div className="h-auto md:h-[80vh] w-full md:w-[70vw] shadow-lg bg-gray-100 flex flex-col md:flex-row items-center justify-around p-4 md:p-8">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <img
            className="shadow-lg h-[40vh] w-full md:h-[70vh] md:w-full object-contain transition-transform duration-300 hover:scale-110"
            src={products.image}
            alt={products.name}
          />
        </div>
        <div className="w-full md:w-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-1">{products.name}</h1>
          <p>{products.description}</p>
          <div className="mt-3 text-gray-500">
            <p>Category : {products.category}</p>
            <p>Color : {products.colors[0]}</p>
            <p>Rating : {products.rating}</p>
          </div>
          <button
            onClick={handleNavigate}
            className="border-gray-300 border-2 p-3 shadow-lg w-full mt-6"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuy}
            className="border-gray-300 border-2 p-3 shadow-lg w-full mt-6"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
