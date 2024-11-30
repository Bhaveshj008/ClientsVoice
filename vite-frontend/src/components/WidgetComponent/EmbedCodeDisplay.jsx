import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const EmbedCodeDisplay = ({ embedCode, selectedLanguage }) => (
  <div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-inner text-sm text-gray-300">
    <SyntaxHighlighter
      language={selectedLanguage.toLowerCase()}
      style={vscDarkPlus}
      customStyle={{ backgroundColor: 'transparent' }}
      showLineNumbers
    >
      {embedCode}
    </SyntaxHighlighter>

    <button
      onClick={() => navigator.clipboard.writeText(embedCode)}
      className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
    >
      Copy Embed Code
    </button>
  </div>
);

export default EmbedCodeDisplay;
