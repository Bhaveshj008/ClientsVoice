import React, { useState, useContext } from "react";
import { FormContext } from '../utils/FormContext';
import { addOption, removeOption, updateOption } from '../utils/optionHandlers';
import { AiOutlinePlus, AiOutlineClose, AiOutlineDelete, AiOutlineTool } from 'react-icons/ai';

function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { formConfig, addField, updateField, removeField, selectedFieldId } = useContext(FormContext);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleAddOption = (fieldId) => {
    const field = formConfig.fields.find(f => f.id === fieldId);
    updateField(fieldId, 'options', addOption(field.options || []));
  };

  const handleRemoveOption = (fieldId, index) => {
    const field = formConfig.fields.find(f => f.id === fieldId);
    updateField(fieldId, 'options', removeOption(field.options, index));
  };

  const handleUpdateOption = (fieldId, index, key, value) => {
    const field = formConfig.fields.find(f => f.id === fieldId);
    updateField(fieldId, 'options', updateOption(field.options, index, key, value));
  };

  const handleUpdateField = (fieldId, key, value) => {
    updateField(fieldId, key, value);
  };

  return (
<<<<<<< HEAD
    <div className={` ${isCollapsed ? "w-16" : "w-1/4"} p-4 border-r border-purple-700 transition-all duration-300 ease-in-out`}>
=======
    <div className={` ${isCollapsed ? "w-16" : "w-1/4"} bg-gray-900 p-4 border-r border-gray-700 transition-all duration-300 ease-in-out`}>
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="text-gray-400 hover:text-gray-200 focus:outline-none mb-6">
      <div className="flex items-center mb-6">
  {isCollapsed ? (
    <AiOutlineTool size={30} />
  ) : (
    <>
      <AiOutlineTool size={30} className="mr-2" />
      <h2 className="text-xl font-semibold text-gray-200">Customize Form</h2>
    </>
  )}
</div>
</button>

      {!isCollapsed && (
        <div>
          

          {/* Dropdown for Adding Fields */}
          <div className="relative mb-6">
            <button
              onClick={toggleDropdown}
              className="w-full border border-neutral-700 text-white font-semibold py-2 px-4 rounded hover:border-purple-500 hover:text-purple-300 transition duration-200 flex justify-between items-center"
            >
              Add Field
              <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-purple-500 rounded shadow-lg">
                <ul className="py-1">
                  {['text', 'email', 'select', 'textarea', 'number', 'date', 'checkbox', 'radio', 'file', 'password', 'tel', 'url'].map((type) => (
                    <li
                      key={type}
                      onClick={() => { addField(type); setIsDropdownOpen(false); }}
                      className="px-4 py-2 hover:bg-purple-500 cursor-pointer text-white text-sm"
                    >
                      {`${type.charAt(0).toUpperCase() + type.slice(1)} Field`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Field Customization Section */}
          {selectedFieldId && formConfig.fields.length > 0 && (
            <div className="space-y-6">
              {formConfig.fields.map((field) => (
                field.id === selectedFieldId && (
                  <div key={field.id} className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                    <h3 className="text-lg font-semibold text-white mb-4">{field.label}</h3>

                    {/* Label */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-300 mb-1">Label</label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => handleUpdateField(field.id, 'label', e.target.value)}
                        className="p-2 w-full bg-gray-800 border border-gray-600   rounded text-white"
                      />
                    </div>

                    {/* Placeholder */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-300 mb-1">Placeholder</label>
                      <input
                        type="text"
                        value={field.placeholder || ''}
                        onChange={(e) => handleUpdateField(field.id, 'placeholder', e.target.value)}
                        className="p-2 w-full bg-gray-800 border border-gray-600 rounded text-white"
                      />
                    </div>
<<<<<<< HEAD
                    <div className="mb-4">
                      <label className="block text-sm text-gray-300 mb-1">Name (required for data collection, please provide it)</label>
                      <input
                        type="text"
                        value={field.name || ''}
                        onChange={(e) => handleUpdateField(field.id, 'name', e.target.value)}
                        className="p-2 w-full bg-gray-800 border border-gray-600 rounded text-white"
                      />
                    </div>
=======
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225

                    {/* Required Checkbox */}
                    <div className="mb-4 flex items-center">
                      <input
                        type="checkbox"
                        checked={field.required || false}
                        onChange={(e) => handleUpdateField(field.id, 'required', e.target.checked)}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-300">Required</label>
                    </div>

                    {/* Font Size */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-300 mb-1">Font Size</label>
                      <input
                        type="text"
                        className="p-2 w-full bg-gray-800 border border-gray-600 rounded text-white"
                        value={field.styles?.fontSize || "16px"}
                        onChange={(e) => updateField(field.id, 'styles', { ...field.styles, fontSize: e.target.value })}
                      />
                    </div>

                    {/* Background Color */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-300 mb-1">Background Color</label>
                      <input
                        type="color"
                        className="p-2 w-full bg-gray-800 border border-gray-600 rounded"
                        value={field.styles?.backgroundColor || "#ffffff"}
                        onChange={(e) => updateField(field.id, 'styles', { ...field.styles, backgroundColor: e.target.value })}
                      />
                    </div>

                    {/* Options for Select, Radio, Checkbox */}
                    {['select', 'radio', 'checkbox'].includes(field.type) && (
                      <div className="mb-4">
                        <label className="block text-sm text-gray-300 mb-2">Options</label>
                        {field.options && field.options.map((option, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <input
                              type="text"
                              placeholder="Label"
                              value={option.label}
                              className="mr-2 p-2 w-1/2 bg-gray-800 border border-gray-600 rounded text-white"
                              onChange={(e) => handleUpdateOption(field.id, index, 'label', e.target.value)}
                            />
                            <input
                              type="text"
                              placeholder="Value"
                              value={option.value}
                              className="mr-2 p-2 w-1/2 bg-gray-800 border border-gray-600 rounded text-white"
                              onChange={(e) => handleUpdateOption(field.id, index, 'value', e.target.value)}
                            />
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleRemoveOption(field.id, index)}
                            >
                              <AiOutlineClose size={18} />
                            </button>
                          </div>
                        ))}
                        <button
                          className="text-purple-400 mt-2 flex items-center hover:text-purple-300"
                          onClick={() => handleAddOption(field.id)}
                        >
                          <AiOutlinePlus size={16} className="mr-1" /> Add Option
                        </button>
                      </div>
                    )}

                    {/* Delete Field */}
                    <button
                      onClick={() => removeField(field.id)}
                      className="text-red-500 hover:text-red-700 flex items-center mt-4"
                    >
                      <AiOutlineDelete size={18} className="mr-2" /> Delete Field
                    </button>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LeftSidebar;
