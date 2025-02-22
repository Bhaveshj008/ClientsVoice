import React, { forwardRef } from 'react';
import { Quote } from 'lucide-react';
import StarRating from './StarRating';

const TestimonialCard = forwardRef(({ testimonial, containerStyle, scrollType }, ref) => {
  return (
    <div
      ref={ref}
      style={containerStyle}
      className="shadow-lg testimonial-card bg-opacity-95"
    >
      <Quote className="quote-mark" size={32} />
      <div className={`${scrollType === 'vertical' ? 'vertical-card-content' : ''}`}>
        <div className="info-section">
          <ProfileSection testimonial={testimonial} />
          <StarRating />
        </div>
        
        <div className="testimonial-section mt-6 md:mt-0">
          <p className="text-lg leading-relaxed font-medium italic">
            "{testimonial.responses.testimonial}"
          </p>
        </div>
      </div>
    </div>
  );
});

const ProfileSection = ({ testimonial }) => (
  <div className="profile-section flex items-center mb-4">
    <div className="image-container w-20 h-20 bg-gray-600 rounded-full mb-4 md:mb-0 overflow-hidden flex items-center justify-center shadow-md ring-2 ring-gray-700 flex-shrink-0">
      {testimonial.responses.ProfileImage ? (
        <img
          src={testimonial.responses.ProfileImage}
          alt={`${testimonial.responses.name}'s profile`}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <div className="w-full h-full bg-gray-500 rounded-full flex items-center justify-center">
          <span className="text-gray-300 text-sm">No Image</span>
        </div>
      )}
    </div>
    <div className="profile-info pl-5">
      <h3 className="text-xl font-bold mb-1 tracking-tight">
        {testimonial.responses.name}
      </h3>
      {testimonial.responses.position && (
        <p className="text-md font-medium mb-1 text-blue-400">
          {testimonial.responses.position}
        </p>
      )}
      <p className="text-sm text-gray-400">
        {testimonial.responses.email}
      </p>
    </div>
  </div>
);

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;