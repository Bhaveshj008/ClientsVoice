import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContext } from '../../utils/FormContext';
import { generateForm, createOrEditSpace } from './formService';
import { compressImage, uploadToCloudinary } from '../../../services/imageService';
import Modal from '../Modal';
import SpaceFormBase from './SpaceFormBase';
import FormGenerator from './FormGenerator';

function RightSidebar({ mode = 'create', initialData }) {
  const {
    formConfig,
    setFormConfig,
    handleLogoChange,
    updateFormConfigFromApi,
    spaceName,
    handleSpaceNameChange,
    getFormConfigs,
    toggleIsGenerating,
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
      toggleIsGenerating(false);
    }
  };

  const handleCreateSpace = async (e) => {
    e.preventDefault();
    
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
    }
  };

  return (
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
        )}

        <button
          type="submit"
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
    </div>
  );
}

export default RightSidebar;  
