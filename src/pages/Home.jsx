import React from "react";
import HeroSection from "./Home/HeroSection";
import LogoSection from "./Home/LogoSection";
import AboutSection from "./Home/AboutSection";
import BestSeller from "./Home/BestSeller";
import Shop from "./Home/Shop";


function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoSection />
      <BestSeller />
      <AboutSection />
      <Shop/>
    </>
  );
}

export default HomePage;
