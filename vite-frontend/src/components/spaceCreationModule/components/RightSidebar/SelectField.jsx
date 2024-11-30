import React from 'react';

const SelectField = ({ label, options, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white">{label}</label>
    <select
      className="mt-1 p-2 w-full border border-gray-600 rounded bg-gray-800 text-white focus:border-purple-500"
      value={value}
      onChange={onChange}
    >
      <option value="">Select</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default SelectField;
