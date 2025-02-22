import React from 'react';
import FieldRenderer from '../../utils/FieldRenderer';

const FormFields = ({ 
  currentForm, 
  formConfig, 
  handleInputChange, 
  formData, 
  validationErrors 
}) => {
  const currentFormConfig = currentForm === 'testimonial'
    ? formConfig?.testimonialFormConfig
    : formConfig?.feedbackFormConfig;

  return (
    <div className="p-6 md:p-8 space-y-6">
      {currentFormConfig?.fields.map((field) => (
        <div key={field.id}>
          <FieldRenderer
            field={field}
            handleInputChange={(id, value) =>
              handleInputChange(currentForm, id, value)
            }
            value={formData[currentForm]?.[field.id] || ''}
          />
          {validationErrors[field.id] && (
            <p className="mt-1 text-sm text-red-600">
              {validationErrors[field.id]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormFields;