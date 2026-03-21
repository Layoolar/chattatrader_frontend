// src/reuseables/Modal.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className='fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4'>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='bg-white rounded-[8px] shadow-lg w-full max-w-2xl p-5 relative text-gray-800 max-h-[90vh] overflow-hidden'
      >
         <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        {/* <h2 className="text-xl font-semibold mb-4">{title}</h2> */}
        <div>{children}</div>
      </motion.div> 
    </div>
  );
};
