import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function WomenPage() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6; 
  const[records,setRecords]=useState([])

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products");
        const womenItems = res.data.filter(product => product.category === "Women");
        setRecords(womenItems)
        setData(womenItems);
        setTotalPages(Math.ceil(womenItems.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching women's products:", error);
      }
    };

    fetchWomenProducts();
  }, []);


  const paginatedProducts = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  function handleSearch(e){
    setData(records.filter(value=>value.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <div className="p-4 sm:p-8 md:p-16 lg:p-32 bg-gray-200">
      <div className="py-4 flex justify-between"><h1 className="text-2xl md:text-3xl font-bold ">Women's Products</h1>
      <input className="border shadow-md h-14 w-64 border-gray-400 p-4" placeholder="Search Shoe" type="text" onChange={handleSearch} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
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
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WomenPage;
