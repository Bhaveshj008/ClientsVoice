import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
const GoToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white shadow-lg ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      aria-label="Scroll to top"
    >
      <ArrowUp/>
    </button>
  );
};

export default GoToTop;
