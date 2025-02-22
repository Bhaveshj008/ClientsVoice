import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Home } from 'lucide-react';

const DashboardHeader = ({ 
  totalStats, 
  spaceId, 
  isRefreshing, 
  handleManualRefresh 
}) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-10 lg:mt-2">
      <div className="flex flex-col lg:flex-row justify-between items-center px-4 pb-2">
        {/* Breadcrumb and Stats */}
        <div className="flex items-center w-full lg:w-auto gap-2 mb-3 lg:mb-0">
          <Home className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400">/</span>
          <span className="text-white font-medium">
          Total Feedbacks/Testimonials: {totalStats.testimonialCount}
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          <button
            onClick={() => navigate(`/space/edit/${spaceId}`)}
            className="px-4 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:border-purple-500"
          >
            Edit Space
          </button>
          
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all border border-purple-500 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;