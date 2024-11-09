import React, { useContext, useState } from "react";
import { FormContext } from '../utils/FormContext';
import api from '../../api';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

function RightSidebar() {
  const { 
    formConfig, 
    setFormConfig, 
    handleLogoChange, 
    updateFormConfigFromApi, 
    spaceName, 
    handleSpaceNameChange ,
    getFormConfigs 
  } = useContext(FormContext);
  console.log(getFormConfigs())

  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); // Loading state for API call
  const [isGenerateDisabled, setIsGenerateDisabled] = useState(true); // Button disable state
  const [organizationName, setOrganizationName] = useState(''); // State for organization name
  const [businessCategory, setBusinessCategory] = useState(''); // State for business category
  const [showModal, setShowModal] = useState(false);

  const handleChange = (key, value) => {
    setFormConfig({
      ...formConfig,
      [key]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleLogoChange(file);
    }
  };

  const handlePromptChange = (e) => {
    const value = e.target.value;
    setPrompt(value);
    setIsGenerateDisabled(value.length < 20); // Disable if prompt length is less than 20
  };

  const handleFormGeneration = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading indicator
    setIsGenerateDisabled(true); // Disable button to prevent multiple clicks

    try {
      const formData = { prompt };
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const { data } = await api.post('/generate-form', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(data);
      alert('Form generated successfully');
      updateFormConfigFromApi(data); // Store response in the context
    } catch (error) {
      console.error(error.response?.data?.message || 'Error generating form');
    } finally {
      setIsLoading(false); // Hide loading indicator
      setIsGenerateDisabled(true); // Re-disable after response
    }
  };

  const handleCreateSpace = async (e) => {
    const { feedbackFormConfig, testimonialFormConfig } = getFormConfigs();
    e.preventDefault();
    setIsLoading(true); // Show loading indicator

    // Prepare the space data for submission
    const spaceData = {
      spaceName,
      logo: formConfig.logo, // Assuming logo is stored in formConfig
      organizationName: organizationName,
      businessCategory: businessCategory,
      feedbackFormConfig: feedbackFormConfig, // Send feedbackFormConfig directly
      testimonialFormConfig: testimonialFormConfig,
      feedbackFormConfig:  feedbackFormConfig,
      testimonialFormConfig:testimonialFormConfig,
    };
    console.log(spaceData)
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const { data } = await api.post('/createSpace', spaceData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Space created successfully:');
      setShowModal(true); 
      setTimeout(() => {
        navigate(`/space/dashboard/${data._id}`);
      }, 3000);
      // Optionally reset form or redirect
    } catch (error) {
      console.error('Error creating space:', error.response?.data?.message || 'An error occurred');
      alert('Error creating space');
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/space/dashboard'); // Redirect after closing the modal
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4 border-l border-gray-300">
      <h2 className="text-xl font-semibold mb-4">Create New Space</h2>
      <form className="space-y-4" onSubmit={handleCreateSpace}>
        <div>
          <label className="block text-sm font-medium">Space name</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={spaceName}
            onChange={(e) => handleSpaceNameChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Form Heading</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={formConfig.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Space Logo</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Organization name</label>
          <input
            type="text"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
          />
        </div>
        <div>
  <label className="block text-sm font-medium">Business Category</label>
  <select 
    className="mt-1 p-2 w-full border border-gray-300 rounded"
    value={businessCategory}
    onChange={(e) => setBusinessCategory(e.target.value)}
  >
    <option value="">Select</option>
    <option value="accounting">Accounting</option>
    <option value="advertising">Advertising</option>
    <option value="agriculture">Agriculture</option>
    <option value="construction">Construction</option>
    <option value="education">Education</option>
    <option value="finance">Finance</option>
    <option value="healthcare">Healthcare</option>
    <option value="hospitality">Hospitality</option>
    <option value="information_technology">Information Technology</option>
    <option value="insurance">Insurance</option>
    <option value="legal_services">Legal Services</option>
    <option value="manufacturing">Manufacturing</option>
    <option value="marketing">Marketing</option>
    <option value="media">Media</option>
    <option value="nonprofit">Nonprofit</option>
    <option value="real_estate">Real Estate</option>
    <option value="retail">Retail</option>
    <option value="shipping">Shipping and Logistics</option>
    <option value="social_media">Social Media</option>
    <option value="technology">Technology</option>
    <option value="tourism">Tourism</option>
    <option value="transportation">Transportation</option>
    <option value="wholesale">Wholesale</option>
    <option value="other">Other</option>
  </select>
</div>

        <div>
          <label className="block text-sm font-medium">Detailed prompt for Form generation</label>
          <textarea
            className="mt-1 p-2 w-full border border-gray-300 rounded"
            value={prompt}
            onChange={handlePromptChange} // Update prompt state and button status
          />
        </div>
        <div>
          <label className="block text-sm font-medium">You want to collect:</label>
          <div className="flex items-center space-x-2">
            <input type="checkbox" />
            <label>Feedback</label>
            <input type="checkbox" />
            <label>Testimonial</label>
          </div>
        </div>
        
        {/* Show loading indicator while waiting for the API response */}
        {isLoading && <div className="text-blue-500 text-center my-2">Generating form...</div>}
        
        <button
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          onClick={handleFormGeneration}
          disabled={isGenerateDisabled} // Disable if prompt length < 20 or during loading
        >
          Generate form
        </button>
        
        <button 
          type="submit" // Ensure this button submits the form
          className="w-full bg-gray-200 text-black py-2 rounded mt-2"
        >
          Create Space
        </button>
      </form>
      {showModal && (
        <Modal
          message="Your space has been successfully created!"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default RightSidebar;
