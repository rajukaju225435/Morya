import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Parallax } from "react-scroll-parallax";
import Navbar from "./Navbar";
import BackToHomeButton from "./BackToHomeButton";

const About = () => {
  const containerRef = useRef(null);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  const symbols = [
    {
      name: "Modak",
      icon: "🍡",
      meaning: "Sweet rewards of sadhana",
      detail:
        "The modak represents the sweetness of the realized inner self and the reward of spiritual practice.",
    },
    {
      name: "Mouse",
      icon: "🐁",
      meaning: "Control over desires",
      detail:
        "The mouse symbolizes our ego and desires that need to be controlled to attain wisdom.",
    },
    {
      name: "Axe",
      icon: "🪓",
      meaning: "Cut the bonds of attachment",
      detail:
        "The axe helps to cut off all bonds of attachment and destroy obstacles in the spiritual path.",
    },
    {
      name: "Lotus",
      icon: "🪷",
      meaning: "Spiritual awakening",
      detail:
        "The lotus represents spiritual perfection and the awakening of consciousness.",
    },
  ];

  const attributes = [
    {
      title: "Elephant Head",
      description:
        "Symbolizes wisdom, understanding, and a discriminating intellect",
      icon: "🐘",
    },
    {
      title: "Large Ears",
      description:
        "Listen more, talk less - the importance of listening in spiritual growth",
      icon: "👂",
    },
    {
      title: "Small Eyes",
      description: "Concentrate and focus on the minute details of life",
      icon: "👁️",
    },
    {
      title: "Curved Trunk",
      description: "Adaptability and efficiency in removing obstacles",
      icon: "🌀",
    },
    {
      title: "Large Belly",
      description:
        "Digest all good and bad experiences of life with equanimity",
      icon: "⭕",
    },
    {
      title: "Single Tusk",
      description: "Retain the good and discard the bad",
      icon: "🦷",
    },
  ];

  const names = [
    {
      sanskrit: "विघ्नहर्ता",
      english: "Vighnaharta",
      meaning: "Remover of Obstacles",
    },
    { sanskrit: "गणपति", english: "Ganapati", meaning: "Lord of All Beings" },
    { sanskrit: "विनायक", english: "Vinayaka", meaning: "Supreme Leader" },
    { sanskrit: "एकदन्त", english: "Ekadanta", meaning: "One Tusked" },
    {
      sanskrit: "लम्बोदर",
      english: "Lambodara",
      meaning: "Large Bellied Lord",
    },
    { sanskrit: "गजानन", english: "Gajanana", meaning: "Elephant Faced" },
  ];

  return (
    <section
      ref={containerRef}
      className="min-h-screen relative py-20 overflow-hidden bg-black "
    >
      <Navbar />

      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-[#FF6B00]/5 via-transparent to-[#FFD700]/5"
        style={{ y, opacity }}
      />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-100 right-60 text-[30px] text-[#FF6B00]"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          ॐ
        </motion.div>
        <motion.div
          className="absolute top-100 left-60 text-[30px] text-[#FFD700]"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          श्री
        </motion.div>
      </div>

      <div className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Section with Animation */}
        <BackToHomeButton  className/>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
       
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FF6B00] to-[#DC143C] bg-clip-text text-transparent animate-gradient">
              About Lord Ganesha
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-[#FF6B00] to-[#FFD700] mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Introduction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <Parallax speed={-5}>
            <div className="max-w-4xl mx-auto text-center">
              <motion.p
                className="text-2xl md:text-3xl leading-relaxed mb-8 text-white/90 font-light"
                style={{ scale }}
              >
                Lord Ganesha, the beloved elephant-headed deity, stands as the
                <span className="text-[#FFD700] font-semibold">
                  {" "}
                  remover of obstacles
                </span>{" "}
                and the{" "}
                <span className="text-[#FF6B00] font-semibold">
                  patron of new beginnings
                </span>
                .
              </motion.p>

              <p className="text-lg md:text-xl leading-relaxed text-white/70">
                Known by 108 different names, each revealing a unique aspect of
                his divine nature, Ganesha embodies wisdom, prosperity, and the
                power to overcome life's challenges.
              </p>
            </div>
          </Parallax>
        </motion.div>

        {/* Divine Names Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] bg-clip-text text-transparent">
              Divine Names
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {names.map((name, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, x: 10 }}
                className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#FF6B00]/50 transition-all duration-300"
              >
                <h3 className="text-3xl text-[#FFD700] mb-2">
                  {name.sanskrit}
                </h3>
                <p className="text-xl text-white/90 mb-1">{name.english}</p>
                <p className="text-sm text-white/60">{name.meaning}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Symbols Grid with Modal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] bg-clip-text text-transparent">
              Sacred Symbols
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {symbols.map((symbol, index) => (
              <Parallax key={index} speed={index % 2 === 0 ? 5 : -5}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 },
                  }}
                  onClick={() => setSelectedSymbol(symbol)}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-[#FF6B00] hover:shadow-[0_10px_30px_rgba(255,107,0,0.3)] group"
                >
                  <motion.div
                    className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                  >
                    {symbol.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-[#FFD700] mb-3">
                    {symbol.name}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {symbol.meaning}
                  </p>
                  <p className="text-xs text-[#FF6B00] mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to learn more →
                  </p>
                </motion.div>
              </Parallax>
            ))}
          </div>
        </motion.div>

        {/* Physical Attributes Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] bg-clip-text text-transparent">
              Divine Attributes
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attributes.map((attr, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex items-start space-x-4 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#FFD700]/50 transition-all duration-300"
              >
                <div className="text-3xl flex-shrink-0">{attr.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-2">
                    {attr.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {attr.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-10 left-5 text-5xl opacity-30 pointer-events-none"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          🍡
        </motion.div>

        <motion.div
          className="absolute top-40 right-10 text-4xl opacity-20 pointer-events-none"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          🪷
        </motion.div>
      </div>

      {/* Modal for Symbol Details */}
      <AnimatePresence>
        {selectedSymbol && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSymbol(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#FF6B00]/30 rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl text-center mb-4">
                {selectedSymbol.icon}
              </div>
              <h3 className="text-2xl font-bold text-[#FFD700] text-center mb-4">
                {selectedSymbol.name}
              </h3>
              <p className="text-white/80 text-center mb-4">
                {selectedSymbol.detail}
              </p>
              <button
                onClick={() => setSelectedSymbol(null)}
                className="w-full py-3 bg-gradient-to-r from-[#FF6B00] to-[#DC143C] text-white rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
