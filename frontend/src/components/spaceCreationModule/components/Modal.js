import React from 'react';

function Modal({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-charcoal p-8 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-lightGray">Success!</h2>
        <p className="text-lightGray">{message}</p>
        <button 
          onClick={onClose} 
          className="mt-6 px-4 py-2 bg-royalBlue text-white rounded hover:bg-navy"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Modal;