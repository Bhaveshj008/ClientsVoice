import React from 'react';

const FieldRenderer = ({ field, handleInputChange }) => {
    const handleChange = (e) => {
        const value = field.type === 'file' ? e.target.files[0] : e.target.value;
        handleInputChange(field.id, value);
    };

    const renderField = () => {
        switch (field.type) {
            // Basic input types
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
                        className="w-full p-2 border border-gray-300 rounded"
                        style={{ ...field.style }}
                        onChange={handleChange}
                    />
                );

            // Text area
            case 'textarea':
                return (
                    <textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full p-2 border border-gray-300 rounded"
                        style={{ ...field.style }}
                        onChange={handleChange}
                    />
                );

            // Select (dropdown) menu
            case 'select':
                return (
                    <select
                        id={field.id}
                        required={field.required}
                        className="w-full p-2 border border-gray-300 rounded"
                        style={{ ...field.style }}
                        onChange={handleChange}
                    >
                        {field.options?.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            // Checkbox
            case 'checkbox':
                return (
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id={field.id}
                            required={field.required}
                            className="mr-2"
                            onChange={(e) => handleInputChange(field.id, e.target.checked)}
                            style={{ ...field.style }}
                        />
                        <span>{field.label}</span>
                    </label>
                );

            // Radio button group
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

            // File input
            case 'file':
                return (
                    <input
                        id={field.id}
                        type="file"
                        required={field.required}
                        className="w-full p-2 border border-gray-300 rounded"
                        style={{ ...field.style }}
                        onChange={handleChange}
                    />
                );

            // Specialized inputs like date, color, etc.
            case 'color':
            case 'date':
            case 'datetime-local':
            case 'month':
            case 'week':
            case 'time':
                return (
                    <input
                        id={field.id}
                        type={field.type}
                        required={field.required}
                        className="w-full p-2 border border-gray-300 rounded"
                        style={{ ...field.style }}
                        onChange={handleChange}
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
