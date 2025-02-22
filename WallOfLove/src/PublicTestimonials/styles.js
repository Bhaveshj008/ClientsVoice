export const getContainerStyles = (customizations, isIframe) => ({
    backgroundColor: customizations.bgColor,
    borderStyle: customizations.borderStyle,
    borderColor: customizations.borderColor,
    borderWidth: `${customizations.borderWidth}px`,
    borderRadius: `${customizations.borderRadius}px`,
    overflow: 'hidden',
    height: isIframe ? '100vh' : undefined,
    margin: 0,
    padding: isIframe ? 0 : '1.5rem',
    position: 'relative',
  });
  
  export const getScrollContainerStyles = (customizations, isIframe) => ({
    display: customizations.scrollType === 'grid' ? 'grid' : 'flex',
    flexDirection: customizations.scrollType === 'vertical' ? 'column' : 'row',
    gridTemplateColumns: customizations.scrollType === 'grid'
      ? 'repeat(auto-fill, minmax(350px, 1fr))'
      : undefined,
    gap: `${customizations.cardMargin}px`,
    overflow: 'auto',
    maxHeight: customizations.scrollType === 'grid' 
      ? (isIframe ? 'calc(100vh - 100px)' : '80vh')
      : customizations.scrollType === 'vertical'
        ? (isIframe ? 'calc(100vh - 100px)' : '80vh')
        : 'auto',
    WebkitOverflowScrolling: 'touch',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    position: 'relative',
    alignItems: customizations.scrollType === 'horizontal' ? 'stretch' : undefined,
    gridAutoRows: customizations.scrollType === 'grid' ? 'min-content' : undefined,
    padding: customizations.scrollType === 'grid' ? '1rem' : undefined,
  });
  
  export const getCardStyles = (customizations) => ({
    backgroundColor: customizations.cardBgColor,
    color: customizations.cardTextColor,
    padding: `${customizations.cardPadding * 1.5}px`,
    margin: customizations.scrollType === 'grid' ? 0 : `${customizations.cardMargin}px`,
    borderRadius: `${customizations.cardBorderRadius}px`,
    width: customizations.scrollType === 'horizontal' ? '400px' : 'auto',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    height: customizations.scrollType === 'horizontal' ? 'auto' : undefined,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  });