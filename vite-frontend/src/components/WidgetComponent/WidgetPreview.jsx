import React from 'react';

const WidgetPreview = ({ spaceID, customization }) => {
  const iframeStyles = {
    width: `${customization.width}%`,
    height: `${customization.height}px`,
    border: `${customization.borderWidth}px ${customization.borderStyle} ${customization.borderColor}`,
    borderRadius: `${customization.borderRadius}px`,
    backgroundColor: customization.backgroundColor,
    overflow: customization.scrollType === 'horizontal' ? 'auto' : 'hidden',
  };
  const baseURL = window.location.origin;

  return (
    <iframe
<<<<<<< HEAD
      src={`http://localhost:5000/space/${spaceID}/widget?${new URLSearchParams({
=======
      src={`${baseURL}/space/${spaceID}/widget?${new URLSearchParams({
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
        bgColor: customization.backgroundColor,
        borderStyle: customization.borderStyle,
        borderColor: customization.borderColor,
        borderWidth: customization.borderWidth,
        borderRadius: customization.borderRadius,
        scrollType: customization.scrollType,
        cardBgColor: customization.cardBackgroundColor,
        cardTextColor: customization.cardTextColor,
        cardPadding: customization.cardPadding,
        cardBorderRadius: customization.cardBorderRadius,
        cardShadow: customization.cardShadow,
<<<<<<< HEAD
        shouldAutoScroll: customization.shouldAutoScroll
=======
>>>>>>> edd34ec68b5f8db24eae3d7f1074077213774225
      }).toString()}`}
      style={iframeStyles}
      title="Embeddable Widget"
      className="w-full border rounded mb-6"
    />
  );
};

export default WidgetPreview;
