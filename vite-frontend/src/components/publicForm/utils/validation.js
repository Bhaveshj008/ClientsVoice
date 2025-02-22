export const validateField = (field, value) => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
  
    switch (field.type) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
  
      case 'tel':
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(value)) {
          return 'Please enter a valid phone number';
        }
        break;
  
      case 'url':
        try {
          new URL(value);
        } catch {
          return 'Please enter a valid URL';
        }
        break;
  
      case 'file':
        if (value) {
          const maxSize = field.maxSize || 5;
          const maxSizeInBytes = maxSize * 1024 * 1024;
          if (value.size > maxSizeInBytes) {
            return `File size must be less than ${maxSize}MB`;
          }
  
          const allowedTypes = field.acceptedTypes || ['image/jpeg', 'image/png', 'image/gif'];
          if (!allowedTypes.includes(value.type)) {
            return `File must be of type: ${allowedTypes.join(', ')}`;
          }
        }
        break;
    }
  
    return null;
  };
  
  export const validateForm = (formType, formConfig, formData, setValidationErrors) => {
    const currentFormConfig = formType === 'testimonial' 
      ? formConfig?.testimonialFormConfig 
      : formConfig?.feedbackFormConfig;
    
    const errors = {};
    
    currentFormConfig?.fields.forEach(field => {
      const value = formData[formType]?.[field.id];
      const error = validateField(field, value);
      if (error) {
        errors[field.id] = error;
      }
    });
  
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };