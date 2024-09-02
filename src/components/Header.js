import logo from "../../logo.png";
import React, { useRef, useState } from "react";
import heroVDO from "../../public/heroVDO.mp4";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
          Clients<span>Voice</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#testimonials">Testimonials</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#login">Login</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export const Hero = () => {
    const videoRef = useRef(null);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
  
    // Handler for when the video ends
    const handleVideoEnd = () => {
      setIsVideoEnded(true); // Set state to true when the video ends
    };
  
    return (
      <section className="hero">
        <video
          className={`hero-video ${isVideoEnded ? "blurred" : ""}`}
          src={heroVDO}
          autoPlay
          muted
          loop={false} // Video should play only once
          playsInline
          onEnded={handleVideoEnd}
          ref={videoRef}
        >
          Your browser does not support the video tag.
        </video>
        <div
          className={`hero-content ${isVideoEnded ? "fade-in" : "hidden"}`}
        >
          <h1>
            Showcase Your Customer Love <span>Effortlessly</span>
          </h1>
          <p>
            Collect, manage, and display testimonials on your website with
            beautiful, customizable widgets.
          </p>
          <a href="#get-started" className="cta-button">
            Get Started Free
          </a>
        </div>
      </section>
    );
  };

export default Header;
