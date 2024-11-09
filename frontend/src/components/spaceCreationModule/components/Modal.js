// Modal.js
import React from 'react';

function Modal({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl font-semibold mb-4">Success!</h2>
        <p className="text-gray-700">{message}</p>
        <button 
          onClick={onClose} 
          className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Modal;
