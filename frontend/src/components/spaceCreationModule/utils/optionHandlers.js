// utils/optionUtils.js

/**
 * Adds an empty option to the options array of a specific field.
 * @param {Array} options - The current options array for the field.
 * @returns {Array} - A new array with an added empty option.
 */
export const addOption = (options) => {
    return [...options, { label: '', value: '' }];
  };
  
  /**
   * Removes an option at the specified index in the options array.
   * @param {Array} options - The current options array for the field.
   * @param {number} index - The index of the option to be removed.
   * @returns {Array} - A new array with the specified option removed.
   */
  export const removeOption = (options, index) => {
    return options.filter((_, i) => i !== index);
  };
  
  /**
   * Updates the label or value of an option in the options array.
   * @param {Array} options - The current options array for the field.
   * @param {number} index - The index of the option to be updated.
   * @param {string} key - The key to be updated, either 'label' or 'value'.
   * @param {string} value - The new value to be set for the specified key.
   * @returns {Array} - A new array with the updated option.
   */
  export const updateOption = (options, index, key, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][key] = value;
    return updatedOptions;
  };
  