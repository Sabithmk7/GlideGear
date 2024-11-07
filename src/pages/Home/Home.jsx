import React from "react";
import HeroSection from "./HeroSection";
import LogoSection from "./LogoSection";
import AboutSection from "./AboutSection";
import Shop from "./Shop";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <LogoSection />
      <AboutSection />
      <Shop />
      <Footer />
    </>
  );
}

export default HomePage;
