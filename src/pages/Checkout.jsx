import axios from "axios";
import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Updated validation schema with required fields
const validationSchema = yup.object({
  CustomerName: yup.string().required("Customer name is required"),
  CustomerEmail: yup.string().email("Invalid email format").required("Customer email is required"),
  CustomerPhone: yup
    .string()
    .required("Customer phone is required")
    .min(10, "Minimum 10 digits required")
    .max(10, "Maximum 10 digits"),
  CustomerCity: yup.string().required("Customer city is required"),
  HomeAddress: yup.string().required("Home address is required"),
});

function Checkout() {
  const formik = useFormik({
    initialValues: {
      CustomerName: "",
      CustomerEmail: "",
      CustomerPhone: "",
      CustomerCity: "",
      HomeAddress: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try{
        
      }catch(error){

      }
      // try {
      //   const userId = localStorage.getItem("id");
      //   const orderId = `ORD-${Date.now()}`;
      //   const newOrder = {
      //     orderId,
      //     ...values,
      //   };
        
      //   await axios.patch(`http://localhost:3001/users/${userId}`, {
      //     orders: [...orders, newOrder],
      //   });
        
      //   toast.success("Order placed successfully!");
      //   formik.resetForm();
      // } catch (error) {
      //   console.error("Order failed", error);
      //   toast.error("Order failed");
      // }
    },
  });

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 p-4 md:p-8 lg:p-16 flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout Form</h1>
          <form
            className="bg-white shadow-lg p-6 space-y-6"
            onSubmit={formik.handleSubmit}
          >
            <div>
              <label htmlFor="CustomerName" className="block font-semibold">
                Customer Name
              </label>
              <input
                id="CustomerName"
                name="CustomerName"
                type="text"
                className="mt-2 p-2 border-2 w-full"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.CustomerName}
                required
              />
              {formik.touched.CustomerName && formik.errors.CustomerName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.CustomerName}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="CustomerEmail" className="block font-semibold">
                Customer Email
              </label>
              <input
                id="CustomerEmail"
                name="CustomerEmail"
                type="email"
                className="mt-2 p-2 border-2 w-full"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.CustomerEmail}
                required
              />
              {formik.touched.CustomerEmail && formik.errors.CustomerEmail ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.CustomerEmail}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="CustomerPhone" className="block font-semibold">
                Customer Phone
              </label>
              <input
                id="CustomerPhone"
                name="CustomerPhone"
                type="text"
                className="mt-2 p-2 border-2 w-full"
                placeholder="Enter your phone number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.CustomerPhone}
                required
              />
              {formik.touched.CustomerPhone && formik.errors.CustomerPhone ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.CustomerPhone}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="CustomerCity" className="block font-semibold">
                Customer City
              </label>
              <input
                id="CustomerCity"
                name="CustomerCity"
                type="text"
                className="mt-2 p-2 border-2 w-full"
                placeholder="Enter your city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.CustomerCity}
                required
              />
              {formik.touched.CustomerCity && formik.errors.CustomerCity ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.CustomerCity}
                </div>
              ) : null}
            </div>
            <div>
              <label htmlFor="HomeAddress" className="block font-semibold">
                Home Address
              </label>
              <input
                id="HomeAddress"
                name="HomeAddress"
                type="text"
                className="mt-2 p-2 border-2 w-full"
                placeholder="Enter your address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.HomeAddress}
                required
              />
              {formik.touched.HomeAddress && formik.errors.HomeAddress ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.HomeAddress}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full border-2 border-gray-400 shadow-lg py-2 font-semibold"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
