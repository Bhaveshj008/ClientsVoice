import React, { useContext, useState, useRef, useEffect } from "react";
import { FormContext } from '../utils/FormContext';
import api from '../../api';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

function RightSidebar({mode, initialData}) {

  const { 
    formConfig, 
    setFormConfig, 
    handleLogoChange, 
    updateFormConfigFromApi, 
    spaceName, 
    handleSpaceNameChange,
    getFormConfigs ,
    toggleIsGenerating
  } = useContext(FormContext);

  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleFormConfigChange = (key) => (e) => {
    setFormConfig({ ...formConfig, [key]: e.target.value });
  };

  const handlePromptChange = (e) => setPrompt(e.target.value);
useEffect(()=>{
  if(mode==='edit'){
    handleSpaceNameChange(initialData.space.spaceName);
    updateFormConfigFromApi(initialData.formConfig);
    setOrganizationName(initialData.space.organizationName)
    setBusinessCategory(initialData.space.businessCategory)
  }
},[initialData])
 const handleFormGeneration = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  toggleIsGenerating(true); // Set isGenerating to true when generation starts
  
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const { data } = await api.post('/generate-form', { prompt }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    updateFormConfigFromApi(data);
   
  } catch (error) {
    console.error('Error generating form:', error.response?.data?.message || error.message);
  } finally {
    setIsLoading(false);
    toggleIsGenerating(false); // Set isGenerating to false when generation is finished
  }
};

const handleCreateSpace = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Extracting form configurations
    const { feedbackFormConfig, testimonialFormConfig } = getFormConfigs();

    // Constructing the space data
    const spaceData = {
      spaceName,
      logo: formConfig.logo,
      organizationName,
      businessCategory,
      feedbackFormConfig,
      testimonialFormConfig,
    };

    // Retrieving the token
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    // API endpoint and method setup
    const url = mode === 'edit' ? '/editSpace' : '/createSpace';
    const method = mode === 'edit' ? 'put' : 'post';

    // Making the API call
    const { data } = await api({
      method,
      url,
      data: spaceData,
      headers: { Authorization: `Bearer ${token}` },
    });

    // On success, show modal and navigate to the dashboard
    setShowModal(true);
    setTimeout(() => navigate(`/space/dashboard/${data._id}`), 3000);

  } catch (error) {
    // Error handling
    console.error('Error creating space:', error.response?.data?.message || error.message);
    alert('Error creating space');
  } finally {
    // Ensure loading state is reset
    setIsLoading(false);
  }
};


  // Refs for focusing
  const spaceNameRef = useRef();

  return (
    <div className="w-1/4 bg-gray-900 p-4 border-l border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Create New Space</h2>
      <form className="space-y-4" onSubmit={handleCreateSpace}>
        <InputField
          label="Space name"
          value={spaceName}
          onChange={handleInputChange(handleSpaceNameChange)}
          autoFocus // Automatically focuses on this input when rendered
          ref={spaceNameRef} // Use ref for programmatic focus control
        />
        <InputField
          label="Form Heading"
          value={formConfig.title}
          onChange={handleFormConfigChange('title')}
        />
        <FileInputField label="Space Logo" onChange={handleLogoChange} />
        <InputField
          label="Organization name"
          value={organizationName}
          onChange={handleInputChange(setOrganizationName)}
        />
        <SelectField
          label="Business Category"
          options={BUSINESS_CATEGORIES}
          value={businessCategory}
          onChange={handleInputChange(setBusinessCategory)}
        />
        {(mode==='edit')?'':
        <>
        <TextAreaField
          label="Detailed prompt for Form generation"
          value={prompt}
          onChange={handlePromptChange}
          minLength={20}
        />
        <CheckboxField label="You want to collect:" options={['Feedback', 'Testimonial']} />
        {isLoading && <LoadingIndicator text="Generating form..." />}
        <button
          type="button"
          className="w-full border border-purple-500 text-white py-2 rounded hover:bg-purple-600 mt-4"
          onClick={handleFormGeneration}
          disabled={prompt.length < 20 || isLoading}
        >
          Generate form
        </button>
        </>
}
        <button 
          type="submit"
          className="w-full border border-purple-500 text-white py-2 rounded hover:bg-purple-600 mt-2"
        >
          Create Space
        </button>
      </form>
      {showModal && (
        <Modal
          message="Your space has been successfully created!"
          onClose={() => navigate('/space/dashboard')}
        />
      )}
    </div>
  );
}

// Helper Components
const InputField = React.forwardRef(({ label, value, onChange, autoFocus }, ref) => (
  <div>
    <label className="block text-sm font-medium text-white">{label}</label>
    <input
      type="text"
      className="mt-1 p-2 w-full border border-gray-600 rounded bg-gray-800 text-white focus:border-purple-500"
      value={value}
      onChange={onChange}
      autoFocus={autoFocus} // Focus on this input if passed
      ref={ref} // Use the ref for programmatic control
    />
  </div>
));

const FileInputField = ({ label, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-white">{label}</label>
    <div className="mt-2">
      <input
        type="file"
        accept="image/*"
        id="fileInput"
        className="hidden"
        onChange={(e) => onChange(e.target.files[0])}
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer py-2 px-4 w-full inline-block text-center border border-purple-500 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
      >
        Choose a File
      </label>
    </div>
  </div>
);


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

const CheckboxField = ({ label, options }) => (
  <div>
    <label className="block text-sm font-medium text-white">{label}</label>
    <div className="flex items-center space-x-2">
      {options.map((option) => (
        <React.Fragment key={option}>
          <input type="checkbox" className="form-checkbox text-purple-500" />
          <label className="text-white">{option}</label>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const LoadingIndicator = ({ text }) => (
  <div className="text-purple-500 text-center my-2">{text}</div>
);

const BUSINESS_CATEGORIES = [
  { value: "accounting", label: "Accounting" },
  { value: "advertising", label: "Advertising" },
  { value: "agriculture", label: "Agriculture" },
  { value: "construction", label: "Construction" },
  { value: "education", label: "Education" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "hospitality", label: "Hospitality" },
  { value: "information_technology", label: "Information Technology" },
  { value: "insurance", label: "Insurance" },
  { value: "legal_services", label: "Legal Services" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "marketing", label: "Marketing" },
  { value: "media", label: "Media" },
  { value: "nonprofit", label: "Nonprofit" },
  { value: "real_estate", label: "Real Estate" },
  { value: "retail", label: "Retail" },
  { value: "shipping", label: "Shipping and Logistics" },
  { value: "social_media", label: "Social Media" },
  { value: "technology", label: "Technology" },
  { value: "tourism", label: "Tourism" },
];

export default RightSidebar;
