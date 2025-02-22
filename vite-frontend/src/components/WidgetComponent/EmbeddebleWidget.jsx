import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LanguageEmbedCode from './LanguageEmbedCode';
import WidgetPreview from './WidgetPreview';
import CustomizationPanel from './CustomizationPanel';
import EmbedCodeDisplay from './EmbedCodeDisplay';
import LanguageTabs from './LanguageTabs';

const EmbeddableWidget = () => {
  const { spaceID } = useParams();

  const [customization, setCustomization] = useState({
    backgroundColor: 'transparent',
<<<<<<< HEAD
    borderStyle: 'none',
=======
    borderStyle: 'solid',
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 0,
    scrollType: 'horizontal',
    width: 100,
    height: 400,
    cardBackgroundColor: '#673AB7',
    cardTextColor: '#ffffff',
    cardPadding: 10,
    cardBorderRadius: 5,
    cardShadow: true,
<<<<<<< HEAD
    shouldAutoScroll:true,
=======
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
  });

  const [embedCode, setEmbedCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('HTML');

  useEffect(() => {
    const params = new URLSearchParams({
      bgColor: customization.backgroundColor,
      borderStyle: customization.borderStyle,
      borderColor: customization.borderColor,
      borderWidth: customization.borderWidth,
      borderRadius: customization.borderRadius,
      scrollType: customization.scrollType,
      cardBgColor: customization.cardBackgroundColor,
      cardTextColor: customization.cardTextColor,
      cardPadding: customization.cardPadding,
      cardBorderRadius: customization.cardBorderRadius,
      cardShadow: customization.cardShadow,
<<<<<<< HEAD
      shouldAutoScroll:customization.shouldAutoScroll,
=======
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
    }).toString();

    const codeSnippet = LanguageEmbedCode({
      language: selectedLanguage,
      params,
      customization,
      spaceID,
    });

    setEmbedCode(codeSnippet.trim());
  }, [customization, spaceID, selectedLanguage]);

  return (
<<<<<<< HEAD
    <div className=" p-6 rounded-lg  text-white ">
=======
    <div className="bg-gray-950 p-6 rounded-lg  text-white ">
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
      <h3 className="text-3xl font-semibold mb-4">Wall of Love - Preview</h3>

      <WidgetPreview spaceID={spaceID} customization={customization} />

      <CustomizationPanel
        customization={customization}
        setCustomization={setCustomization}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      <EmbedCodeDisplay embedCode={embedCode} selectedLanguage={selectedLanguage} />
    </div>
  );
};

export default EmbeddableWidget;
