import React from 'react';
import { Upload } from 'lucide-react';

const FieldRenderer = ({ field, handleInputChange, value }) => {
    const baseInputClasses = "w-full px-4 py-2.5 text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200";

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
                        className={baseInputClasses}
                        style={{ ...field.style }}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
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

            case 'radio':
                return (
                    <div className="space-y-2">
                        {field.options?.map(option => (
                            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
                                    checked={value === option.value}
                                    className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                    style={{ ...field.style }}
                                />
                                <span className="text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'select':
                return (
                    <select
                        id={field.id}
                        value={value}
                        required={field.required}
                        className={baseInputClasses}
                        style={{ ...field.style }}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                    >
                        <option value="">{field.placeholder || 'Select an option'}</option>
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

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
                        value={value}
                        className={baseInputClasses}
                        style={{ ...field.style }}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                );

            case 'image':
                return (
                    <input
                        type="image"
                        src={field.src}
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