import React from 'react';
import { Link } from "react-router-dom";

const Header = () => (
  <header className="p-5 bg-gray-800 flex justify-between items-center shadow-md">
    <h1 className="text-2xl font-bold text-purple-400">ClientsVoice</h1>
    <nav className="space-x-6">
      {['Features', 'Templates', 'Pricing', 'Blog', 'Sign In'].map((item) => (
        <a key={item} href="#" className="hover:text-purple-300 transition-colors duration-200">
          {item}
        </a>
      ))}
     
<button className="ml-4 px-5 py-2 bg-purple-500 rounded-lg hover:bg-purple-400 transition-all">
  <Link to="/dashboard" className="text-white">Dashboard</Link>
</button>
    </nav>
  </header>
);

export default Header;
