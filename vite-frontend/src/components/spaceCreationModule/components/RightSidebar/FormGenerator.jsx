import React from 'react';
import TextAreaField from './TextAreaField';
import LoadingIndicator from './LoadingIndicator';

function FormGenerator({
  prompt,
  isGeneratingForm,
  handlePromptChange,
  handleFormGeneration
}) {
  return (
    <div className="space-y-4">
      <TextAreaField
        label="Detailed prompt for Form generation"
        value={prompt}
        onChange={(e) => handlePromptChange(e.target.value)}
        minLength={20}
        required
      />
      
      {isGeneratingForm && <LoadingIndicator text="Generating form..." />}
      
      <button
        type="button"
        className="w-full border border-purple-500 rounded py-2 px-4 text-purple-300 hover:bg-purple-700 hover:text-white disabled:opacity-50"
        onClick={handleFormGeneration}
        disabled={isGeneratingForm || !prompt.trim()}
      >
        {isGeneratingForm ? 'Generating...' : 'Generate Form'}
      </button>
    </div>
  );
}
export default FormGenerator;