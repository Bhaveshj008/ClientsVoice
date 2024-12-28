import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaArrowRight, FaWrench, FaSignOutAlt } from "react-icons/fa";
import CheckToken from "./checkToken";
function Header() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = () => setMenuVisible((prev) => !prev);
  const handleOptionClick = (route) => {
    navigate(route);
    setMenuVisible(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");  
    navigate("/"); 
  };

  return (
    <header className="flex justify-between items-center p-6 bg-gray-900 shadow-lg border-b border-gray-700">
      <CheckToken/>
      {/* Branding */}
      <div className="text-2xl font-bold text-white flex items-center gap-2">
      <img src="/logo.png" alt="ClientsVoice Logo" className="w-10 h-10" />
        <span className="hover:text-purple-400 transition duration-300">ClientsVoice</span>
      </div>

      {/* Profile Icon with Popover Menu */}
      <div className="relative">
        <button
          onClick={handleMenuToggle}
          className="flex items-center text-white text-lg focus:outline-none hover:text-purple-400 transition duration-300"
        >
          <FaUserCircle className="text-3xl mr-2" />
        </button>

        {/* Popover Menu */}
        {menuVisible && (
          <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-20">
            <DropdownItem
             
              text="Dashboard"
              onClick={() => handleOptionClick("/dashboard")}
            />
            <DropdownItem
              icon={<FaCog className="text-purple-400" />}
              text="Settings"
              onClick={() => handleOptionClick("/settings")}
            />
            <DropdownItem
              icon={<FaArrowRight className="text-purple-400" />}
              text="Upgrade"
              onClick={() => handleOptionClick("/upgrade")}
            />
            <DropdownItem
              icon={<FaWrench className="text-purple-400" />}
              text="Support"
              onClick={() => handleOptionClick("/support")}
            />
            <hr className="border-gray-600 my-2" />
            <DropdownItem
              icon={<FaSignOutAlt className="text-red-500" />}
              text="Sign Out"
              onClick={handleSignOut}
              className="text-red-500 hover:bg-red-100"
            />
          </div>
        )}
      </div>
    </header>
  );
}

// Reusable Dropdown Item Component
const DropdownItem = ({ icon, text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-purple-400 w-full text-left transition-colors duration-300 ${className}`}
  >
    {icon}
    {text}
  </button>
);

export default Header;
