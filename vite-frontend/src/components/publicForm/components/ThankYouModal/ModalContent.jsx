import React from 'react';
import { motion } from 'framer-motion';
import AnimatedStars from './AnimatedStars';

const ModalContent = ({ onClose }) => {
  return (
    <div className="p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You! 🎉
        </h3>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            Your submission has been received successfully.
          </p>
          
          <p className="text-gray-600">
            We truly appreciate you taking the time to share your thoughts with us.
            Your feedback helps us create a better experience for everyone.
          </p>
          
          <AnimatedStars />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm text-gray-500"
          >
            Have a great day! ✨
          </motion.div>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          onClick={onClose}
          className="mt-8 w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all hover:scale-105"
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ModalContent;