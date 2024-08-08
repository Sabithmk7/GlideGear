import React, { useEffect } from "react";
import HeroSection from "./Home/HeroSection";
import LogoSection from "./Home/LogoSection";
import AboutSection from "./Home/AboutSection";
import BestSeller from "./Home/BestSeller";

function HomePage({ setCheckNav }) {
  useEffect(() => {
    setCheckNav(true);
  }, [setCheckNav]);

  return (
    <>
      <HeroSection />
      <LogoSection />
      <BestSeller />
      <AboutSection />
      
    </>
  );
}

export default HomePage;
