import React, { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom'

const BrandingSection = () => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    
    const handleScroll = () => {
      if (!section) return;
      
      // Get section position
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const windowHeight = window.innerHeight;
      
      // Only calculate offset when section is in view
      if (sectionTop < windowHeight && sectionTop > -rect.height) {
        // Calculate how far the section is from the center of the viewport
        const distanceFromCenter = sectionTop - windowHeight / 2;
        // Convert to a percentage (0 when centered, negative when scrolling up)
        const scrollPercentage = distanceFromCenter / (windowHeight / 2);
        setOffset(scrollPercentage * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[70vh] overflow-hidden"
    >
      {/* Background layer */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          transform: `translateY(${offset * 0.2}px)`,
          backgroundImage: 'url(/api/placeholder/1920/1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${offset * 0.15}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-10" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500 rounded-full opacity-10" />
      </div>

      {/* Content container */}
      <div className="relative min-h-[50vh] flex items-center justify-center px-4">
        <div 
          className="max-w-6xl mx-auto text-center"
          style={{ transform: `translateY(${offset * -0.1}px)` }}
        >
          <div className="bg-black/40 backdrop-blur-lg rounded-xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="block bg-gradient-to-r from-blue-300 to-purple-400 text-transparent bg-clip-text">
                Collect and Display Testimonials
              </span>
              <span className="block bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text mt-2">
                in One Seamless Solution
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
              Seamlessly collect feedback to improve your services internally,
              while showcasing testimonials externally to build trust and grow your brand.
              Empower your business with our all-in-one solution.
            </p>
            <Link to={'signup'}>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg">
              Get Started
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingSection;