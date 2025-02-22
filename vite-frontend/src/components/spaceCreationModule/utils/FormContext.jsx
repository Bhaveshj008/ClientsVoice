import React, { createContext, useState } from 'react';

// Create the context
export const FormContext = createContext();

export function FormProvider({ children }) {
  const [activeForm, setActiveForm] = useState('feedback');
  const [spaceName, setSpaceName] = useState(''); // Shared space name for all forms
  const [isGenerating, setIsGenerating] = useState(false);

  // Initial empty form configurations
  const [formConfigs, setFormConfigs] = useState({
    feedback: {
      title: 'Feedback Form',
      fields: [], // This will be populated with the form fields
    },
    testimonial: {
      title: 'Testimonial Form',
      fields: [], // This will be populated with the form fields
    },
    thankYou: {
      title: 'Thank You!',
      fields: [
        { id: 'message', type: 'label', label: 'Thank you for your submission!', style: { width: '100%' } },
      ],
    },
  });

  const [logo, setLogo] = useState(''); // Shared logo for all forms
<<<<<<< HEAD
  const [logo_for_upload, setLogo_for_uplaod]= useState('');
=======
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
  const [selectedFieldId, setSelectedFieldId] = useState(null); // Track selected field

  // Get current form configuration, including the shared logo and space name
  const formConfig = {
    ...formConfigs[activeForm],
    logo,
    spaceName, // Include the shared space name in each form
  };

  const initializeForm = (formType) => {
    setActiveForm(formType);
    setSelectedFieldId(null); // Reset selected field when switching forms
  };

  const setFormConfig = (configUpdate) => {
    setFormConfigs((prevConfigs) => ({
      ...prevConfigs,
      [activeForm]: {
        ...prevConfigs[activeForm],
        ...configUpdate,
        fields: configUpdate.fields || prevConfigs[activeForm].fields,
      },
    }));
  };

  const handleLogoChange = (file) => {
<<<<<<< HEAD
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create a temporary URL for the file
      setLogo(imageURL); 
      setLogo_for_uplaod(file);
=======
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // Set Base64 string as logo
      };
      reader.readAsDataURL(file);
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
    }
  };

  // Function to update form configuration based on API response
  const updateFormConfigFromApi = (apiResponse) => {
    // Assuming apiResponse contains the required configurations
    setFormConfigs((prevConfigs) => ({
      feedback: {
        ...prevConfigs.feedback,
        fields: apiResponse.feedbackFormConfig.feedbackFormConfig || [],
      },
      testimonial: {
        ...prevConfigs.testimonial,
        fields: apiResponse.testimonialFormConfig.fields || [],
      },
    }));
  };

  const handleSpaceNameChange = (name) => {
    setSpaceName(name); // Update space name across all forms
  };

  const addField = (type) => {
    const newField = {
      id: Date.now().toString(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
<<<<<<< HEAD
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
=======
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
      placeholder: 'placeholder',
      required: false,
      style: { width: '100%' },
      options: type === 'select' ? [{ value: 'option1', label: 'Option 1' }] : [],
    };
    setFormConfig({
      fields: [...(formConfig.fields || []), newField],
    });
    setSelectedFieldId(newField.id); // Select the newly added field
  };

  const updateField = (id, key, value) => {
    setFormConfig({
      fields: (formConfig.fields || []).map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      ),
    });
  };

  const removeField = (id) => {
    setFormConfig({
      fields: (formConfig.fields || []).filter((field) => field.id !== id),
    });
    if (selectedFieldId === id) {
      setSelectedFieldId(null); // Deselect if removed
    }
  };

  const selectField = (id) => {
    setSelectedFieldId(id); // Update selected field
  };

  // New method to retrieve the form configurations separately
  const getFormConfigs = () => ({
    feedbackFormConfig: formConfigs.feedback,
    testimonialFormConfig: formConfigs.testimonial,
  });
  const toggleIsGenerating = (value) => {
    setIsGenerating(value);
  };

  return (
    <FormContext.Provider value={{
      formConfig,
      setFormConfig,
      initializeForm,
      handleLogoChange,
      handleSpaceNameChange, // Provide function to change space name
      addField,
      updateField,
      removeField,
      activeForm,
      logo,
      spaceName, // Provide space name to be used in main container
      selectedFieldId,
      selectField,
      updateFormConfigFromApi,
      getFormConfigs, // Expose the method to get form configurations
      toggleIsGenerating,
<<<<<<< HEAD
      isGenerating,
      logo_for_upload
=======
      isGenerating
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225

    }}>
      {children}
    </FormContext.Provider>
  );
}
