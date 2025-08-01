import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

const Mantras = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMantra, setCurrentMantra] = useState(0);
  const [selectedMantra, setSelectedMantra] = useState(null);
  const [showBenefits, setShowBenefits] = useState(false);
  const audioRef = useRef(null);

  const mantras = [
    {
      id: 1,
      name: "Vakratunda Mahakaya",
      sanskrit:
        "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
      meaning:
        "O Lord with curved trunk and massive body, with the brilliance of a million suns, please remove all obstacles from my endeavors, always and forever.",
      audio: "/src/assets/audio/om-chanting.mp3",
      benefits: [
        "Removes obstacles from new beginnings",
        "Brings clarity and wisdom",
        "Protects from negative energies",
        "Ensures success in endeavors",
      ],
      chantCount: "108 times",
      bestTime: "Early morning or before starting any new work",
    },
    {
      id: 2,
      name: "Om Gan Ganapataye Namah",
      sanskrit: "ॐ गं गणपतये नमः",
      meaning: "I bow to Lord Ganesha, the remover of obstacles",
      audio: "/src/assets/audio/om-chanting.mp3",
      benefits: [
        "Enhances concentration and memory",
        "Removes fear and anxiety",
        "Brings prosperity and success",
        "Develops inner strength",
      ],
      chantCount: "21, 108, or 1008 times",
      bestTime: "During meditation or puja",
    },
    {
      id: 3,
      name: "Ganapati Atharvashirsha",
      sanskrit:
        "ॐ नमस्ते गणपतये । त्वमेव प्रत्यक्षं तत्त्वमसि । त्वमेव केवलं कर्तासि ।",
      meaning:
        "Salutations to Lord Ganapati. You are the visible absolute reality. You alone are the creator.",
      audio: "/src/assets/audio/om-chanting.mp3",
      benefits: [
        "Grants spiritual wisdom",
        "Destroys sins and negativity",
        "Fulfills all desires",
        "Leads to moksha (liberation)",
      ],
      chantCount: "Once daily",
      bestTime: "Brahma Muhurta (4-6 AM)",
    },
    {
      id: 4,
      name: "Ganesh Gayatri Mantra",
      sanskrit:
        "ॐ एकदन्ताय विद्महे, वक्रतुण्डाय धीमहि । तन्नो दन्ती प्रचोदयात् ॥",
      meaning:
        "We meditate on the single-tusked one, we contemplate the curved-trunk one. May that tusk inspire and illuminate us.",
      audio: "/src/assets/audio/om-chanting.mp3",
      benefits: [
        "Increases intelligence and wisdom",
        "Improves communication skills",
        "Brings divine protection",
        "Enhances spiritual growth",
      ],
      chantCount: "108 times",
      bestTime: "During sunrise or sunset",
    },
    {
      id: 5,
      name: "Ganesh Mool Mantra",
      sanskrit:
        "ॐ श्रीं ह्रीं क्लीं ग्लौं गं गणपतये वर वरद सर्वजनं मे वशमानय स्वाहा",
      meaning:
        "O Lord Ganesha, bestower of boons, bring all people under my influence.",
      audio: "/src/assets/audio/om-chanting.mp3",
      benefits: [
        "Attracts positive relationships",
        "Increases personal magnetism",
        "Brings success in business",
        "Enhances leadership qualities",
      ],
      chantCount: "108 times for 21 days",
      bestTime: "Wednesday mornings",
    },
  ];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () =>
          setIsPlaying(false)
        );
      }
    };
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden bg-gradient-to-b bg-[#0A0A0A]">

        <Navbar/>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Om symbols */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl text-yellow-500/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            ॐ
          </motion.div>
        ))}

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-4"
            animate={{
              backgroundImage: [
                "linear-gradient(to right, #FFD700, #FF6B00)",
                "linear-gradient(to right, #FF6B00, #FFD700)",
                "linear-gradient(to right, #FFD700, #FF6B00)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Sacred Mantras
          </motion.h2>
          <p className="text-xl text-gray-300">
            मंत्र - Divine Vibrations for Transformation
          </p>
        </motion.div>

        {/* Mantra Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mantras.map((mantra, index) => (
            <motion.div
              key={mantra.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className={`relative group cursor-pointer`}
              onClick={() => setSelectedMantra(mantra)}
            >
              <div
                className={`
                bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 
                p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300
                ${
                  currentMantra === index
                    ? "border-yellow-500 shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                    : "border-yellow-500/20 hover:border-yellow-500/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                }
              `}
              >
                {/* Mantra Number */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold text-yellow-500 mb-3 group-hover:text-yellow-400 transition-colors">
                  {mantra.name}
                </h3>
                <p className="text-2xl text-white mb-2 font-sanskrit leading-relaxed">
                  {mantra.sanskrit.substring(0, 50)}...
                </p>
                <p className="text-sm text-gray-400 italic">
                  {mantra.meaning.substring(0, 60)}...
                </p>

                {/* Hover effect */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Click indicator */}
                <div className="mt-4 text-right">
                  <span className="text-xs text-yellow-500/70 group-hover:text-yellow-500 transition-colors">
                    Click to explore →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Audio Player */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-neutral-900/90 to-neutral-800/90 backdrop-blur-sm p-8 rounded-3xl border border-yellow-500/30 shadow-2xl"
        >
          <h3 className="text-2xl font-bold text-yellow-500 mb-6 text-center">
            Now Playing: {mantras[currentMantra].name}
          </h3>

          <audio ref={audioRef} src={mantras[currentMantra].audio} />

          <div className="flex flex-col items-center space-y-6">
            {/* Main Controls */}
            <div className="flex items-center justify-center space-x-8">
              {/* Previous */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setCurrentMantra(
                    (prev) => (prev - 1 + mantras.length) % mantras.length
                  )
                }
                className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-yellow-500 hover:bg-neutral-700 transition-colors"
              >
                ⏮️
              </motion.button>

              {/* Play/Pause */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="relative w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-4xl shadow-2xl"
              >
                <motion.div
                  animate={{
                    boxShadow: isPlaying
                      ? [
                          "0 0 20px rgba(255,107,0,0.5)",
                          "0 0 40px rgba(255,107,0,0.8)",
                          "0 0 20px rgba(255,107,0,0.5)",
                        ]
                      : "0 0 20px rgba(255,107,0,0.3)",
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                />
                {isPlaying ? "⏸️" : "▶️"}
              </motion.button>

              {/* Next */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  setCurrentMantra((prev) => (prev + 1) % mantras.length)
                }
                className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center text-yellow-500 hover:bg-neutral-700 transition-colors"
              >
                ⏭️
              </motion.button>
            </div>
            {/* Waveform visualization */}
            <div className="flex items-center space-x-1 h-16">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-yellow-500 to-orange-500 rounded-full"
                  animate={{
                    height: isPlaying ? [10, Math.random() * 50 + 10, 10] : 10,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            {/* Multiple Diyas */}
            <div className="flex items-center justify-center space-x-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="text-3xl"
                  animate={{
                    scale: isPlaying ? [1, 1.2, 1] : 1,
                    filter: isPlaying
                      ? ["brightness(1)", "brightness(1.5)", "brightness(1)"]
                      : "brightness(0.7)",
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  🪔
                </motion.div>
              ))}
            </div>
            // src/components/Mantras.jsx (continued)
            {/* Benefits Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBenefits(!showBenefits)}
              className="px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full text-yellow-500 hover:border-yellow-500 transition-all"
            >
              {showBenefits ? "Hide" : "Show"} Benefits of Current Mantra
            </motion.button>
            {/* Benefits Display */}
            <AnimatePresence>
              {showBenefits && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full"
                >
                  <div className="bg-neutral-900/50 rounded-2xl p-6 border border-yellow-500/20">
                    <h4 className="text-lg font-semibold text-yellow-500 mb-3">
                      Benefits of {mantras[currentMantra].name}:
                    </h4>
                    <ul className="space-y-2">
                      {mantras[currentMantra].benefits.map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start text-gray-300"
                        >
                          <span className="text-yellow-500 mr-2">✦</span>
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mantra Detail Modal */}
        <AnimatePresence>
          {selectedMantra && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedMantra(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                transition={{ type: "spring", damping: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 rounded-3xl max-w-3xl w-full border border-yellow-500/30 shadow-[0_0_50px_rgba(255,215,0,0.2)] relative overflow-hidden"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 text-[200px] text-yellow-500/5 -rotate-12">
                  ॐ
                </div>

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMantra(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  ✕
                </motion.button>

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-4xl font-bold text-yellow-500 mb-6"
                  >
                    {selectedMantra.name}
                  </motion.h3>

                  {/* Sanskrit Text */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-neutral-800/50 rounded-2xl p-6 mb-6 border border-yellow-500/20"
                  >
                    <h4 className="text-lg font-semibold text-orange-400 mb-3">
                      Sanskrit:
                    </h4>
                    <p className="text-2xl md:text-3xl text-white font-sanskrit leading-relaxed">
                      {selectedMantra.sanskrit}
                    </p>
                  </motion.div>

                  {/* Meaning */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <h4 className="text-lg font-semibold text-orange-400 mb-3">
                      Meaning:
                    </h4>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {selectedMantra.meaning}
                    </p>
                  </motion.div>

                  {/* Benefits Grid */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    <h4 className="text-lg font-semibold text-orange-400 mb-4">
                      Benefits:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedMantra.benefits.map((benefit, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className="flex items-center bg-yellow-500/10 rounded-xl p-3 border border-yellow-500/20"
                        >
                          <span className="text-2xl mr-3">🌟</span>
                          <span className="text-gray-300">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Practice Guidelines */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="grid md:grid-cols-2 gap-4"
                  >
                    <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30">
                      <h5 className="font-semibold text-orange-400 mb-2">
                        Chant Count:
                      </h5>
                      <p className="text-white">{selectedMantra.chantCount}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
                      <h5 className="font-semibold text-yellow-400 mb-2">
                        Best Time:
                      </h5>
                      <p className="text-white">{selectedMantra.bestTime}</p>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap gap-4 mt-8 justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setCurrentMantra(
                          mantras.findIndex((m) => m.id === selectedMantra.id)
                        );
                        setSelectedMantra(null);
                        togglePlay();
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                    >
                      Play This Mantra 🎵
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500 text-yellow-500 rounded-full font-semibold hover:bg-yellow-500/30 transition-colors"
                    >
                      Download Audio 📥
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-yellow-500 mb-6">
            How to Chant
          </h3>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: "🧘",
                title: "Sit Comfortably",
                desc: "Find a quiet place and sit in a comfortable position",
              },
              {
                icon: "🫁",
                title: "Deep Breathing",
                desc: "Take few deep breaths to calm your mind",
              },
              {
                icon: "📿",
                title: "Use Mala",
                desc: "Use a 108-bead mala for counting if needed",
              },
              {
                icon: "🎯",
                title: "Focus",
                desc: "Concentrate on the meaning and vibration",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-neutral-900/50 backdrop-blur-sm p-6 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
              >
                <div className="text-4xl mb-3">{step.icon}</div>
                <h4 className="font-semibold text-yellow-500 mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Action Button for Quick Access */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 right-8 z-40"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(255,215,0,0.5)",
                "0 0 40px rgba(255,215,0,0.8)",
                "0 0 20px rgba(255,215,0,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl shadow-2xl"
          >
            ॐ
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Mantras;
