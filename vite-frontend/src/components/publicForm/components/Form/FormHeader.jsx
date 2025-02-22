import React from 'react';

const FormHeader = ({ formConfig, currentForm }) => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 md:px-8 md:py-12">
      {formConfig?.logo && (
        <div className="absolute top-4 right-4">
          <img
            src={formConfig.logo}
            alt="Space Logo"
            className="w-16 h-16 rounded-lg shadow-lg object-cover ring-2 ring-white/50"
          />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
        {formConfig?.name}
      </h2>
      <p className="text-indigo-100 text-lg md:text-xl">
        {currentForm === 'testimonial'
          ? formConfig?.testimonialFormConfig?.title
          : formConfig?.feedbackFormConfig?.title}
      </p>
    </div>
  );
};

export default FormHeader;