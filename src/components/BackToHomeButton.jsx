// src/components/BackToHomeButton.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BackToHomeButton = () => {
  return (
    <Link to="/home">
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(255,107,0,0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-0 left-0 px-10 py-5  bg-gradient-to-r from-[#FF6B00] to-[#DC143C] text-white rounded-full font-bold text-lg shadow-lg overflow-hidden group cursor-pointer"
      >
        <motion.span className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 flex items-center gap-2">← Back</span>
      </motion.button>
    </Link>
  );
};

export default BackToHomeButton;
