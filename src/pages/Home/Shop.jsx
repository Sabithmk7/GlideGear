import React from 'react';
import men from '../../assets/men.jpg';
import women from '../../assets/women.jpg';
import { useNavigate } from 'react-router-dom';

function Shop() {
    const navigate=useNavigate()
  return (
    <div className="flex justify-between mb-4">
      <div className="relative w-1/2">
        <img
          src={men}
          alt="Shop Men"
          className="w-full h-auto"
        />
        <button onClick={()=>navigate('/men')} className="absolute inset-0 flex items-center justify-center hover:bg-black hover:bg-opacity-50 text-white text-xl font-bold border-2 border-transparent hover:border-white transition duration-300">
          Shop Men
        </button>
      </div>
      <div className="relative w-1/2">
        <img
          src={women}
          alt="Shop Women"
          className="w-full h-auto"
        />
        <button  onClick={()=>navigate('/women')} className="absolute inset-0 flex items-center justify-center hover:bg-black hover:bg-opacity-50 text-white text-xl font-bold border-2 border-transparent hover:border-white transition duration-300">
          Shop Women
        </button>
      </div>
    </div>
  );
}

export default Shop;
