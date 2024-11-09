import React from 'react';
import { useParams } from 'react-router-dom';

const EmbeddableWidget = () => {
  const { spaceID } = useParams();
  const embedCode = `<iframe src="http://localhost:3000/space/${spaceID}/widget" style="width:100%; height:400px; border:none; overflow:hidden; background-color:transparent;" title="Embeddable Widget"></iframe>`;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
      <h3 className="text-xl font-semibold mb-4">Wall Of Love</h3>

      <iframe
        src={`http://localhost:3000/space/${spaceID}/widget`}
        style={{
          width: '100%',
          height: '400px', // Set height for visibility
          border: 'none',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
        title="Embeddable Widget"
      />

      {/* Code Display */}
      <div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-inner text-sm text-gray-300">
        <pre className="whitespace-pre-wrap">
          <code>{embedCode}</code>
        </pre>
      </div>

      {/* Copy Button */}
      <button
        onClick={() => navigator.clipboard.writeText(embedCode)}
        className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
      >
        Copy Embed Code
      </button>
    </div>
  );
};

export default EmbeddableWidget;
