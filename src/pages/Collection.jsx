import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Collection() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [records,setRecords]=useState([])
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3001/products`);
        console.log("Fetched Data:", res.data);
        const allData = res.data;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedData = allData.slice(
          startIndex,
          startIndex + itemsPerPage
        );
        setRecords(paginatedData)
        setData(paginatedData);
        setTotalPages(Math.ceil(allData.length / itemsPerPage));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  function handleSearch(e){
    setData(records.filter(value=>value.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-16 xl:p-32 bg-gray-200">
      <div className="py-4 flex justify-between"><h1 className="text-2xl md:text-3xl font-bold ">All Products</h1>
      <input className="border shadow-md h-14 w-64 border-gray-400 p-4" placeholder="Search Shoe" type="text" onChange={handleSearch} />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.length > 0 ? (
              data.map((item) => (
                <Link
                  to={`/product/${item.id}`}
                  key={item.id}
                  className="relative bg-white shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 "
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 md:h-56 lg:h-64 object-cover"
                  />
                  <div className="px-4 py-6">
                    <h2 className="text-lg md:text-xl font-semibold">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mt-2">${item.price}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p>No products available.</p>
            )}
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Collection;
