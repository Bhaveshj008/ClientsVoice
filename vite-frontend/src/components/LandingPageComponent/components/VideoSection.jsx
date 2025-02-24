import React, { useState } from 'react';
import { Play, Loader } from 'lucide-react';

const VideoSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = "nbmJnCHXaW8";

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <section className="relative py-10 overflow-hidden ">
      {/* Background gradients */}
      

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            See it in
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent"> action</span>
          </h2>
          <p className="text-xl text-gray-300">
  Discover how our platform helps you collect customer feedback for internal improvement, while showcasing powerful testimonials through an embeddable "Wall of Love" widget on your website.
</p>

        </div>

        {/* Video container */}
        <div className="relative max-w-4xl mx-auto group">
          {/* Decorative border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
          
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-800/80 backdrop-blur-sm shadow-2xl shadow-purple-500/20">
            {!isPlaying ? (
              <div className="absolute inset-0 z-10">
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover"
                  onLoad={() => setIsLoading(false)}
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                
                {/* Play button */}
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 w-full h-full flex items-center justify-center group/btn"
                >
                  <div className="relative transform transition-all duration-300 group-hover/btn:scale-110">
                    {isLoading ? (
                      <Loader className="w-16 h-16 text-white animate-spin" />
                    ) : (
                      <div className="relative">
                        {/* Outer glow */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-40 group-hover/btn:opacity-60 transition duration-300" />
                        
                        {/* Play button background */}
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`}
                title="Product Demo Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>

        {/* Caption with enhanced styling */}
        <p className="text-center text-lg text-gray-300 mt-8 max-w-2xl mx-auto">
          Transform your customer feedback into powerful testimonials with our 
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"> AI-powered platform</span>
        </p>
      </div>
    </section>
  );
};

export default VideoSection;