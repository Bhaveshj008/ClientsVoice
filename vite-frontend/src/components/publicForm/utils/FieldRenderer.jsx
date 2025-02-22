<<<<<<< HEAD
import React from 'react';
import { Upload } from 'lucide-react';

const FieldRenderer = ({ field, handleInputChange, value }) => {
    const baseInputClasses = "w-full px-4 py-2.5 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";
=======
// FieldRenderer.js
import React from 'react';

const FieldRenderer = ({ field, handleInputChange, value }) => {
    const handleChange = (e) => {
        const newValue = field.type === 'file' ? e.target.files[0] : e.target.value;
        handleInputChange(field.id, newValue);
    };
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225

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
<<<<<<< HEAD
                        className={baseInputClasses}
                        style={{ ...field.style }}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                );

=======
                        className="w-full p-2 border border-gray-300 rounded"
                        style={{ ...field.style }}
                        onChange={handleChange}
                    />
                );
            // Text Area
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
            case 'textarea':
                return (
                    <textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
<<<<<<< HEAD
                        value={value}
                        className={`${baseInputClasses} min-h-[120px] resize-y`}
                        style={{ ...field.style }}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                );

            case 'checkbox':
                return (
                    <div className="space-y-2">
                        {field.options?.map((option, index) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id={`${field.id}-${index}`}
                                    name={field.name}
                                    value={option.value}
                                    checked={value === option.value}
                                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    onChange={(e) => handleInputChange(field.id, option.value, e.target.checked)}
                                    style={{ ...field.style }}
                                />
                                <span className="text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                );

=======
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
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
            case 'radio':
                return (
                    <div className="space-y-2">
                        {field.options?.map(option => (
<<<<<<< HEAD
                            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
=======
                            <label key={option.value} className="flex items-center space-x-2">
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
<<<<<<< HEAD
                                    checked={value === option.value}
                                    className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                    style={{ ...field.style }}
                                />
                                <span className="text-gray-700">{option.label}</span>
=======
                                    required={field.required}
                                    className="mr-2"
                                    onChange={handleChange}
                                    style={{ ...field.style }}
                                />
                                <span>{option.label}</span>
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
                            </label>
                        ))}
                    </div>
                );

<<<<<<< HEAD
=======
            // Dropdown select
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
            case 'select':
                return (
                    <select
                        id={field.id}
<<<<<<< HEAD
                        value={value}
                        required={field.required}
                        className={baseInputClasses}
                        style={{ ...field.style }}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
=======
                        required={field.required}
                        style={{ ...field.styles }}
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={handleChange}
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
                    >
                        <option value="">{field.placeholder || 'Select an option'}</option>
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

<<<<<<< HEAD
            case 'file':
                return (
                    <div className="relative">
                        <input
                            id={field.id}
                            type="file"
                            required={field.required}
                            className="hidden"
                            onChange={(e) => handleInputChange(field.id, e.target.files[0])}
                        />
                        <label
                            htmlFor={field.id}
                            className="flex items-center justify-center px-4 py-2.5 w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors"
                            style={{ ...field.style }}
                        >
                            <Upload className="w-5 h-5 mr-2 text-gray-400" />
                            <span className="text-gray-600">
                                {value ? value.name : 'Choose a file...'}
                            </span>
                        </label>
                    </div>
                );

=======
            // Specialized inputs
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
            case 'color':
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'week':
            case 'time':
<<<<<<< HEAD
=======
            case 'hidden':
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
                return (
                    <input
                        id={field.id}
                        type={field.type}
                        required={field.required}
<<<<<<< HEAD
                        value={value}
                        className={baseInputClasses}
                        style={{ ...field.style }}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                );

=======
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
                        onChange={(e) => handleInputChange(field.id, e.target.files[0])}
                    />
                );

            // Image input
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
            case 'image':
                return (
                    <input
                        type="image"
                        src={field.src}
<<<<<<< HEAD
                        alt={field.alt || field.label}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        style={{ ...field.style }}
                    />
                );

            default:
                return <p className="text-red-500">Unsupported field type: {field.type}</p>;
        }
    };

    return (
        <div className="space-y-2">
            {field.label && (
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            {renderField()}
            {field.description && (
                <p className="mt-1 text-sm text-gray-500">{field.description}</p>
            )}
        </div>
    );
};

export default FieldRenderer;
=======
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
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
