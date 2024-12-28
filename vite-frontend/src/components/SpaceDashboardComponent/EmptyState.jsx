import React, { useState } from 'react';
import { MessageSquare, Link as LinkIcon, Check } from 'lucide-react';

const EmptyState = ({ spaceURL }) => {
  const [isCopied, setIsCopied] = useState(false);
  const baseURL = window.location.origin;
  const fullURL = `${baseURL}/form/${spaceURL}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullURL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-6">
        {/* Icon Container */}
        <div className="rounded-full bg-gray-700/50 p-4">
          <MessageSquare className="w-12 h-12 text-blue-400" />
        </div>
        
        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-white">
            No testimonials yet
          </h3>
          <p className="text-gray-400 max-w-md">
            Start collecting valuable feedback from your users by sharing your testimonial collection link.
          </p>
        </div>
        
        {/* Button Container */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            className="w-full sm:w-auto px-4 py-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            onClick={handleCopyLink}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <LinkIcon className="w-4 h-4" />
                Copy Collection Link
              </>
            )}
          </button>
        </div>
        
        {/* Link Display */}
        <div className="text-sm text-gray-500">
          Your collection link: <span className="text-gray-400">{fullURL}</span>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;