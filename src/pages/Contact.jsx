import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_niluuxt", "template_v201iiq", form.current, {
        publicKey: "vVyEa1ls4aehnS_Xs",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Succesfully Sent")
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="flex justify-center items-center  p-8 bg-gray-100">
       
      <form
        className="w-[65vw] h-[75vh]  bg-gray-200 p-8  shadow-lg flex flex-col gap-6"
        ref={form}
        onSubmit={sendEmail}
      > <h1 className="text-center font-bold text-4xl">Contact Us</h1>
        <div className="flex flex-col">
          <label htmlFor="name" className="text-lg font-semibold mb-2">Name</label>
          <input
            type="text"
            name="from_name"
            id="name"
            className="p-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg font-semibold mb-2">Email</label>
          <input
            type="email"
            name="user_email"
            id="email"
            className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="message" className="text-lg font-semibold mb-2">Message</label>
          <textarea
            name="message"
            id="message"
            className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your message"
            rows="4"
            required
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="w-full  bg-slate-300 p-2 shadow-lg transition duration-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Contact;
