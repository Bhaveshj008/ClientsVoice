import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SpaceCard({ space, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-darkPurple p-4 rounded-lg shadow-lg relative">
      {/* Top-right positioned menu button */}
      <div className="absolute top-2 right-2" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="text-lightLavender focus:outline-none"
        >
          &#x2022;&#x2022;&#x2022;
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-darkPurple rounded-lg shadow-lg py-1">
            <button
              onClick={() => {
                onEdit(space._id);
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-lightLavender hover:bg-brightLavender hover:text-veryDarkPurple"
            >
              Edit Space
            </button>
            <button
              onClick={() => {
                onDelete(space._id);
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-lightLavender hover:bg-red-600 hover:text-veryDarkPurple"
            >
              Delete Space
            </button>
          </div>
        )}
      </div>

      {/* Clickable Space content */}
      <Link to={`/space/dashboard/${space._id}`} className="block">
        <div className="flex items-center mt-4">
          {space.logo && (
            <img
              src={space.logo}
              alt={space.spaceName}
              className="w-12 h-12 rounded-full mr-4"
            />
          )}
          <div>
            <h3 className="text-xl font-semibold text-almostWhite">
              {space.spaceName || 'Unnamed Space'}
            </h3>
            <p className="text-sm text-brightLavender">
              Space ID: {space._id || 'N/A'}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SpaceCard;
