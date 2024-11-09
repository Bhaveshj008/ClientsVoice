import React from 'react';

const StatsHeader = ({ totalStats }) => (
  <header className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-semibold">
      Total Feedbacks/Testimonials: {totalStats.testimonialCount}
    </h2>
    <button className="px-5 py-2 bg-purple-500 rounded-lg hover:bg-purple-400 transition-transform transform hover:scale-105">Edit Space</button>
  </header>
);

export default StatsHeader;
