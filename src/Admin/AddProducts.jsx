import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    image: '',
    category: 'Men',
    sizes: [],
    colors: [],
    rating: '',
    bestseller: false,
  });

  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSizeAdd = () => {
    if (sizeInput && !product.sizes.includes(Number(sizeInput))) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        sizes: [...prevProduct.sizes, Number(sizeInput)],
      }));
      setSizeInput('');
    }
  };

  const handleColorAdd = () => {
    if (colorInput && !product.colors.includes(colorInput)) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        colors: [...prevProduct.colors, colorInput],
      }));
      setColorInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/products', product);
      toast.success('Product added successfully!');
      setProduct({
        name: '',
        brand: '',
        price: '',
        description: '',
        image: '',
        category: 'Men',
        sizes: [],
        colors: [],
        rating: '',
        bestseller: false,
      });
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product');
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-4xl  mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            placeholder="Enter product name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            placeholder="Enter brand name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            step="0.01"
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            rows="4"
            placeholder="Enter product description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            placeholder="Enter image URL"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sizes</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              className="block border border-gray-300 rounded-md shadow-sm px-3 py-2"
              placeholder="Enter size"
            />
            <button
              type="button"
              onClick={handleSizeAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Size
            </button>
          </div>
          <div className="mt-2">
            {product.sizes.map((size, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded px-2 py-1 mr-2 mb-2 text-sm">
                {size}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Colors</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              className="block border border-gray-300 rounded-md shadow-sm px-3 py-2"
              placeholder="Enter color"
            />
            <button
              type="button"
              onClick={handleColorAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Color
            </button>
          </div>
          <div className="mt-2">
            {product.colors.map((color, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded px-2 py-1 mr-2 mb-2 text-sm">
                {color}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="bestseller"
              checked={product.bestseller}
              onChange={handleChange}
              className="mr-2"
            />
            Bestseller
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            step="0.1"
            min="0"
            max="5"
            placeholder="Enter rating"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
