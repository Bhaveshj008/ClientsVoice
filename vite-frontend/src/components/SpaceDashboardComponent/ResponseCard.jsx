import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaArchive } from 'react-icons/fa';
import { MdUnarchive } from 'react-icons/md';
import { FaCommentDots } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

const ResponseCard = ({ testimonial, feedback, toggleLike, toggleArchive, openFeedbackModal }) => {
  const tooltipId = `tooltip-${testimonial._id}`;
  
  return (
    <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
      {/* Status Badge */}
      {testimonial.archived && (
        <div className="absolute -top-3 right-4 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
          <span className="text-xs font-medium text-purple-300">Archived</span>
        </div>
      )}

      <div className="flex gap-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-full ring-2 ring-offset-2 ring-offset-gray-800 ring-purple-500/50 overflow-hidden">
            {testimonial.responses?.ProfileImage ? (
              <img 
                src={testimonial.responses?.ProfileImage} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                <span className="text-xs text-gray-400">No Image</span>
              </div>
            )}
          </div>
          
          {/* Action Buttons - Vertical */}
          <div className="flex flex-col items-center space-y-4 mt-4">
            <button
              onClick={() => toggleLike(testimonial._id)}
              className="relative group/btn"
              data-tooltip-id={`like-${tooltipId}`}
            >
              {testimonial.liked ? (
                <AiFillHeart className="text-red-500 hover:text-red-400 w-6 h-6 transition-colors" />
              ) : (
                <AiOutlineHeart className="text-gray-400 hover:text-red-400 w-6 h-6 transition-colors" />
              )}
            </button>
            <button
              onClick={() => toggleArchive(testimonial._id)}
              className="relative group/btn"
              data-tooltip-id={`archive-${tooltipId}`}
            >
              {testimonial.archived ? (
                <MdUnarchive className="text-gray-400 hover:text-purple-400 w-6 h-6 transition-colors" />
              ) : (
                <FaArchive className="text-gray-400 hover:text-purple-400 w-6 h-6 transition-colors" />
              )}
            </button>
            <button
              onClick={() => openFeedbackModal(feedback)}
              className="relative group/btn"
              data-tooltip-id={`feedback-${tooltipId}`}
            >
              <FaCommentDots className="text-gray-400 hover:text-purple-400 w-6 h-6 transition-colors" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
              {testimonial.responses?.name}
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-400 truncate">
                {testimonial.responses?.email}
              </p>
              <time className="text-xs text-gray-500">
                {new Date(testimonial?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>

          <div className="mt-4 relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-purple-500/20 rounded-full"></div>
            <p className="text-gray-300 pl-4 leading-relaxed">
              {testimonial.responses?.testimonial}
            </p>
          </div>
        </div>
      </div>

      {/* Tooltips with unique IDs */}
      <Tooltip id={`like-${tooltipId}`} place="left" content={testimonial?.liked ? "Dislike" : "Like"} />
      <Tooltip id={`archive-${tooltipId}`} place="left" content={testimonial?.archived ? "Unarchive" : "Archive"} />
      <Tooltip id={`feedback-${tooltipId}`} place="left" content="View Feedback" />
    </div>
  );
};

export default ResponseCard;