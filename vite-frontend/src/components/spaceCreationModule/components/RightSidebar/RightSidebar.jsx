<<<<<<< HEAD
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../../utils/FormContext';
import { generateForm, createOrEditSpace } from './formService';
import { compressImage, uploadToCloudinary } from '../../../services/imageService';
import Modal from '../Modal';
import SpaceFormBase from './SpaceFormBase';
import FormGenerator from './FormGenerator';

function RightSidebar({ mode = 'create', initialData }) {
=======
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
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
  const {
    formConfig,
    setFormConfig,
    handleLogoChange,
    updateFormConfigFromApi,
    spaceName,
    handleSpaceNameChange,
    getFormConfigs,
    toggleIsGenerating,
<<<<<<< HEAD
    logo_for_upload
  } = useContext(FormContext);

  const navigate = useNavigate();
  const [state, setState] = useState({
    prompt: '',
    organizationName: '',
    businessCategory: '',
    showModal: false,
    isGeneratingForm: false,
    isSubmittingSpace: false,
    error: '',
    success: ''
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      handleSpaceNameChange(initialData.space.spaceName);
      updateFormConfigFromApi(initialData.formConfig);
      setState(prev => ({
        ...prev,
        organizationName: initialData.space.organizationName,
        businessCategory: initialData.space.businessCategory
      }));
    }
  }, [initialData, mode]);

  const handleInputChange = (field, value) => {
    setState(prev => ({ 
      ...prev, 
      [field]: value,
      error: '',
      success: ''
    }));
  };

  const handleFormGeneration = async () => {
    if (!state.prompt.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter a prompt for form generation' }));
      return;
    }

    setState(prev => ({ ...prev, isGeneratingForm: true, error: '', success: '' }));
    toggleIsGenerating(true);

    try {
      const data = await generateForm(state.prompt);
      updateFormConfigFromApi(data);
      setState(prev => ({ ...prev, success: 'Form generated successfully', error: '' }));
    } catch (error) {
      setState(prev => ({ ...prev, error: `Error generating form: ${error.message}`, success: '' }));
    } finally {
      setState(prev => ({ ...prev, isGeneratingForm: false }));
=======
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
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
      toggleIsGenerating(false);
    }
  };

  const handleCreateSpace = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    
    if (!spaceName?.trim() || !state.organizationName?.trim() || !state.businessCategory) {
      setState(prev => ({ 
        ...prev, 
        error: 'All fields are required'
      }));
      return;
    }

    setState(prev => ({ ...prev, isSubmittingSpace: true, error: '', success: '' }));

    try {
      const { feedbackFormConfig, testimonialFormConfig } = getFormConfigs();
      const uploadedLogoUrl = logo_for_upload ? 
        await uploadToCloudinary(await compressImage(logo_for_upload), '/spaces/logos') : null;

      const data = await createOrEditSpace({
        spaceId: initialData?.space._id,
        spaceName,
        logo: uploadedLogoUrl,
        organizationName: state.organizationName,
        businessCategory: state.businessCategory,
        feedbackFormConfig,
        testimonialFormConfig,
      }, mode);

      setState(prev => ({ 
        ...prev, 
        showModal: true,
        success: `Space ${mode === 'edit' ? 'updated' : 'created'} successfully`
      }));
      
      setTimeout(() => navigate(`/space/dashboard/${data._id}`), 2000);
    } catch (error) {
      setState(prev => ({ 
        ...prev,
        error: `Error ${mode === 'edit' ? 'updating' : 'creating'} space: ${error.message}`
      }));
    } finally {
      setState(prev => ({ ...prev, isSubmittingSpace: false }));
=======
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
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
    }
  };

  return (
<<<<<<< HEAD
    <div className="w-1/4 p-4 border-l border-purple-700">
      <form className="space-y-4" onSubmit={handleCreateSpace}>
        <SpaceFormBase
          spaceName={spaceName}
          organizationName={state.organizationName}
          businessCategory={state.businessCategory}
          formConfig={formConfig}
          handleSpaceNameChange={handleSpaceNameChange}
          handleInputChange={handleInputChange}
          setFormConfig={setFormConfig}
          handleLogoChange={handleLogoChange}
          error={state.error}
          success={state.success}
          mode={mode}
        />

        {mode !== 'edit' && (
          <FormGenerator
            prompt={state.prompt}
            isGeneratingForm={state.isGeneratingForm}
            handlePromptChange={(value) => handleInputChange('prompt', value)}
            handleFormGeneration={handleFormGeneration}
          />
=======
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
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
        )}

        <button
          type="submit"
<<<<<<< HEAD
          className="w-full bg-purple-500 text-white font-semibold rounded py-2 px-4 hover:bg-purple-700 transition-all disabled:opacity-50"
          disabled={state.isSubmittingSpace}
        >
          {state.isSubmittingSpace ? 'Submitting...' : mode === 'edit' ? 'Save Changes' : 'Create Space'}
        </button>
      </form>

      {state.showModal && (
        <Modal
          message={`Your space has been successfully ${mode === 'edit' ? 'updated' : 'created'}!`}
          onClose={() => navigate(`/space/dashboard/`)}
        />
      )}
=======
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

>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
    </div>
  );
}

<<<<<<< HEAD
export default RightSidebar;  
=======
export default RightSidebar;
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
