import React from 'react';

const TextAreaField = ({ label, value, onChange, minLength }) => (
  <div>
    <label className="block text-sm font-medium text-white">{label}</label>
    <textarea
      className="mt-1 p-2 w-full border border-gray-600 rounded bg-gray-800 text-white focus:border-purple-500"
      value={value}
      onChange={onChange}
      minLength={minLength}
    />
  </div>
);

export default TextAreaField;
