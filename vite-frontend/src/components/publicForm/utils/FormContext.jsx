// FormContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../../api';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ spaceName, children }) => {
    const [formConfig, setFormConfig] = useState(null);
    const [formData, setFormData] = useState({ testimonial: {}, feedback: {} });
    const [currentForm, setCurrentForm] = useState('testimonial');

    useEffect(() => {
        const fetchFormConfig = async () => {
            try {
                const response = await api.get(`/form/${spaceName}`);
                setFormConfig(response.data);
            } catch (error) {
                console.error("Error fetching form configuration:", error);
            }
        };
        fetchFormConfig();
    }, [spaceName]);

  const handleInputChange = (formType, fieldId, value) => {
    if (value instanceof File) {
        // Handle file inputs
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prevData => ({
                ...prevData,
                [formType]: {
                    ...prevData[formType],
                    [fieldId]: reader.result, // Store Base64 representation of the file
                },
            }));
        };
        reader.readAsDataURL(value);
    } else {
        // Handle other input types
        setFormData(prevData => ({
            ...prevData,
            [formType]: {
                ...prevData[formType],
                [fieldId]: value,
            },
        }));
    }
};


    const handleNext = () => setCurrentForm('feedback');
    const handlePrevious = () => setCurrentForm('testimonial');

    const handleSubmit = async () => {
        try {
            await api.post(`/submit/${spaceName}`, formData);
            console.log(formData)
            alert("Forms submitted successfully!");
        } catch (error) {
            console.error("Error submitting forms:", error);
        }
    };

    return (
        <FormContext.Provider value={{
            formConfig,
            formData,
            currentForm,
            handleInputChange,
            handleNext,
            handlePrevious,
            handleSubmit,
        }}>
            {children}
        </FormContext.Provider>
    );
};
