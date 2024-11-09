import React from "react";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        Clients<span className="text-blue-500">Voice</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <a href="#features" className="text-gray-700 hover:text-blue-500">
          Features
        </a>
        <a href="#templates" className="text-gray-700 hover:text-blue-500">
          Templates
        </a>
        <a href="#pricing" className="text-gray-700 hover:text-blue-500">
          Pricing
        </a>
        <a href="#blog" className="text-gray-700 hover:text-blue-500">
          Blog
        </a>
        <a href="#signin" className="text-gray-700 hover:text-blue-500">
          Sign in
        </a>
      </nav>

      {/* CTA Button */}
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
        Try Free
      </button>
    </header>
  );
}

export default Header;
