import React from 'react';

const EmbeddableWidget = () => (
  <iframe
    src="http://localhost:5000/space/679f6307981adbb9346d6869/widget?bgColor=transparent&borderStyle=none&borderColor=%23000&borderWidth=1&borderRadius=0&scrollType=horizontal&cardBgColor=%23F97316&cardTextColor=%23ffffff&cardPadding=10&cardBorderRadius=20&cardShadow=true&shouldAutoScroll=true"
    style={{
      width: '100%',
      height: '450px',
      border: '1px none #000',
      borderRadius: '0px',
      backgroundColor: 'transparent',
      overflow: 'auto',
    }}
    title="Embeddable Widget"
  />
);

export default EmbeddableWidget;