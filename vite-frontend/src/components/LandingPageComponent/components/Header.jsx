<<<<<<< HEAD
// Header.js
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import {Link } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center">
            <img src='/logo.jpg' alt='LOGO' className="w-10 h-10 rounded-md" />
          </div>
          <span className="text-3xl font-bold">
            Clients<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Voice</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-lg font-semibold hover:text-blue-500 transition-colors">Features</a>
          <a href="#testimonials" className="text-lg font-semibold hover:text-blue-500 transition-colors">Testimonials</a>
          <a href="#pricing" className="text-lg font-semibold hover:text-blue-500 transition-colors">Pricing</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop CTA */}
        
        <div className="hidden md:flex space-x-4">
        <Link to={'login'}>
          <button className="px-4 py-2 text-lg font-semibold hover:text-blue-500 transition-colors">Log in</button>
          </Link>
          <Link to={'signup'}>
          <button className="px-4 py-2 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity">
            Get Started
          </button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#features" className="hover:text-blue-500 transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-blue-500 transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-blue-500 transition-colors">Pricing</a>
            <button className="px-4 py-2 text-sm hover:text-blue-500 transition-colors">Log in</button>
            <Link to={'signup'}>
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity">
              Get Started
            </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
=======
import logo from "../logo.png";
import React, { useRef, useState } from "react";
import heroVDO from "../heroVDO.mp4";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <nav1>
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
          <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav1>
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
        <Link to="/signup" className="cta-button">
          Get Started Free
        </Link>
      </div>
    </section>
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
  );
};

export default Header;
