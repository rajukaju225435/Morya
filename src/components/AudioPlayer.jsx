// src/components/AudioPlayer.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AudioPlayer = ({ storyTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-gradient-to-r from-[#FF6B00] to-[#DC143C] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <div>
            <p className="text-sm text-white/60">Listen to Story</p>
            <p className="text-xs text-white/40">Narrated in English</p>
          </div>
        </div>
        
        {/* Audio Waveform Animation */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-[#FF6B00] to-[#FFD700] rounded-full"
              animate={{
                height: isPlaying ? [10, 20, 10] : 10
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;