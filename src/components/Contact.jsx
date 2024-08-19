import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";

const validationSchema = yup.object({
  from_name: yup.string().required("Name is required"),
  user_email: yup.string().email("Invalid email format").required("Email is required"),
  message: yup.string().required("Message is required"),
});

function Contact() {
  const formik = useFormik({
    initialValues: {
      from_name: "",
      user_email: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      emailjs
        .sendForm("service_niluuxt", "template_v201iiq", "#contactForm", {
          publicKey: "vVyEa1ls4aehnS_Xs",
        })
        .then(
          (response) => {
            toast.success("Successfully Sent");
            resetForm();
          },
          (error) => {
            toast.error("Failed to send message");
          }
        );
    },
  });

  return (
   <>
   <Navbar/>
    <div className="flex justify-center items-center p-8 bg-gray-100">
      <form
        id="contactForm"
        className="w-[65vw] h-auto bg-gray-200 p-8 shadow-lg flex flex-col gap-6"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center font-bold text-4xl">Contact Us</h1>

        <div className="flex flex-col">
          <label htmlFor="from_name" className="text-lg font-semibold mb-2">Name</label>
          <input
            type="text"
            name="from_name"
            id="from_name"
            className={`p-2 border border-gray-300 ${formik.errors.from_name && formik.touched.from_name ? "border-red-500" : "focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
            placeholder="Enter your name"
            value={formik.values.from_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.from_name && formik.touched.from_name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.from_name}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="user_email" className="text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            className={`p-2 border border-gray-300 ${formik.errors.user_email && formik.touched.user_email ? "border-red-500" : "focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
            placeholder="Enter your email"
            value={formik.values.user_email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.user_email && formik.touched.user_email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.user_email}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="text-lg font-semibold mb-2">Message</label>
          <textarea
            name="message"
            id="message"
            className={`p-2 border border-gray-300 ${formik.errors.message && formik.touched.message ? "border-red-500" : "focus:outline-none focus:ring-2 focus:ring-blue-500"}`}
            placeholder="Enter your message"
            rows="4"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.errors.message && formik.touched.message && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-slate-300 p-2 shadow-lg transition duration-300 mt-4"
        >
          Send
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default Contact;
