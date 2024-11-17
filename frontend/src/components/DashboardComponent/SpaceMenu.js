import React from 'react';

function SpaceMenu({ menuOpen, menuRef, toggleMenu, onEdit, onDelete }) {
  return (
    <div className="absolute top-2 right-2" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="text-neutral-300 text-xl focus:outline-none hover:text-purple-300"
      >
        &#x2022;&#x2022;&#x2022;
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-neutral-950 rounded-lg shadow-lg overflow-hidden z-10 border-2 border-purple-500">
          <button
            onClick={() => {
              onEdit();
              toggleMenu();
            }}
            className="w-full text-left px-4 py-2 text-neutral-300 hover:bg-purple-500 hover:text-neutral-100 transition-all duration-200"
          >
            Edit Space
          </button>
          <button
            onClick={() => {
              onDelete();
              toggleMenu();
            }}
            className="w-full text-left px-4 py-2 text-neutral-300 hover:bg-red-600 hover:text-neutral-100 transition-all duration-200"
          >
            Delete Space
          </button>
        </div>
      )}
    </div>
  );
}

export default SpaceMenu;
