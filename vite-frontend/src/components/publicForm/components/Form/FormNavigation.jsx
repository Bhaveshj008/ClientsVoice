import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const FormNavigation = ({ 
  currentForm, 
  handlePrevious, 
  handleNextWithValidation, 
  handleSubmit, 
  isSubmitting 
}) => {
  return (
    <div className="px-6 py-4 md:px-8 md:py-6 bg-gray-50 border-t border-gray-100">
      <div className="flex justify-between items-center">
        {currentForm === 'feedback' && (
          <button
            onClick={handlePrevious}
            className="flex items-center px-6 py-2.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Testimonial
          </button>
        )}
        {currentForm === 'testimonial' ? (
          <button
            onClick={handleNextWithValidation}
            className="flex items-center ml-auto px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-all transform active:scale-95"
          >
            Continue to Feedback
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center ml-auto px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-500 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              <span className="flex items-center">
                Submit Form
                <CheckCircle className="w-4 h-4 ml-2" />
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;
