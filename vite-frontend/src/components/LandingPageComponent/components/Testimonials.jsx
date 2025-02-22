import React from 'react';

const EmbeddableWidget = () => (
  <iframe
<<<<<<< HEAD
    src="http://localhost:5000/space/679f6307981adbb9346d6869/widget?bgColor=transparent&borderStyle=none&borderColor=%23000&borderWidth=1&borderRadius=0&scrollType=horizontal&cardBgColor=%23F97316&cardTextColor=%23ffffff&cardPadding=10&cardBorderRadius=20&cardShadow=true&shouldAutoScroll=true"
    style={{
      width: '100%',
      height: '450px',
      border: '1px none #000',
      borderRadius: '0px',
      backgroundColor: 'transparent',
=======
    src="http://localhost:5173/space/67499157b818192e94348d94/widget?bgColor=%238ED1FC&borderStyle=solid&borderColor=%23000&borderWidth=1&borderRadius=0&scrollType=horizontal&cardBgColor=%230693E3&cardTextColor=%23FFFFFF&cardPadding=10&cardBorderRadius=9&cardShadow=true"
    style={{
      width: '100%',
      height: '400px',
      border: '1px solid #000',
      borderRadius: '0px',
      backgroundColor: '#8ED1FC',
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
      overflow: 'auto',
    }}
    title="Embeddable Widget"
  />
);

export default EmbeddableWidget;