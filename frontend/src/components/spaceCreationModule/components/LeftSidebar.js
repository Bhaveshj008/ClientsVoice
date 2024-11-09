import React, { useState, useContext } from "react";
import { FormContext } from '../utils/FormContext';

function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { formConfig, addField, updateField, removeField, selectedFieldId, selectField } = useContext(FormContext);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={` ${isCollapsed ? "w-16" : "w-1/4"} bg-gray-100 p-4 border-r border-gray-300 transition-all duration-300 ease-in-out`}>
      <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none mb-4">
        {isCollapsed ? ">>" : "<<"}
      </button>

      {!isCollapsed && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Customize Form</h2>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200 flex justify-between items-center"
            >
              Add Field
              <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
                <ul className="py-1">
                  <li onClick={() => { addField('text'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Text Field</li>
                  <li onClick={() => { addField('email'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Email Field</li>
                  <li onClick={() => { addField('select'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Select Field</li>
                  <li onClick={() => { addField('textarea'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Textarea Field</li>
                  <li onClick={() => { addField('number'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Number Field</li>
                  <li onClick={() => { addField('date'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Date Field</li>
                  <li onClick={() => { addField('checkbox'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Checkbox</li>
                  <li onClick={() => { addField('radio'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Radio Button Group</li>
                  <li onClick={() => { addField('file'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">File Upload</li>
                  <li onClick={() => { addField('password'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Password Field</li>
                  <li onClick={() => { addField('tel'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Phone Number Field</li>
                  <li onClick={() => { addField('url'); setIsDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">URL Field</li>
                </ul>
              </div>
            )}
          </div>


          {selectedFieldId && formConfig.fields.length > 0 && (
            <div className="mt-4">
              {formConfig.fields.map((field) => (
                field.id === selectedFieldId && (
                  <div key={field.id} className="mb-4 border-b pb-2">
                    <h3 className="font-semibold text-gray-700">{field.label}</h3>

                    <div className="mt-2">
                      <label className="block text-sm text-gray-600">Label</label>
                      <input
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                        value={field.label}
                        onChange={(e) => updateField(field.id, 'label', e.target.value)}
                      />

                      <label className="block text-sm text-gray-600 mt-2">Placeholder</label>
                      <input
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                        value={field.placeholder || ""}
                        onChange={(e) => updateField(field.id, 'placeholder', e.target.value)}
                      />

                      <label className="block text-sm text-gray-600 mt-2">Required</label>
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={() => updateField(field.id, 'required', !field.required)}
                      />

                      <label className="block text-sm text-gray-600 mt-2">Font Size</label>
                      <input
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                        value={field.styles?.fontSize || "16px"}
                        onChange={(e) =>
                          updateField(field.id, 'styles', {
                            ...field.styles,
                            fontSize: e.target.value,
                          })
                        }
                      />

                      <label className="block text-sm text-gray-600 mt-2">Background Color</label>
                      <input
                        type="color"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                        value={field.styles?.backgroundColor || "#ffffff"}
                        onChange={(e) =>
                          updateField(field.id, 'styles', {
                            ...field.styles,
                            backgroundColor: e.target.value,
                          })
                        }
                      />

                      <button
                        onClick={() => removeField(field.id)}
                        className="text-red-500 mt-2 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
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
