import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpaceMenu from './SpaceMenu';
import SpaceContent from './SpaceContent';
import DeleteModal from './DeleteModal';

function SpaceCard({ space, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 relative border border-neutral-700 hover:border-purple-500 hover:text-purple-300">
      {/* Space Menu */}
      <SpaceMenu
        menuOpen={menuOpen}
        menuRef={menuRef}
        toggleMenu={toggleMenu}
        onEdit={() => onEdit(space._id)}
        onDelete={() => setModalOpen(true)}
      />

      {/* Space Content */}
      <SpaceContent space={space} />

      {/* Delete Confirmation Modal */}
      {modalOpen && (
        <DeleteModal
          spaceName={space.spaceName}
          spaceId={space._id}
          onClose={() => setModalOpen(false)}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

export default SpaceCard;
