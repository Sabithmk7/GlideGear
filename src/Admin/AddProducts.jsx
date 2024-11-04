import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { addProduct } from "../Redux/Slices/ProductSlice";

const AddProduct = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      img: null,
      categoryId: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("image", values.img); 
      formData.append("categoryId", values.categoryId);

      dispatch(addProduct(formData));


    },
  });

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">
        Add New Product
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            placeholder="Enter product title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            rows="4"
            placeholder="Enter product description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            placeholder="Enter price"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="img"
            onChange={(e) => formik.setFieldValue("img", e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            accept="image/*"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category ID
          </label>
          <input
            type="number"
            name="categoryId"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2"
            placeholder="Enter category ID"
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
