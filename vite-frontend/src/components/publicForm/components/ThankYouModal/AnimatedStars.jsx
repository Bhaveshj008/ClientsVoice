import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const AnimatedStars = () => {
  return (
    <div className="flex justify-center space-x-2 my-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + star * 0.1 }}
        >
          <Star className="w-6 h-6 fill-current text-yellow-400" />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedStars;