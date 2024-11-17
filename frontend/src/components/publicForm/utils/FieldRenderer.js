// FieldRenderer.js
import React from 'react';

const FieldRenderer = ({ field, handleInputChange, value }) => {
    const handleChange = (e) => {
        const newValue = field.type === 'file' ? e.target.files[0] : e.target.value;
        handleInputChange(field.id, newValue);
    };

    const renderField = () => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'url':
            case 'tel':
            case 'password':
            case 'search':
            case 'range':
                return (
                    <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={value}
                        className="w-full p-2 border border-gray-300 rounded"
                        style={{ ...field.style }}
                        onChange={handleChange}
                    />
                );
            // Text Area
            case 'textarea':
                return (
                    <textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        style={{ ...field.styles }}
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={handleChange}
                    />
                );

            // Checkbox
            case 'checkbox':
                return (
                  <div>
                    {field.options?.map((option, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={field.id + '-' + index} // Unique ID for each checkbox
                          name={field.name} // Optionally use a common name
                          value={option.value}
                          required={field.required}
                          className="mr-2"
                          onChange={(e) => handleInputChange(field.id, option.value, e.target.checked)} // Track individual checkbox changes
                          style={{ ...field.style }}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                );
              
            // Radio buttons
            case 'radio':
                return (
                    <div className="space-y-2">
                        {field.options?.map(option => (
                            <label key={option.value} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
                                    required={field.required}
                                    className="mr-2"
                                    onChange={handleChange}
                                    style={{ ...field.style }}
                                />
                                <span>{option.label}</span>
                            </label>
                        ))}
                    </div>
                );

            // Dropdown select
            case 'select':
                return (
                    <select
                        id={field.id}
                        required={field.required}
                        style={{ ...field.styles }}
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={handleChange}
                    >
                        <option value="">{field.placeholder || 'Select an option'}</option>
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            // Specialized inputs
            case 'color':
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'week':
            case 'time':
            case 'hidden':
                return (
                    <input
                        id={field.id}
                        type={field.type}
                        required={field.required}
                        style={{ ...field.styles }}
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={handleChange}
                    />
                );

            // File input
            case 'file':
                return (
                    <input
                        id={field.id}
                        type="file"
                        required={field.required}
                        style={{ ...field.styles }}
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={handleChange}
                    />
                );

            // Image input
            case 'image':
                return (
                    <input
                        type="image"
                        src={field.src}
                        alt={field.alt || field.label} 
                        style={{ ...field.styles }}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                );

                default:
                    return <p>Unsupported field type: {field.type}</p>;
            }
        };
    
        return (
            <div
                className="mb-4 p-4 border border-gray-300 rounded shadow-sm"
                style={{ ...field.containerStyle }}
            >
                {field.label && <label htmlFor={field.id} className="block font-medium mb-2">{field.label}</label>}
                {renderField()}
            </div>
        );
    };
    
    export default FieldRenderer;