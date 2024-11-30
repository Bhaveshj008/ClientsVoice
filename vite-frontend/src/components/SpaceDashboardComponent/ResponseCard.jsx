import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaArchive } from 'react-icons/fa';
import { MdUnarchive } from 'react-icons/md';
import { Tooltip } from 'react-tooltip';
import { FaCommentDots } from 'react-icons/fa';

const ResponseCard = ({ testimonial, feedback, toggleLike, toggleArchive, openFeedbackModal }) => (
  <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl hover:border-purple-500 border border-neutral-700 transition-all transform w-full mb-6">
    {/* Profile Image and Content Container */}
    <div className="flex items-start mb-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden border-2 border-purple-500 mr-6">
        {testimonial.responses.Image ? (
          <img src={testimonial.responses.Image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-700 text-gray-500">
            <span className="text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Testimonial Content */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-white">{testimonial.responses.Name}</h3>
        <p className="text-sm text-gray-400 mt-1">Submitted by: {testimonial.responses.Email}</p>
        <p className="text-xs text-gray-500 mt-1">Submitted on: {new Date(testimonial.createdAt).toLocaleDateString()}</p>
        <p className="text-sm text-gray-200 mt-4">{testimonial.responses.Testimonial}</p>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex justify-end mt-4 space-x-6">
      {/* Like Button */}
      <div className="relative">
        <button 
          onClick={() => toggleLike(testimonial._id)} 
          className="text-red-500 hover:text-red-700 transition-colors"
          data-tooltip-id="likeTooltip"
        >
          {testimonial.liked ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25} />}
        </button>
        <Tooltip id="likeTooltip" place="top" content={testimonial.liked ? "Dislike" : "Like"} />
      </div>

      {/* Archive Button */}
      <div className="relative">
        <button 
          onClick={() => toggleArchive(testimonial._id)} 
          className="text-gray-300 hover:text-purple-400 transition-colors"
          data-tooltip-id="archiveTooltip"
        >
          {testimonial.archived ? <MdUnarchive size={25} /> : <FaArchive size={25} />}
        </button>
        <Tooltip id="archiveTooltip" place="top" content={testimonial.archived ? "Unarchive" : "Archive"} />
      </div>

      {/* View Feedback Button */}
      <div className="relative">
        <button 
          onClick={() => openFeedbackModal(feedback)} 
          className="text-purple-300 text-sm hover:text-purple-500 transition-colors"
          data-tooltip-id="feedbackTooltip"
        >
          <FaCommentDots size={25} />
        </button>
        <Tooltip id="feedbackTooltip" place="top" content="View Feedback" />
      </div>
    </div>
  </div>
);

export default ResponseCard;
