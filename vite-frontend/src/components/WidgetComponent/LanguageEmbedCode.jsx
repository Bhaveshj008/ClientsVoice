import React from 'react';

const LanguageEmbedCode = ({ language, params, customization, spaceID }) => {
  const Url = 'http://localhost:5000';
  switch (language) {
    case 'HTML':
      return `
<iframe src="${Url}/space/${spaceID}/widget?${params}" 
  style="width:${customization.width}%; height:${customization.height}px; 
  border:${customization.borderWidth}px ${customization.borderStyle} ${customization.borderColor}; 
  border-radius:${customization.borderRadius}px; background-color:${customization.backgroundColor}; 
  overflow:${customization.scrollType === 'horizontal' ? 'auto' : 'hidden'};"
  title="Embeddable Widget">
</iframe>
      `;
    case 'React':
      return `
import React from 'react';

const EmbeddableWidget = () => (
  <iframe
    src="${Url}/space/${spaceID}/widget?${params}"
    style={{
      width: '${customization.width}%',
      height: '${customization.height}px',
      border: '${customization.borderWidth}px ${customization.borderStyle} ${customization.borderColor}',
      borderRadius: '${customization.borderRadius}px',
      backgroundColor: '${customization.backgroundColor}',
      overflow: '${customization.scrollType === 'horizontal' ? 'auto' : 'hidden'}',
    }}
    title="Embeddable Widget"
  />
);

export default EmbeddableWidget;
      `;
    case 'Next.js':
    case 'React': // Next.js is similar to React
      return `
import React from 'react';

const EmbeddableWidget = () => (
  <iframe
    src="${Url}/space/${spaceID}/widget?${params}"
    style={{
      width: '${customization.width}%',
      height: '${customization.height}px',
      border: '${customization.borderWidth}px ${customization.borderStyle} ${customization.borderColor}',
      borderRadius: '${customization.borderRadius}px',
      backgroundColor: '${customization.backgroundColor}',
      overflow: '${customization.scrollType === 'horizontal' ? 'auto' : 'hidden'}',
    }}
    title="Embeddable Widget"
  />
);

export default EmbeddableWidget;
      `;
    case 'Angular':
      return `
<!-- In your Angular component template -->
<iframe 
  src="${Url}/space/${spaceID}/widget?${params}" 
  style="width:${customization.width}%; height:${customization.height}px; 
  border:${customization.borderWidth}px ${customization.borderStyle} ${customization.borderColor}; 
  border-radius:${customization.borderRadius}px; background-color:${customization.backgroundColor}; 
  overflow:${customization.scrollType === 'horizontal' ? 'auto' : 'hidden'};"
  title="Embeddable Widget">
</iframe>
      `;
    case 'Vue':
      return `
<!-- In your Vue component template -->
<iframe 
  :src="\`${Url}/space/${spaceID}/widget?${params}\`" 
  :style="{
    width: '${customization.width}%',
    height: '${customization.height}px',
    border: '${customization.borderWidth}px ${customization.borderStyle} ${customization.borderColor}',
    borderRadius: '${customization.borderRadius}px',
    backgroundColor: '${customization.backgroundColor}',
    overflow: '${customization.scrollType === 'horizontal' ? 'auto' : 'hidden'}',
  }"
  title="Embeddable Widget">
</iframe>
      `;
    default:
      return `
<iframe src="${Url}/space/${spaceID}/widget?${params}" 
  style="width:${customization.width}%; height:${customization.height}px; 
  border:${customization.borderWidth}px ${customization.borderStyle} ${customization.borderColor}; 
  border-radius:${customization.borderRadius}px; background-color:${customization.backgroundColor}; 
  overflow:${customization.scrollType === 'horizontal' ? 'auto' : 'hidden'};"
  title="Embeddable Widget">
</iframe>
      `;
  }
};

export default LanguageEmbedCode;
