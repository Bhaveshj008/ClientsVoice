import React from 'react';
import Modal from 'react-modal';

const AuthModal = ({ isOpen, onClose, isSuccess, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-lg shadow-lg p-8 w-80 mx-auto mt-20 text-center"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <h2 className={`text-2xl font-semibold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
        {isSuccess ? 'Success!' : 'Error'}
      </h2>
      <p className="mt-4 text-gray-700">{message}</p>
      <button
        onClick={onClose}
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Close
      </button>
    </Modal>
  );
};

export default AuthModal;