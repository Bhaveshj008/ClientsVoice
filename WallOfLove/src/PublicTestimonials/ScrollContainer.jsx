import React from 'react';
import TestimonialCard from './TestimonialCard';

const ScrollContainer = ({
  scrollContainerRef,
  scrollContainerStyles,
  setIsPaused,
  testimonials,
  cardStyles,
  customizations,
  lastTestimonialRef
}) => {
  const isGrid = customizations.scrollType === 'grid';
  
  return (
    <div
      ref={scrollContainerRef}
      style={scrollContainerStyles}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={testimonial._id}
          ref={index === testimonials.length - 1 ? lastTestimonialRef : null}
          testimonial={testimonial}
          containerStyle={{
            ...cardStyles,
            display: isGrid ? 'inline-block' : 'block',
          }}
          scrollType={customizations.scrollType}
        />
      ))}
    </div>
  );
};

export default ScrollContainer;