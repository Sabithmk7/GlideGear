import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {  updateProduct } from '../../Redux/Slices/ProductSlice';


function EditProductModal({ product, closeModal }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      image: null,
      categoryId: product.categoryId,
    },
    onSubmit: (values) => {
      dispatch(updateProduct({ productId: product.id, values: values }));
      closeModal(); 
    },
  });

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              accept="image/*"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category ID</label>
            <input
              type="number"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-2 px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;
