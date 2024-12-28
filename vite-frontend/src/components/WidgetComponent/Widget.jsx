import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../api';

const TestimonialsPage = () => {
  const { spaceId } = useParams();
  const location = useLocation();
  const [testimonials, setTestimonials] = useState([]);
  const [customizations, setCustomizations] = useState({
    bgColor: '#1f2937',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 0,
    scrollType: 'vertical',
    cardBgColor: '#2d3748',
    cardTextColor: '#edf2f7',
    cardPadding: 16,
    cardMargin: 16,
    cardBorderRadius: 12,
  });
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const customizationOptions = {
      bgColor: query.get('bgColor') || '#1f2937',
      borderStyle: query.get('borderStyle') || 'solid',
      borderColor: query.get('borderColor') || '#000',
      borderWidth: parseInt(query.get('borderWidth') || '1', 10),
      borderRadius: parseInt(query.get('borderRadius') || '0', 10),
      scrollType: query.get('scrollType') || 'vertical',
      cardBgColor: query.get('cardBgColor') || '#2d3748',
      cardTextColor: query.get('cardTextColor') || '#edf2f7',
      cardPadding: parseInt(query.get('cardPadding') || '16', 10),
      cardMargin: parseInt(query.get('cardMargin') || '16', 10),
      cardBorderRadius: parseInt(query.get('cardBorderRadius') || '12', 10),
    };

    setCustomizations(customizationOptions);
    setTestimonials([]); // Reset testimonials when search params or spaceId changes
    setOffset(0); // Reset offset
    setHasMore(true); // Reset hasMore
    fetchTestimonials(0); // Fetch testimonials from start
  }, [spaceId, location.search]);

  const fetchTestimonials = async (newOffset) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await api.get(`${spaceId}/embeddebleWidget`, {
        params: { limit, offset: newOffset },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const { data, total } = response.data;

      setTestimonials((prev) => [
        ...prev,
        ...data.filter((testimonial) => !prev.some((t) => t._id === testimonial._id)),
      ]); // Prevent duplicates
      setOffset(newOffset + data.length); // Increment offset
      setHasMore(newOffset + data.length < total); // Check if more testimonials exist
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const lastTestimonialRef = useRef(null);
  useEffect(() => {
    if (!hasMore) return;

    const handleObserver = (entries) => {
      if (entries[0].isIntersecting) {
        fetchTestimonials(offset);
      }
    };

    const observerInstance = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    if (lastTestimonialRef.current) {
      observerInstance.observe(lastTestimonialRef.current);
    }

    return () => {
      if (lastTestimonialRef.current) {
        observerInstance.unobserve(lastTestimonialRef.current);
      }
    };
  }, [hasMore, offset]);

  const containerStyles = {
    backgroundColor: customizations.bgColor,
    borderStyle: customizations.borderStyle,
    borderColor: customizations.borderColor,
    borderWidth: `${customizations.borderWidth}px`,
    borderRadius: `${customizations.borderRadius}px`,
    overflow: customizations.scrollType === 'grid' ? 'auto' : 'hidden',
  };

  const scrollStyles = {
    display: customizations.scrollType === 'grid' ? 'grid' : 'flex',
    flexDirection: customizations.scrollType === 'vertical' ? 'column' : 'row',
    gap: `${customizations.cardMargin}px`,
    gridTemplateColumns: customizations.scrollType === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : undefined,
    overflowX: customizations.scrollType === 'horizontal' ? 'auto' : 'hidden',
    overflowY: customizations.scrollType === 'vertical' ? 'auto' : 'hidden',
  };

  const cardStyles = {
    backgroundColor: customizations.cardBgColor,
    color: customizations.cardTextColor,
    padding: `${customizations.cardPadding}px`,
    margin: `${customizations.cardMargin}px`,
    borderRadius: `${customizations.cardBorderRadius}px`,
  };

  return (
    <div className="min-h-screen text-gray-200 font-sans p-6" style={containerStyles}>
      <h1 className="text-3xl font-bold text-center mb-8">Testimonials</h1>

      <div style={scrollStyles} className="overflow-x-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial._id}
            style={cardStyles}
            className="w-[300px] shadow-lg flex-shrink-0"
            ref={index === testimonials.length - 1 ? lastTestimonialRef : null} // Attach observer to last item
          >
            <div className="w-20 h-20 bg-gray-600 rounded-full mb-4 mx-auto overflow-hidden flex items-center justify-center">
              {testimonial.responses.Image ? (
                <img
                  src={testimonial.responses.Image}
                  alt={`${testimonial.responses.Name}'s profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-gray-300 text-sm">No Image</span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">{testimonial.responses.Name}</h3>
            <p className="text-sm mb-4 text-center">{testimonial.responses.Email}</p>
            <p className="text-sm text-center">{testimonial.responses.Testimonial}</p>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="text-center text-gray-400 mt-4">
          Loading more testimonials...
        </div>
      )}

      {!hasMore && !isLoading && (
        <div className="text-center text-gray-400 mt-4">
          No more testimonials to display.
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;
