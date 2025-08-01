// src/components/Blessings.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Blessings = () => {
  const [message, setMessage] = useState('');
  const [blessings, setBlessings] = useState([
    { id: 1, text: 'Ganpati Bappa Morya! 🙏', x: 20, y: 20 },
    { id: 2, text: 'May Ganesha remove all obstacles! 🕉️', x: 60, y: 40 },
    { id: 3, text: 'Jai Ganesh! 🪔', x: 30, y: 70 }
  ]);

  const addBlessing = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newBlessing = {
        id: Date.now(),
        text: message,
        x: Math.random() * 80,
        y: Math.random() * 80
      };
    // src/components/Blessings.jsx (continued)
      setBlessings([...blessings, newBlessing]);
      setMessage('');
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden bg-black text-white">
      {/* Floating Modaks Background */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{ x: Math.random() * 100 + '%', y: '100%' }}
            animate={{ y: '-10%' }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear'
            }}
          >
            🍥
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Share Your Blessings
          </h2>
          <p className="text-xl text-gray-300">आशीर्वाद - Leave Your Divine Message</p>
        </motion.div>

        {/* Message Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onSubmit={addBlessing}
          className="mb-12"
        >
          <div className="flex gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your blessing... (e.g., Ganpati Bappa Morya!)"
              className="flex-1 px-6 py-4 bg-neutral-800/50 backdrop-blur-sm border border-primary-gold/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-primary-gold/50 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-primary-orange to-accent-red text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
            >
              Send 🙏
            </motion.button>
          </div>
        </motion.form>

        {/* Blessings Display */}
        <div className="relative h-96 bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 rounded-3xl backdrop-blur-sm border border-primary-gold/20 overflow-hidden">
          <AnimatePresence>
            {blessings.map((blessing) => (
              <motion.div
                key={blessing.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                style={{
                  position: 'absolute',
                  left: `${blessing.x}%`,
                  top: `${blessing.y}%`
                }}
                className="bg-gradient-to-r from-primary-orange/80 to-accent-red/80 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm"
              >
                {blessing.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Blessings;