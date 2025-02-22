import React, { useState } from 'react';
import { X, Maximize2 } from 'lucide-react';

const FeedbackModal = ({ feedback, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const currentDate = new Date().toLocaleDateString();

  const isImageUrl = (value) =>
    typeof value === 'string' &&
    value.includes(`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/`);

  const ImageViewer = ({ src, onClose }) => (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <img
        src={src}
        alt="Full view"
        className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl border-2 border-gray-700"
      />
    </div>
  );

  // Check if feedback.responses is non-empty and an object
  const hasResponses = feedback?.responses && Object.keys(feedback.responses).length > 0;

  return (
    <>
      <div className="fixed pt-20 inset-0 bg-black/50 flex items-center justify-center z-40 p-4">
        <div className="bg-gray-900 w-full max-w-3xl shadow-2xl rounded-lg flex flex-col max-h-[90vh] animate-zoomIn">
          {/* Report Header */}
          <div className="border-b border-gray-800 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Feedback Report</h2>
                <p className="text-gray-400">Generated on {currentDate}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Report Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-8">
              {hasResponses ? (
                Object.entries(feedback.responses).map(([key, value], index) => (
                  <div key={key} className="pb-6 border-b border-gray-800 last:border-0">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xs text-gray-500 font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg font-semibold text-purple-400 capitalize">{key}</h3>
                    </div>
                    {isImageUrl(value) ? (
                      <div className="relative group bg-gray-800 p-2 rounded-lg">
                        <img
                          src={value}
                          alt={key}
                          className="w-full max-h-60 object-cover rounded border border-gray-700"
                          onClick={() => setSelectedImage(value)}
                        />
                        <button
                          onClick={() => setSelectedImage(value)}
                          className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-purple-500 transition-all"
                        >
                          <Maximize2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-300 leading-relaxed ml-7">{value}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-300">No feedback available.</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-800 p-4">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              Close Report
            </button>
          </div>
        </div>

        {selectedImage && <ImageViewer src={selectedImage} onClose={() => setSelectedImage(null)} />}
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes zoomIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
          .animate-zoomIn {
            animation: zoomIn 0.3s ease-out;
          }
        `}
      </style>
    </>
  );
};

export default FeedbackModal;
