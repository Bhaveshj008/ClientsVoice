import React, { useContext } from 'react';
import { FormContext } from '../../utils/FormContext';
import InputField from './InputField';
import FileInputField from './FileInputField';
import SelectField from './SelectField';
import { BUSINESS_CATEGORIES } from './businessCategories';

function SpaceFormBase({ 
  spaceName,
  organizationName,
  businessCategory,
  formConfig,
  handleSpaceNameChange,
  handleInputChange,
  setFormConfig,
  handleLogoChange,
  error,
  success,
  mode
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-white">
        {mode === 'edit' ? 'Edit Space' : 'Create New Space'}
      </h2>

      {error && <div className="mb-4 p-3 bg-red-500 text-white rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-500 text-white rounded">{success}</div>}

      <InputField
        label="Space name"
        value={spaceName}
        onChange={(e) => handleSpaceNameChange(e.target.value)}
        required
      />
      
      <InputField
        label="Form Heading"
        value={formConfig.title}
        onChange={(e) => setFormConfig({ ...formConfig, title: e.target.value })}
        required
      />
      
      <FileInputField
        label="Space Logo"
        onChange={handleLogoChange}
        accept="image/*"
      />
      
      <InputField
        label="Organization name"
        value={organizationName}
        onChange={(e) => handleInputChange('organizationName', e.target.value)}
        required
      />
      
      <SelectField
        label="Business Category"
        options={BUSINESS_CATEGORIES}
        value={businessCategory}
        onChange={(e) => handleInputChange('businessCategory', e.target.value)}
        required
      />
    </div>
  );
}
export default SpaceFormBase;