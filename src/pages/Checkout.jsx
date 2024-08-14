import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

// Define the validation schema with yup
const validationSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postalCode: yup.string().required("Postal code is required").min(6,"Minimum 6 digits required").max(6,'Maximum 6 digits'),
  phoneNumber: yup.string().required("Phone number is required").min(10,'Minimum 10 digits required').max(10,'Maximum 10 digits'),
  paymentMethod: yup.string().required("Payment method is required"),
});

function Checkout() {
  const location = useLocation();
  const { cartItems, selectedSizes, quantities, totalPrice } = location.state;

  const formik = useFormik({
    initialValues: {
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phoneNumber: "",
      paymentMethod: "",
    },
    validationSchema, 
    onSubmit: async (values) => {
      const orderDetails = {
        ...values,
        cartItemsId: cartItems.map((item) => item.id),
        quantities,
        amount: totalPrice,
      };
      try {
        const userId = localStorage.getItem("id");
        await axios.patch(`http://localhost:3001/users/${userId}`, {
          orderDetails,
        });
        toast.success("Order Successful");
        formik.resetForm();
      } catch (error) {
        console.log(error);
        toast.error("Order failed");
      }
    },
  });

  return (
    <div className="bg-gray-100 p-4 md:p-8 lg:p-16 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout Form</h1>
        <form
          className="bg-white shadow-lg p-6 space-y-6"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <label htmlFor="fullName" className="block font-semibold">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your full name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              required
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="text-red-500 text-sm">{formik.errors.fullName}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="address" className="block font-semibold">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              required
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm">{formik.errors.address}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="city" className="block font-semibold">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              required
            />
            {formik.touched.city && formik.errors.city ? (
              <div className="text-red-500 text-sm">{formik.errors.city}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="postalCode" className="block font-semibold">
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="number"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your postal code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postalCode}
              required
            />
            {formik.touched.postalCode && formik.errors.postalCode ? (
              <div className="text-red-500 text-sm">{formik.errors.postalCode}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block font-semibold">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="number"
              className="mt-2 p-2 border-2 w-full"
              placeholder="Enter your phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              required
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
            ) : null}
          </div>
          <div className="flex flex-col gap-4">
            <span className="block font-semibold">Payment Options:</span>
            <div>
              <input
                id="paymentUpi"
                name="paymentMethod"
                type="radio"
                value="UPI"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.paymentMethod === "UPI"}
                required
              />
              <label htmlFor="paymentUpi" className="ml-2">
                UPI
              </label>
            </div>
            <div>
              <input
                id="paymentCard"
                name="paymentMethod"
                type="radio"
                value="Card"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.paymentMethod === "Card"}
                required
              />
              <label htmlFor="paymentCard" className="ml-2">
                Card
              </label>
            </div>
            <div>
              <input
                id="paymentAccount"
                name="paymentMethod"
                type="radio"
                value="Account"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.paymentMethod === "Account"}
                required
              />
              <label htmlFor="paymentAccount" className="ml-2">
                Account
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full border-2 border-gray-400 shadow-lg py-2 font-semibold"
          >
            Place Order
          </button>
        </form>
      </div>

      <div className="w-full md:w-1/3 lg:w-1/4">
        <div className="bg-white shadow-lg p-6">
          <h1 className="text-2xl md:text-3xl px-3">Summary</h1>
          <ul className="mt-4 space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <img
                    className="w-24 h-24 object-cover"
                    src={item.image}
                    alt={item.name}
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">
                      Size: {selectedSizes[item.id]}
                    </p>
                    <p className="text-gray-600">Color: {item.colors[0]}</p>
                    <p className="text-gray-600">
                      Quantity: {quantities[item.id] || 1}
                    </p>
                    <p className="text-lg font-bold">
                      ${item.price * (quantities[item.id] || 1)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="border-t-2 border-gray-500 px-3 py-4 flex justify-between mt-6">
            <span>Total</span> <span>${totalPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
