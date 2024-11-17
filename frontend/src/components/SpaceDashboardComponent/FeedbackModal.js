import React from 'react';
import { FaTimes } from 'react-icons/fa';

const FeedbackModal = ({ feedback, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-gray-900 text-white p-8 rounded-lg max-w-lg w-full relative shadow-2xl border border-purple-500">
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-purple-400 transition">
        <FaTimes size={20} />
      </button>
      
      {/* Header */}
      <h3 className="text-2xl font-bold text-purple-400 mb-6 text-center">Feedback Details</h3>
      
      {/* Feedback Details */}
      <div className="space-y-4">
        {Object.entries(feedback.responses).map(([key, value]) => (
          <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between text-gray-300">
            <span className="font-semibold text-purple-300 capitalize">{key}:</span>
            <span className="text-gray-200">{value}</span>
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="mt-8 w-full py-3 bg-purple-500 hover:bg-purple-600 transition-colors rounded-lg font-semibold text-white"
      >
        Close
      </button>
    </div>
  </div>
);

export default FeedbackModal;
