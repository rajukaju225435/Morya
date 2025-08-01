// src/components/Footer.jsx
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const aartiText = `
जय गणेश जय गणेश जय गणेश देवा ।
माता जाकी पार्वती पिता महादेवा ॥

एक दंत दयावंत चार भुजा धारी ।
माथे सिंदूर सोहे मूसे की सवारी ॥

जय गणेश जय गणेश जय गणेश देवा ।
माता जाकी पार्वती पिता महादेवा ॥

पान चढ़े फल चढ़े और चढ़े मेवा ।
लड्डुअन का भोग लगे संत करें सेवा ॥

जय गणेश जय गणेश जय गणेश देवा ।
माता जाकी पार्वती पिता महादेवा ॥
  `;

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-neutral-900 to-black py-20 px-4">
      {/* Flickering Diya Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          >
            🪔
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Ganesha Aarti
          </h2>
          <p className="text-xl text-gray-300">आरती - Divine Hymn</p>
        </motion.div>

        {/* Aarti Text Container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-8 border border-primary-gold/20 mb-8"
        >
          <motion.div
            className="h-64 overflow-hidden relative"
          >
            <motion.pre
              animate={{
                y: isPlaying ? '-100%' : 0
              }}
              transition={{
                duration: 30,
                ease: 'linear',
                repeat: isPlaying ? Infinity : 0
              }}
              className="text-primary-gold text-center font-sanskrit text-lg leading-relaxed whitespace-pre-wrap"
            >
              {aartiText}
            </motion.pre>
          </motion.div>

          {/* Audio Controls */}
          <div className="flex justify-center mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAudio}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-orange to-accent-red text-white rounded-full"
            >
              {isPlaying ? '⏸️' : '▶️'}
              <span>Play Aarti</span>
            </motion.button>
          </div>
          
          <audio ref={audioRef} src="/src/assets/audio/om-chanting.mp3" loop />
        </motion.div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-12">
          <p className="mb-2">🕉️ श्री गणेशाय नमः 🕉️</p>
          <p className="text-sm">© 2024 The Divine Journey. Made with devotion 🙏</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;