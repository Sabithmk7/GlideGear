import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowDetailsModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setShowDetailsModal(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
    });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    const values = value.split(",").map((v) => v.trim());
    setSelectedProduct({
      ...selectedProduct,
      [name]: values,
    });
  };

  const handleCategoryChange = (e) => {
    setSelectedProduct({
      ...selectedProduct,
      category: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:3001/products/${selectedProduct.id}`,
        selectedProduct
      );
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id ? selectedProduct : product
        )
      );
      toast.success("Product updated successfully!");
      handleModalClose();
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold ">Product List</h1>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className=" p-2 border rounded "
        />
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded cursor-pointer hover:shadow-lg"
              onClick={() => handleCardClick(product)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover mb-2"
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(product);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(product.id);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={selectedProduct.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={selectedProduct.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={selectedProduct.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={selectedProduct.image}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={selectedProduct.category}
                  onChange={handleCategoryChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="bestseller"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bestseller
                </label>
                <select
                  id="bestseller"
                  name="bestseller"
                  value={selectedProduct.bestseller}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      bestseller: e.target.value === "true",
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="sizes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sizes (comma separated)
                </label>
                <input
                  type="text"
                  id="sizes"
                  name="sizes"
                  value={selectedProduct.sizes.join(",")}
                  onChange={handleArrayChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="colors"
                  className="block text-sm font-medium text-gray-700"
                >
                  Colors (comma separated)
                </label>
                <input
                  type="text"
                  id="colors"
                  name="colors"
                  value={selectedProduct.colors.join(",")}
                  onChange={handleArrayChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={selectedProduct.rating}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p>Price: ${selectedProduct.price}</p>
            <p>Category: {selectedProduct.category}</p>
            <p>Bestseller: {selectedProduct.bestseller ? "Yes" : "No"}</p>
            <p>Sizes: {selectedProduct.sizes.join(", ")}</p>
            <p>Colors: {selectedProduct.colors.join(", ")}</p>
            <p>Rating: {selectedProduct.rating}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleModalClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProducts;
