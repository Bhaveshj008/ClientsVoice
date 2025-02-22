import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ThumbsUp } from 'lucide-react';

const FloatingIcons = () => {
  return (
    <>
      <motion.div
        animate={{
          y: [-20, 0, -20],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute -top-8 left-0"
      >
        <Heart className="w-6 h-6 text-pink-400" />
      </motion.div>
      
      <motion.div
        animate={{
          y: [-15, 5, -15],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute -top-4 right-0"
      >
        <Star className="w-6 h-6 text-yellow-400" />
      </motion.div>
      
      <motion.div
        animate={{
          y: [-10, 10, -10],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
        className="absolute top-0 right-8"
      >
        <ThumbsUp className="w-6 h-6 text-blue-400" />
      </motion.div>
    </>
  );
};

export default FloatingIcons;