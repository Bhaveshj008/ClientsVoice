import React from 'react';

const ResponseCard = ({ testimonial, feedback, toggleLike, toggleArchive, openFeedbackModal }) => (
  <div className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
    <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
      <span>Submitted on: {new Date(testimonial.createdAt).toLocaleDateString()}</span>
    </div>
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 overflow-hidden">
        {testimonial.image ? (
          <img src={testimonial.image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-700 text-gray-500">
            <span className="text-sm">No Image</span>
          </div>
        )}
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-bold text-gray-100">{testimonial.responses.Name}</h3>
        <p className="text-xs text-gray-400">Submitted by: {testimonial.responses.Email}</p>
      </div>
    </div>
    <p className="text-sm text-gray-200 mb-4">{testimonial.responses.Testimonial}</p>
    <div className="flex items-center space-x-4">
      <button onClick={() => toggleLike(testimonial._id)}>
        {testimonial.liked ? "Dislike" : "Like"}
      </button>
      <button onClick={() => toggleArchive(testimonial._id)}> {testimonial.archived ? "Unarchive" : "Archive"}</button>
      <button onClick={() => openFeedbackModal(feedback)} className="text-purple-300 text-sm">View Feedback</button>
    </div>
  </div>
);

export default ResponseCard;
