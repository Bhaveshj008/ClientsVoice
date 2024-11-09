import React from 'react';

const FeedbackModal = ({ feedback, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
    <div className="bg-white text-black p-6 rounded-lg max-w-md">
      <h3 className="text-lg font-semibold mb-4">Feedback Details</h3>
      {Object.entries(feedback.responses).map(([key, value]) => (
        <div key={key} className="mb-2">
          <span className="font-semibold">{key}:</span> {value}
        </div>
      ))}
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-purple-500 rounded-lg text-white">
        Close
      </button>
    </div>
  </div>
);

export default FeedbackModal;
    