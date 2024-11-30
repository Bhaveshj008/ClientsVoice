import React from 'react';

const InputField = React.forwardRef(({ label, value, onChange, autoFocus }, ref) => (
  <div>
    <label className="block text-sm font-medium text-white">{label}</label>
    <input
      type="text"
      className="mt-1 p-2 w-full border border-gray-600 rounded bg-gray-800 text-white focus:border-purple-500"
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      ref={ref}
    />
  </div>
));

export default InputField;
