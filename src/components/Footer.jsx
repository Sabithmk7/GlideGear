import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP } from 'react-icons/fa'; 
import { Link,} from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-6">
      <div className="container mx-auto">
   
        <div className="flex flex-col md:flex-row justify-between mb-12">
   
          <div className="flex-1 mb-8 md:mb-0 md:w-1/3">
            <p className="text-lg mb-4 leading-relaxed text-gray-300 mx-auto max-w-xs">
            At Glidegear, we blend style, comfort, and durability to create footwear that complements your look and supports every step, whether on the streets or the trail
            </p>
            <div className="flex space-x-4 mt-6 ml-20"> 
              <a href="#facebook" className="text-gray-400 hover:text-white">
                <FaFacebookF className="w-6 h-6 transition-transform transform hover:scale-110" />
              </a>
              <a href="#twitter" className="text-gray-400 hover:text-white">
                <FaTwitter className="w-6 h-6 transition-transform transform hover:scale-110" />
              </a>
              <a href="#instagram" className="text-gray-400 hover:text-white">
                <FaInstagram className="w-6 h-6 transition-transform transform hover:scale-110" />
              </a>
              <a href="#linkedin" className="text-gray-400 hover:text-white">
                <FaLinkedinIn className="w-6 h-6 transition-transform transform hover:scale-110" />
              </a>
              <a href="#pinterest" className="text-gray-400 hover:text-white">
                <FaPinterestP className="w-6 h-6 transition-transform transform hover:scale-110" />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-12 mb-8 md:mb-0 md:w-2/3">
            <div className="mb-6 md:mb-0 w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link to={'/men'} className="hover:underline">Shop Men</Link></li>
                <li><Link to={'/women'} className="hover:underline">Shop Women</Link></li>
                <li><Link to={'/collections'} className="hover:underline">Collection</Link></li>
              </ul>
            </div>
            <div className="mb-6 md:mb-0 w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#our-story" className="hover:underline">Our Story</a></li>
                <li><a href="#our-materials" className="hover:underline">Our Materials</a></li>
                <li><a href="#our-value" className="hover:underline">Our Value</a></li>
               
              </ul>
            </div>

            <div className="mb-6 md:mb-0 w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <ul className="space-y-2">
                <li><a href="#faqs" className="hover:underline">FAQs</a></li>
                <li><a href="#shipping-returns" className="hover:underline">Shipping & Returns</a></li>
                <li><a href="#shoe-care" className="hover:underline">Shoe Care</a></li>
                <li><a href="#size-chart" className="hover:underline">Size Chart</a></li>
                <li><a href="#contact-us" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>

  
        <div className="border-t border-gray-700 pt-4 mt-6 text-center">
          <p className="text-sm">
            © 2024 Recycled Shoe Store. Powered by Recycled Shoe Store.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
