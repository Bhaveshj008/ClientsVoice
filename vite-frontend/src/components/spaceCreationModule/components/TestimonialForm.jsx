import React, { useContext } from 'react';
import { FormContext } from '../utils/FormContext';
import FieldRenderer from '../utils/FieldRenderer';

function TestimonialForm() {
  const { formConfig, updateField, removeField, selectField } = useContext(FormContext);

  return (
    <div className="flex-1 bg-white p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{formConfig.spaceName}</h2>
      {formConfig.logo ? (
          <img src={formConfig.logo} alt="Logo" className="mb-4 w-32 h-32 mx-auto rounded-full" />
      ) : (
          <div className="mb-4 w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
              Logo
          </div>
      )}
      <h1 className="text-4xl font-extrabold mb-6 text-center">{formConfig.title}</h1>

      {formConfig.fields.length === 0 ? (
          <p className="text-gray-400 text-center">No fields added yet.</p>
      ) : (
          formConfig.fields.map((field) => (
              <div
                  key={field.id}
                  className="mb-2 cursor-pointer hover:bg-gray-100 transition duration-150"
                  onClick={() => selectField(field.id)}
              >
                  <FieldRenderer
                      field={field}
                      onUpdate={updateField}
                      onDelete={removeField}
                  />
              </div>
          ))
      )}
    </div>
  );
}

export default TestimonialForm;
