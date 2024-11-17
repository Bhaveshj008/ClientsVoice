import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChromePicker } from 'react-color'; // To use color picker

const EmbeddableWidget = () => {
  const { spaceID } = useParams();
  
  // State variables to handle customization
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const [borderStyle, setBorderStyle] = useState('solid');
  const [borderRadius, setBorderRadius] = useState(0);
  const [scrollType, setScrollType] = useState('vertical');
  const [embedCode, setEmbedCode] = useState('');

  // Construct dynamic embed code based on customization
  useEffect(() => {
    setEmbedCode(`
      <iframe src="http://localhost:3000/space/${spaceID}/widget?bgColor=${backgroundColor}&borderStyle=${borderStyle}&borderRadius=${borderRadius}&scrollType=${scrollType}" 
        style="width:100%; height:400px; border:none; overflow:hidden; background-color:${backgroundColor}; border-radius:${borderRadius}px;" 
        title="Embeddable Widget">
      </iframe>
    `);
  }, [backgroundColor, borderStyle, borderRadius, scrollType, spaceID]);

  // Inline style for iframe based on customizations
  const iframeStyles = {
    width: '100%',
    height: '400px',
    border: 'none',
    overflow: scrollType === 'horizontal' ? 'auto' : 'hidden',
    backgroundColor: backgroundColor,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div className="bg-gray-950 p-6 rounded-lg shadow-lg text-white">
      <h3 className="text-xl font-semibold mb-4">Wall Of Love</h3>

      {/* Display the widget preview */}
      <iframe
        src={`http://localhost:3000/space/${spaceID}/widget?bgColor=${backgroundColor}&borderStyle=${borderStyle}&borderRadius=${borderRadius}&scrollType=${scrollType}`}
        style={iframeStyles}
        title="Embeddable Widget"
      />

      <div className="mt-6 space-y-4">
        {/* Customization Panel */}
        <div>
          <label className="block text-sm font-medium text-gray-300">Background Color</label>
          <ChromePicker color={backgroundColor} onChangeComplete={(color) => setBackgroundColor(color.hex)} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Border Style</label>
          <select
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            value={borderStyle}
            onChange={(e) => setBorderStyle(e.target.value)}
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Border Radius (px)</label>
          <input
            type="number"
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Scroll Type</label>
          <div className="flex space-x-4">
            <button
              onClick={() => setScrollType('vertical')}
              className={`px-4 py-2 rounded-lg ${scrollType === 'vertical' ? 'bg-purple-600' : 'bg-gray-700'}`}
            >
              Vertical
            </button>
            <button
              onClick={() => setScrollType('horizontal')}
              className={`px-4 py-2 rounded-lg ${scrollType === 'horizontal' ? 'bg-purple-600' : 'bg-gray-700'}`}
            >
              Horizontal
            </button>
            <button
              onClick={() => setScrollType('grid')}
              className={`px-4 py-2 rounded-lg ${scrollType === 'grid' ? 'bg-purple-600' : 'bg-gray-700'}`}
            >
              Grid
            </button>
          </div>
        </div>

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
    </div>
  );
};

export default EmbeddableWidget;
