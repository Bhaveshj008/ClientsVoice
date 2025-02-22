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
      src={`http://localhost:5000/space/${spaceID}/widget?${new URLSearchParams({
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
        shouldAutoScroll: customization.shouldAutoScroll
      }).toString()}`}
      style={iframeStyles}
      title="Embeddable Widget"
      className="w-full border rounded mb-6"
    />
  );
};

export default WidgetPreview;
