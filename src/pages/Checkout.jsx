import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
const Checkout = () => {
  const navigate=useNavigate();
  const [raz, setRaz] = useState(null);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const { cart } = useSelector(state => state.cart);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formik = useFormik({
    initialValues: {
      CustomerName: '',
      CustomerEmail: '',
      CustomerPhone: '',
      CustomerCity: '',
      HomeAddress: ''
    },
    onSubmit: async (values) => {
      if (!isRazorpayLoaded) {
        const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        setIsRazorpayLoaded(scriptLoaded);

        if (!scriptLoaded) {
          toast.error("Failed to load payment gateway. Please try again later.");
          return;
        }
      }

      try {
        const res = await axios.post(
          `https://localhost:7295/api/Order/Order-create?price=${totalPrice}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
        
        const orderId = res.data;
        console.log(orderId)

        const options = {
          amount: totalPrice,
          currency: "INR",
          name: "GlideGear",
          description: "Order Payment",
          order_id: orderId,
          handler: async function (response) {
            console.log(response);

            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            setRaz(paymentData);

            try {
              await axios.post(
                "https://localhost:7295/api/Order/payment",
                paymentData,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                }
              );

              await axios.post(
                "https://localhost:7295/api/Order/place-order",
                {
                  ...values,
                  Total: totalPrice,
                  orderString: response.razorpay_order_id,
                  transactionId: response.razorpay_payment_id
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                  }
                }
              );
              toast.success("Order placed successfully!");
              navigate("/");
            } catch (error) {
              console.error("Payment verification failed", error);
              toast.error("Payment verification failed. Please try again.");
            }
          },
          prefill: {
            name: values.CustomerName,
            email: values.CustomerEmail,
            contact: values.CustomerPhone
          },
          theme: {
            color: "#3399cc"
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Error creating order", error);
        toast.error("Error creating order. Please try again.");
      }
    }
  });


  return (
    <>
      <Navbar/>
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
      <Footer/>
    </>
  );
};

export default Checkout;
