import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MenPage() {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products");
        const menItems = res.data.filter(product => product.category === "Men");
        setRecords(menItems);
        setData(menItems);
      } catch (error) {
        console.error("Error fetching men's products:", error);
      }
    };

    fetchdata();
  }, []);

  function handleSearch(e) {
    setData(records.filter(value => value.name.toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <div className="p-4 sm:p-8 md:p-16 lg:p-32 bg-gray-200">
      <div className="py-4 flex justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Men's Products</h1>
        <input
          className="border shadow-md h-14 w-64 border-gray-400 p-4"
          placeholder="Search Shoe"
          type="text"
          onChange={handleSearch}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="px-4 sm:px-6 py-4 sm:py-8">
              <h2 className="text-lg sm:text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MenPage;
