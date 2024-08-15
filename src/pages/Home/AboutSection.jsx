import React from "react";
import aboutImage from "../../assets/aboutImg.jpg";
import { useNavigate } from "react-router-dom";

function AboutSection() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center py-12 px-20 ">
      <div className="flex-1 mb-6 md:mb-0 md:mr-8">
        <img
          src={aboutImage}
          alt="About Us"
          className="w-[80%] h-auto object-cover shadow-lg transition-transform duration-300 hover:scale-110"
        />
      </div>
      <div className="flex-1 mx-4 md:mx-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Selected materials designed for comfort and sustainability
        </h3>
        <p className="text-lg text-gray-600 mb-6 break-words">
          At Glidegear, we believe every step should be stylish and comfortable.
          With a passion for quality and design, we offer a curated selection of
          shoes for every lifestyle. From casual to performance, our collection
          ensures the perfect fit for any occasion. Committed to exceptional
          service, we aim to provide an unmatched shopping experience. Discover
          your perfect pair with us and step into a world of comfort and
          elegance.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="inline-block px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-300"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

export default AboutSection;
