import React, { useState, useEffect } from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/coming-bg.jpg";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";


const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userMP");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <div className="subtitle">
        <h2> India ki traditional fantasy</h2>
      </div>
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">lorem ipsum</h1>
          <p className="primary-text">Lorem ipsum</p>
          {user && (
            <button className="secondary-button">
              Play Now <FiArrowRight />
            </button>
          )}
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" width="500" className="rounded-image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
