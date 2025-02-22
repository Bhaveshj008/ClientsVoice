import React from 'react';
import ResponseCard from './ResponseCard';
import EmptyState from './EmptyState';

const ResponseList = ({ 
  responses, 
  loading, 
  lastResponseElementRef,
  toggleLike,
  toggleArchive,
  openFeedbackModal,
  spaceURL
}) => {
  if (responses.length === 0) {
    return <EmptyState spaceURL={spaceURL} />;
  }

  return (
    <div className="space-y-6">
      {responses.map((response, index) => {
        if (responses.length === index + 1) {
          return (
            <div ref={lastResponseElementRef} key={response.testimonial._id}>
              <ResponseCard
                testimonial={response.testimonial}
                feedback={response.feedback}
                toggleLike={toggleLike}
                toggleArchive={toggleArchive}
                openFeedbackModal={openFeedbackModal}
              />
            </div>
          );
        } else {
          return (
            <ResponseCard
              key={response.testimonial._id}
              testimonial={response.testimonial}
              feedback={response.feedback}
              toggleLike={toggleLike}
              toggleArchive={toggleArchive}
              openFeedbackModal={openFeedbackModal}
            />
          );
        }
      })}
      {loading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default ResponseList;