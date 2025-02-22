import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import FloatingIcons from './FloatingIcons';
import ModalContent from './ModalContent';

const ThankYouModal = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
      >
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.7, 1] }}
              className="relative"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={isAnimating ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  } : {}}
                  transition={{ duration: 2, ease: "easeInOut", times: [0, 0.5, 1] }}
                >
                  <CheckCircle className="w-24 h-24 text-white" />
                </motion.div>
              </div>
              <FloatingIcons />
            </motion.div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <ModalContent onClose={onClose} />
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouModal;   