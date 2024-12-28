import React from 'react';

const EmbeddableWidget = () => (
  <iframe
    src="http://localhost:5173/space/675d409dc08b4bb6dca5c012/widget?bgColor=transparent&borderStyle=solid&borderColor=%23000&borderWidth=1&borderRadius=0&scrollType=horizontal&cardBgColor=%235D5DFF&cardTextColor=%23FCB900&cardPadding=10&cardBorderRadius=5&cardShadow=true"
    style={{
      width: '100%',
      height: '400px',
      border: '1px solid #000',
      borderRadius: '0px',
      backgroundColor: 'transparent',
      overflow: 'auto',
    }}
    title="Embeddable Widget"
  />
);

export default EmbeddableWidget;