import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function Collection() {
  const [data, setData] = useState([]);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    setData(products);
  }, [products]);

  return (
    <>
      <Navbar />
      <div className="p-4 sm:p-6 md:p-8 lg:p-16 xl:p-32 bg-gray-200">
        <div className="py-4 flex justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">All Products</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="relative p-4 border border-gray-200 rounded-lg bg-white shadow-md text-center transition-transform transform hover:scale-105"
            >
              <img
                src={item.productImage}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4 transition-transform transform hover:scale-105"
              />
              <div className="relative">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Collection;
