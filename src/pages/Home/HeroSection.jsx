import React from "react";
import shoeHero  from '../../assets/homeImg.jpg'
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate=useNavigate()
  return (
    <div>
      <div
        className="relative h-screen bg-cover bg-center mx-6"
        style={{ backgroundImage: `url(${shoeHero})` }}
      >
        <div className="absolute inset-0  hover:bg-opacity-50 hover:bg-black flex flex-col items-start justify-center text-left p-14">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-8">
            Step Into Style
          </h1>
          <p className="text-lg md:text-1xl text-white mb-8 ">
          Elevate your style with our latest collection of sleek, comfortable shoes.<br/>  Designed for everyday wear,they offer the perfect blend of performance and <br/> modern aesthetics. Step confidently into any occasion with footwear that sets the pace.
          </p>
          <button onClick={()=>navigate('/collections')} className="bg-white text-black px-6 py-3  hover:bg-gray-400 transition duration-300">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>  
  );
}

export default HeroSection;
