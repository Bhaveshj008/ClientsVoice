import React, { useContext, useState, useRef, useEffect } from 'react';
import { FormContext } from '../../utils/FormContext';
import { generateForm, createOrEditSpace } from './formService';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import FileInputField from './FileInputField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField';
import LoadingIndicator from './LoadingIndicator';
import { BUSINESS_CATEGORIES } from './businessCategories';

function RightSidebar({ mode, initialData }) {
  const {
    formConfig,
    setFormConfig,
    handleLogoChange,
    updateFormConfigFromApi,
    spaceName,
    handleSpaceNameChange,
    getFormConfigs,
    toggleIsGenerating,
  } = useContext(FormContext);

  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  useEffect(() => {
    if (mode === 'edit') {
      handleSpaceNameChange(initialData.space.spaceName);
      updateFormConfigFromApi(initialData.formConfig);
      setOrganizationName(initialData.space.organizationName);
      setBusinessCategory(initialData.space.businessCategory);
    }
  }, [initialData]);

  const handleFormGeneration = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toggleIsGenerating(true);

    try {
      const data = await generateForm(prompt);
      updateFormConfigFromApi(data);
    } catch (error) {
      console.error('Error generating form:', error.message);
    } finally {
      setIsLoading(false);
      toggleIsGenerating(false);
    }
  };

  const handleCreateSpace = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { feedbackFormConfig, testimonialFormConfig } = getFormConfigs();
      const spaceData = {
        spaceId: initialData?.space._id,
        spaceName,
        logo: formConfig.logo,
        organizationName,
        businessCategory,
        feedbackFormConfig,
        testimonialFormConfig,
      };

      const data = await createOrEditSpace(spaceData, mode);
      setShowModal(true);
      setTimeout(() => navigate(`/space/dashboard/${data._id}`), 3000);
    } catch (error) {
      console.error('Error creating space:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/4 bg-gray-900 p-4 border-l border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Create New Space</h2>
      <form className="space-y-4" onSubmit={handleCreateSpace}>
        <InputField label="Space name" value={spaceName} onChange={handleInputChange(handleSpaceNameChange)} />
        <InputField label="Form Heading" value={formConfig.title} onChange={(e) => setFormConfig({ ...formConfig, title: e.target.value })} />
        <FileInputField label="Space Logo" onChange={handleLogoChange} />
        <InputField label="Organization name" value={organizationName} onChange={handleInputChange(setOrganizationName)} />
        <SelectField label="Business Category" options={BUSINESS_CATEGORIES} value={businessCategory} onChange={handleInputChange(setBusinessCategory)} />

        {mode !== 'edit' && (
          <>
            <TextAreaField label="Detailed prompt for Form generation" value={prompt} onChange={(e) => setPrompt(e.target.value)} minLength={20} />
            {isLoading && <LoadingIndicator text="Generating form..." />}
            <button
              type="button"
              className="w-full border border-purple-500 rounded py-2 px-4 text-purple-300 hover:bg-purple-700 hover:text-white"
              onClick={handleFormGeneration}
            >
              Generate Form
            </button>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-purple-500 text-white font-semibold rounded py-2 px-4 hover:bg-purple-700 transition-all"
        >
          {isLoading ? 'Submitting...' : mode === 'edit' ? 'Save Changes' : 'Create Space'}
        </button>
      </form>
      {showModal && (
  <Modal
    message={mode === 'edit' ? "Your space has been successfully updated!" : "Your space has been successfully created!"}
    onClose={() => navigate('/space/dashboard')}
  />
)}

    </div>
  );
}

export default RightSidebar;
