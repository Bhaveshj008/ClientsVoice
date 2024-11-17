// TestimonialsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

const TestimonialsPage = () => {
  const { spaceId } = useParams();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, [spaceId]);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get(`${spaceId}/embeddebleWidget`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTestimonials(response.data || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  return (
    <div className="min-h-screen text-gray-200 font-sans p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Testimonials</h1>

      {/* Horizontally Scrollable Cards */}
      <div className="overflow-x-auto flex space-x-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-[300px] bg-gray-800 p-4 rounded-lg shadow-lg flex-shrink-0"
          >
            {/* Image or Gray Circle Placeholder */}
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

            <h3 className="text-lg font-semibold mb-2 text-gray-100 text-center">
              {testimonial.responses.Name}
            </h3>
            <p className="text-sm text-gray-400 mb-4 text-center">{testimonial.responses.Email}</p>
            <p className="text-sm text-gray-200 text-center">{testimonial.responses.Testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsPage;
