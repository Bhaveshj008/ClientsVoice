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
  );
};

export default Header;
