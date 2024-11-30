
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormContext, FormProvider } from '../utils/FormContext';
import FieldRenderer from '../utils/FieldRenderer';
import api from '../../api';
const FormContent = () => {
    const {
        formConfig,
        formData,
        currentForm,
        handleInputChange,
        handleNext,
        handlePrevious,
    } = useFormContext();

    const { spaceName } = useParams();
    const [fade, setFade] = useState(false);
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        setFade(true);
        setTransitioning(true);

        const timer = setTimeout(() => {
            setFade(false);
            setTransitioning(false); 
        }, 300); 

        return () => clearTimeout(timer);
    }, [currentForm]); 

   
    const handleSubmit = async () => {
        try {
         
            const mapFieldsToLabels = (formFields, formData) => {
                return formFields.reduce((acc, field) => {
                    const fieldLabel = field.label || field.name; 
                    acc[fieldLabel] = formData[field.id]; 
                    return acc;
                }, {});
            };

            const feedbackFormData = mapFieldsToLabels(formConfig?.feedbackFormConfig?.fields, formData?.feedback || {});
            const testimonialFormData = mapFieldsToLabels(formConfig?.testimonialFormConfig?.fields, formData?.testimonial || {});

            // Construct data object to send to backend
            const data = {
                spaceId: formConfig?.spaceId,  // Assuming spaceid is in formConfig
                feedbackFormData,
                testimonialFormData
            };
            console.log(data)
            // Send the data to the backend
            const response = await api.post('/form/submit', data);
            if (response.status === 200) {
                // Handle successful submission, e.g., show success message or redirect
                alert("Form submitted successfully!");
            }
        } catch (error) {
            console.error("Error submitting the form:", error);
            alert("There was an error submitting the form. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 p-8">
            <div
                className={`relative w-full max-w-lg sm:max-w-xl md:max-w-2xl p-8 bg-white bg-opacity-95 border border-gray-200 rounded-xl shadow-lg transform transition-all duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
            >
                {/* Form Header */}
                <div className="text-center space-y-4 mb-8">
                    {formConfig?.logo && (
                        <div className="flex justify-center mb-6">
                            <img
                                src={formConfig.logo}
                                alt="Space Logo"
                                className="w-24 h-24 rounded-full shadow-xl object-cover"
                            />
                        </div>
                    )}
                    <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">{formConfig?.name}</h2>
                    <p className="text-xl sm:text-2xl text-gray-700">
                        {currentForm === 'testimonial'
                            ? formConfig?.testimonialFormConfig?.title
                            : formConfig?.feedbackFormConfig?.title}
                    </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-6 mb-8">
                    {(currentForm === 'testimonial'
                        ? formConfig?.testimonialFormConfig
                        : formConfig?.feedbackFormConfig
                    )?.fields.map((field) => (
                        <FieldRenderer
                            key={field.id}
                            field={field}
                            handleInputChange={(id, value) =>
                                handleInputChange(currentForm, id, value)
                            }
                            value={formData[currentForm]?.[field.id] || ''}
                        />
                    ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap justify-between items-center pt-6 border-t border-gray-200 mt-8 space-x-4">
                    {currentForm === 'feedback' && (
                        <button
                            onClick={handlePrevious}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md transition transform hover:bg-indigo-700"
                        >
                            Testimonial
                        </button>
                    )}
                    {currentForm === 'testimonial' ? (
                        <button
                            onClick={handleNext}
                            className="ml-auto px-8 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transform transition duration-300 ease-in-out"
                        >
                            Feedback
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="ml-auto px-8 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-indigo-700  transform transition duration-300 ease-in-out"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const FormPage = () => {
    const { spaceName } = useParams();
    return (
        <FormProvider spaceName={spaceName}>
            <FormContent />
        </FormProvider>
    );
};

export default FormPage;
