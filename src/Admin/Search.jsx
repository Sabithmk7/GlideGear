import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function Search({ results }) {
  const [item, setItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product) => {
    setItem(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItem(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2 text-gray-800">Search Results</h2>
      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li
              key={index}
              className="flex items-center p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
              onClick={() => handleOpenModal(result)}
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-700 truncate">{result.name}</h3>
                <p className="text-gray-600 truncate">{result.description}</p>
              </div>
              <div className="ml-4">
                <img
                  src={result.image} // Assuming there's an image property
                  alt={result.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No results found.</p>
      )}

      {isModalOpen && item && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-screen p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 truncate">{item.name}</h2>
              <button onClick={handleCloseModal} className="text-gray-600 hover:text-gray-800">
                <AiOutlineClose size={24} />
              </button>
            </div>
            <img
              src={item.image} // Assuming there's an image property
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-gray-700 mb-4">{item.description}</p>
            <p className="text-gray-900 font-semibold mb-2">${item.price}</p>
            <p className="text-gray-700 mb-2">Brand: {item.brand}</p>
            <p className="text-gray-700 mb-2">Category: {item.category}</p>
            <p className="text-gray-700 mb-2">Rating: {item.rating} ★</p>
            <div className="mb-4">
              <h4 className="text-gray-800 font-semibold mb-2">Available Sizes:</h4>
              <ul className="list-disc list-inside pl-5 text-gray-700">
                {item.sizes.map((size, index) => (
                  <li key={index} className="mb-1">{size}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
