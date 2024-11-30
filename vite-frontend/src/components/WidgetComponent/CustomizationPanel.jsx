import React from 'react';
import CustomizationFields from './CustomizationFields';
import LanguageTabs from './LanguageTabs';

const CustomizationPanel = ({
  customization,
  setCustomization,
  selectedLanguage,
  setSelectedLanguage,
}) => {
  const handleCustomizationChange = (key, value) => {
    setCustomization((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <CustomizationFields
        customization={customization}
        handleCustomizationChange={handleCustomizationChange}
      />
      <LanguageTabs
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
    </div>
  );
};

export default CustomizationPanel;
