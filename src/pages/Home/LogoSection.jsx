import React from "react";
import jordanBg from "../../assets/jordanBg.jpg";
import pumaBg from "../../assets/pumabg.png";
import nbBg from "../../assets/nbBg.jpg";
import addidasBg from "../../assets/addidasbg.jpg";
import nikeBg from "../../assets/Nikebg.png";

function LogoSection() {
  return (
    <div className="flex items-center justify-around py-16  border-b border-gray-300">
      <img
        src={jordanBg}
        alt="Logo 1"
        className="h-16 w-18 mb-4 hover:scale-110 transition-transform duration-300"
      />
      <img
        src={pumaBg}
        alt="Logo 2"
        className="h-16 w-18 mb-4 hover:scale-110 transition-transform duration-300"
      />
      <img
        src={nbBg}
        alt="Logo 3"
        className="h-16 w-18 mb-4 hover:scale-110 transition-transform duration-300"
      />
      <img
        src={addidasBg}
        alt="Logo 4"
        className="h-16 w-18 mb-4 hover:scale-110 transition-transform duration-300"
      />
      <img
        src={nikeBg}
        alt="Logo 5"
        className="h-16 w-18 mb-4 hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
}

export default LogoSection;
