import React from 'react';

const EmbeddableWidget = () => (
  <iframe
    src="https://clv-wall-of-love.vercel.app/space/67bb2496588832138adde079/widget?bgColor=transparent&borderStyle=none&borderColor=%23000&borderWidth=1&borderRadius=0&scrollType=vertical&cardBgColor=%23673AB7&cardTextColor=%23ffffff&cardPadding=10&cardBorderRadius=5&cardShadow=true&shouldAutoScroll=true"
    style={{
      width: '100%',
      height: '400px',
      border: '1px none #000',
      borderRadius: '0px',
      backgroundColor: 'transparent',
      overflow: 'hidden',
    }}
    title="Embeddable Widget"
  />
);

export default EmbeddableWidget;