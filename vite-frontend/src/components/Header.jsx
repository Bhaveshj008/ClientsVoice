<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Settings, ArrowUpRight, HelpCircle, ChevronDown, LogOut } from 'lucide-react';
import api from './api';

const MENU_ITEMS = [
  { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
  { label: 'Settings', route: '#', icon: Settings },
  { label: 'Upgrade', route: '#', icon: ArrowUpRight },
  { label: 'Support', route: '#', icon: HelpCircle }
];

const UserAvatar = ({ profilePicture, name, size = 'small' }) => {
  const getInitials = name => name?.charAt(0).toUpperCase() || '?';
  const dimensions = size === 'small' ? 'h-8 w-8' : 'h-12 w-12';
  const textSize = size === 'small' ? 'text-sm' : 'text-lg';
  return profilePicture ? (
    <img src={profilePicture} alt={`${name}'s Avatar`} className={`${dimensions} rounded-full object-cover ring-2 ring-purple-500/50`} />
  ) : (
    <div className={`${dimensions} rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center ${textSize} text-white font-medium ring-2 ring-purple-500/50`}>
      {getInitials(name)}
    </div>
  );
};

const MenuItem = ({ icon: Icon, label, onClick }) => (
  <button onClick={onClick} className="w-full px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-purple-500/10 hover:text-white flex items-center space-x-3 transition-all duration-300">
    <Icon className="w-4 h-4 text-purple-400" />
    <span>{label}</span>
  </button>
);

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', profilePicture: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user/profile', { headers: { Authorization: `Bearer ${token}` } });
        const { name, email, profilePicture } = response.data.client[0];
        setUserData({ name, email, profilePicture });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    if (token) fetchUserData();
  }, [token]);
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCog, FaArrowRight, FaWrench, FaSignOutAlt } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuToggle = () => setMenuVisible((prev) => !prev);
  const handleOptionClick = (route) => {
    navigate(route);
    setMenuVisible(false);
  };
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

<<<<<<< HEAD
  const handleNavigation = route => {
    navigate(route);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-purple-700">
      <div className="backdrop-blur-sm bg-black/20">
        <div className=" mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                <img src="/logo.jpg" alt="ClientsVoice Logo" className="relative h-9 w-9 rounded-lg" />
              </div>
              <span className="text-3xl font-bold">
            <span className='text-white'>Clients</span><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Voice</span>
          </span>
            </div>
            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-3 focus:outline-none group bg-gray-800/50 px-4 py-2 rounded-full border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="relative">
                  <UserAvatar profilePicture={userData.profilePicture} name={userData.name} />
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-gray-800"></div>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors duration-300">{userData.name || 'Loading...'}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-72 origin-top-right">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
                    <div className="relative bg-gray-800 rounded-lg shadow-2xl border border-purple-500/20">
                      <div className="p-4 border-b border-gray-700/50">
                        <div className="flex items-center space-x-3">
                          <UserAvatar profilePicture={userData.profilePicture} name={userData.name} size="large" />
                          <div>
                            <p className="text-sm font-medium text-white">{userData.name}</p>
                            <p className="text-xs text-purple-300">{userData.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        {MENU_ITEMS.map(item => (
                          <MenuItem key={item.route} icon={item.icon} label={item.label} onClick={() => handleNavigation(item.route)} />
                        ))}
                      </div>
                      <div className="p-2 border-t border-gray-700/50">
                        <MenuItem icon={LogOut} label="Sign out" onClick={handleSignOut} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
=======
  return (
    <header className="flex justify-between items-center p-6 bg-gray-900 shadow-lg border-b border-gray-700">
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
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225

export default Header;
