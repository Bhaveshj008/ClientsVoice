import React from 'react';

const LanguageTabs = ({ selectedLanguage, setSelectedLanguage }) => {
  const languages = ['HTML', 'React', 'Next.js', 'Angular', 'Vue'];

  return (
    <div>
      <label className="block text-3xl  font-extrabold text-gray-300 mb-8 mt-8">Embed this Widget into your code</label>
      <div className="flex space-x-4 mt-2">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            className={`px-4 py-2 rounded-lg ${
              selectedLanguage === lang ? 'bg-purple-600' : 'bg-gray-700'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageTabs;
