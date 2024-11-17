import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const StatsHeader = ({ totalStats, spaceId }) => {
  const navigate = useNavigate(); // Get the navigate function

  // Function to handle the button click
  const handleEditSpace = () => {
    navigate(`/space/edit/${spaceId}`); // Redirect to the edit space route with spaceId
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">
        Total Feedbacks/Testimonials: {totalStats.testimonialCount}
      </h2>
    
      <button
        className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-600 border hover:border-purple-500 hover:text-purple-500 transition-all"
        onClick={handleEditSpace} // Add the onClick handler here
      >
        <b>Edit Space</b>
      </button>
    </header>
  );
};

export default StatsHeader;
