
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function BestSeller() {
  const{products}=useContext(UserContext)
  const bestsellers = products.filter(item => item.bestseller);
  return (
    <div className="p-32">
      <h1 className="text-3xl font-bold py-4">Our Best Seller</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {bestsellers.slice(0, 7).map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className="relative bg-white shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="px-6 py-8">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
            {item.bestseller && (
              <span className="absolute top-0 left-0 bg-yellow-500 text-white px-2 py-1 text-xs font-bold">
                Bestseller
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
