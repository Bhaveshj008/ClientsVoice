import React from 'react';

const EmbeddableWidget = () => (
  <iframe
    src="http://localhost:5173/space/67499157b818192e94348d94/widget?bgColor=%238ED1FC&borderStyle=solid&borderColor=%23000&borderWidth=1&borderRadius=0&scrollType=horizontal&cardBgColor=%230693E3&cardTextColor=%23FFFFFF&cardPadding=10&cardBorderRadius=9&cardShadow=true"
    style={{
      width: '100%',
      height: '400px',
      border: '1px solid #000',
      borderRadius: '0px',
      backgroundColor: '#8ED1FC',
      overflow: 'auto',
    }}
    title="Embeddable Widget"
  />
);

export default EmbeddableWidget;