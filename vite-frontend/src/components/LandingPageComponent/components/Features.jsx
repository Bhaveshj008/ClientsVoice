import React, { useRef, useEffect } from 'react';
import { MessageSquare, Code, Heart, Clock, Palette, Lock, Users } from 'lucide-react';
import {Link} from 'react-router-dom'

const features = [
  {
    title: "AI-Generated Forms",
    description: "Generate both feedback and testimonial forms powered by AI, fully customizable to meet your business needs.",
    icon: MessageSquare,
    color: "from-purple-500 to-blue-500"
  },
  {
    title: "No Coding Required",
    description: "Create, customize, and embed widgets without any coding experience required.",
    icon: Code,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Wall of Love",
    description: "Showcase testimonials directly on your website with an elegant Wall of Love.",
    icon: Heart,
    color: "from-pink-500 to-purple-500"
  },
  {
    title: "Save Time",
    description: "Save up to 60% of your time managing testimonials and feedback with streamlined tools.",
    icon: Clock,
    color: "from-cyan-500 to-green-500"
  },
  {
    title: "Customizable Widget",
    description: "Easily customize as per your theme and embed a testimonial widget on your website to showcase authentic customer reviews.",
    icon: Palette,
    color: "from-yellow-500 to-orange-500"
  },
  {
    title: "Enterprise Security",
    description: "Ensure data privacy with bank-grade encryption and robust security features.",
    icon: Lock,
    color: "from-red-500 to-pink-500"
  },
  {
    title: "Dual Collection",
    description: "Seamlessly gather feedback for internal improvements and testimonials for building social proof.",
    icon: Users,
    color: "from-pink-500 to-purple-500"
  }
];

const FeatureCard = ({ feature, index }) => {
  const cardRef = useRef(null);
  const Icon = feature.icon;
  
  useEffect(() => {
    const card = cardRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.classList.remove('md:translate-x-full', 'md:-translate-x-full', 'opacity-0');
          card.classList.add('translate-x-0', 'opacity-100');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    if (card) {
      observer.observe(card);
    }

    return () => {
      if (card) {
        observer.unobserve(card);
      }
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`
        group relative w-full max-w-lg mx-auto md:max-w-md
        transform transition-all duration-1000 ease-out
        opacity-100 
        ${index % 2 === 0 
          ? 'md:-translate-x-full md:mr-auto md:ml-8' 
          : 'md:translate-x-full md:ml-auto md:mr-8'
        }
        hover:z-10
      `}
    >
      <div className={`
        relative p-8 rounded-2xl backdrop-blur-lg
        bg-gradient-to-br from-gray-800/80 to-gray-900/80
        border border-gray-700/50 shadow-xl
        transform transition-all duration-500
        group-hover:scale-105 group-hover:shadow-2xl
        group-hover:shadow-purple-500/20
      `}>
        <div className={`
          absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color}
          opacity-0 group-hover:opacity-20 transition-opacity duration-500
        `} />

        <div className={`
          w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${feature.color}
          p-3 transform transition-transform duration-500
          group-hover:scale-110 group-hover:rotate-3
        `}>
          <Icon className="w-full h-full text-white" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">
          {feature.title}
        </h3>

        <p className="text-gray-300 leading-relaxed">
          {feature.description}
        </p>

        <div className={`
          absolute -right-2 -bottom-2 w-24 h-24
          bg-gradient-to-r ${feature.color} rounded-full
          opacity-20 blur-2xl transition-opacity duration-500
          group-hover:opacity-40
        `} />
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section id='features' className="py-20 relative overflow-hidden">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Add testimonials with
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400 bg-clip-text text-transparent"> zero code</span>
          </h1>
          <p className="text-xl text-gray-300">
            Copy and paste our HTML code to add the Wall Of Love to your website.
            We support any no-code platform.
          </p>
        </div>

        <div className="hidden md:block absolute left-1/2 top-[8rem] bottom-20 w-px bg-gradient-to-b from-purple-500/20 via-blue-500/20 to-purple-500/20 transform -translate-x-1/2" />

        <div className="relative space-y-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <div className="text-center mt-20">
        <Link to={'signup'}>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 
            rounded-xl font-semibold text-white overflow-hidden transition-all duration-500
            hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105">
            Get Started Free
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;