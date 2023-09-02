import React from "react";
import Header from "../Header/Header";
import HeroSection from "../HeroSection/HeroSection";
import FeaturedListing from "../FeaturedListing/FeaturedListing";
import "./LandingPage.css"
import Footer from "../Footer/Footer";
const LandingPage = () => {
  return (
    <div>
      <Header onPage="home" />
      <HeroSection />

      <div className="card-container">
        <h1 className="featured-listing-title">
          Here are some our featured listing:
        </h1>
        <FeaturedListing />
      </div>

      <Footer/>
    </div>
  );
};

export default LandingPage;
