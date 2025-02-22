import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext } from '../../utils/FormContext';

import { AnimatePresence } from 'framer-motion';
import api from '../../../api';
import ThankYouModal from '../ThankYouModal/ThankYouModal';
import FormHeader from './FormHeader';
import FormFields from './FormFields';
import FormNavigation from './FormNavigation';
import { validateField, validateForm } from '../../utils/validation';
import { handleFileUploads } from '../../utils/fileUpload';

const FormContent = () => {
  const {
    formConfig,
    formData,
    currentForm,
    handleInputChange,
    handleNext,
    handlePrevious,
  } = useFormContext();

  const [fade, setFade] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => setFade(false), 300);
    return () => clearTimeout(timer);
  }, [currentForm]);

  const handleSubmit = async () => {
    if (!validateForm('feedback', formConfig, formData, setValidationErrors)) {
      return;
    }

    try {
      setIsSubmitting(true);
      const mapFieldsToLabels = (formFields, formData) => {
        return formFields.reduce((acc, field) => {
          const fieldLabel = field.name;
          acc[fieldLabel] = formData[field.id];
          return acc;
        }, {});
      };
console.log(formConfig)
      const feedbackFormData = mapFieldsToLabels(formConfig?.feedbackFormConfig?.fields, formData?.feedback || {});
      const testimonialFormData = mapFieldsToLabels(formConfig?.testimonialFormConfig?.fields, formData?.testimonial || {});
      console.log(feedbackFormData)
      // Handle file uploads
      await handleFileUploads(feedbackFormData, '/spaces/feedbackImages');
      await handleFileUploads(testimonialFormData, '/spaces/TestimoniesUsers');

      const data = {
        spaceId: formConfig?.spaceId,
        clientId: formConfig?.clientId,
        feedbackFormData,
        testimonialFormData
      };

      const response = await api.post('/form/submit', data);
      if (response.status === 200) {
        setIsModalOpen(true);
    }
  } catch (error) {
    console.error("Error submitting the form:", error);
    alert("There was an error submitting the form. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

const handleNextWithValidation = () => {
  if (validateForm('testimonial', formConfig, formData, setValidationErrors)) {
    handleNext();
  }
};

return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4 sm:p-6 md:p-8">
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <FormHeader formConfig={formConfig} currentForm={currentForm} />
        
        <FormFields
          currentForm={currentForm}
          formConfig={formConfig}
          handleInputChange={handleInputChange}
          formData={formData}
          validationErrors={validationErrors}
        />
        
        <FormNavigation
          currentForm={currentForm}
          handlePrevious={handlePrevious}
          handleNextWithValidation={handleNextWithValidation}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>

    <AnimatePresence>
      {isModalOpen && (
        <ThankYouModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </AnimatePresence>
  </div>
);
};
export default FormContent;