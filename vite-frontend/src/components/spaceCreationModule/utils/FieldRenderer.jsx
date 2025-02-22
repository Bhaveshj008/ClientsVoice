  import React from 'react';

  const FieldRenderer = ({ field, onUpdate, onDelete }) => {
    const handleChange = (e) => {
      // Update the field value in the parent context
      onUpdate(field.id, 'value', e.target.value);
    };

    const renderField = () => {
      switch (field.type) {
        // Text Inputs
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
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              style={{ ...field.styles }}
<<<<<<< HEAD
              onChange={handleChange}z
=======
              onChange={handleChange}
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
            />
          );
        // Text Areas
        case 'textarea':
          return (
            <textarea
              placeholder={field.placeholder}
              required={field.required}
              style={{ ...field.styles }}
              onChange={handleChange}
            />
          );
        // Selection Inputs
        case 'checkbox':
          return (
            <div>
              {field.options?.map((option, index) => (
                <label key={index} className="inline-flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={field.name}
                    value={option.value}
                    required={field.required}
                    style={field.styles}
                    onChange={handleChange}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          );
        case 'radio':
          return (
            <div>
              {field.options?.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    required={field.required}
                    style={field.styles}
                    onChange={handleChange}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          );
        case 'select':
          return (
            <select
              required={field.required}
              style={{ ...field.styles }}
              onChange={handleChange}
            >
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );
        // Specialized Inputs
        case 'color':
          return (
            <input
              type="color"
              required={field.required}
              style={{ ...field.styles }}
              onChange={handleChange}
            />
          );
        case 'date':
          return (
            <input
              type="date"
              required={field.required}
              style={{ ...field.styles }}
              onChange={handleChange}
            />
          );
        case 'datetime-local':
          return (
            <input
              type="datetime-local"
              required={field.required}
              style={{ ...field.styles }}
              onChange={handleChange}
            />
          );
        case 'month':
          return (
            <input
              type="month"
              required={field.required}
              style={{ ...field.styles }}
              onChange={handleChange}
            />
          );
        case 'week':
          return (
            <input
              type="week"
              required={field.required}
              style={{ ...field.styles }}
              onChange={handleChange}
            />
          );
        case 'file':
          return (
            <input
              type="file"
              required={field.required}
              style={{ ...field.styles }}
              onChange={handleChange}
            />
          );
        case 'time':
          return (
            <input
              type="time"
              required={field.required}
              style={{ ...field.styles }}
              onChange={handleChange}
            />
          );
        case 'image':
          return (
            <input
              type="image"
              src={field.src} // You can provide an image source URL
              alt={field.alt} // Provide alt text
              required={field.required}
              style={{ ...field.styles }}
              onChange={handleChange}
            />
          );
        case 'hidden':
          return (
            <input
              type="hidden"
              value={field.value} // Maintain a value for hidden inputs
              style={{ ...field.styles }}
            />
          );
        default:
          return null;
      }
    };

    return (
      <div
        className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200 ease-in-out"
        style={{ ...field.styles }}
      >
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-semibold text-gray-700">{field.label}</label>
          <button
            onClick={() => onDelete(field.id)}
            className="text-red-500 hover:text-red-600 transition-colors duration-200 text-sm"
          >
            Delete
          </button>
        </div>
        <div className="mb-2">{renderField()}</div>
      </div>
    );
    
  };

  export default FieldRenderer;
