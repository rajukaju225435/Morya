import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ganeshVideo from "../assets/video/ganeshji.mp4";
import wooshSound from "../assets/audio/woosh.mp3";
import ganeshaMusic from "../assets/audio/ganesha-intro.mp3";
import MouseLoader from "./MouseLoader";

const Landing = () => {
  const [showButton, setShowButton] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const navigate = useNavigate();
  const [audioAllowed, setAudioAllowed] = useState(false);
  const [muted, setMuted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  
  // Audio refs
  const bgAudioRef = useRef(null);
  const wooshRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Cleanup function to stop all audio
  const stopAllAudio = () => {
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current.currentTime = 0;
    }
    if (wooshRef.current) {
      wooshRef.current.pause();
      wooshRef.current.currentTime = 0;
    }
  };

  const handleEnter = () => {
    // stopAllAudio(); // Stop all audio before navigation
    if (wooshRef.current) {
      wooshRef.current.play().catch(err => console.log("Woosh play error:", err));
    }
    setShowLoader(true);
  };

  // Handle loader finish
  const handleLoaderFinish = () => {
    stopAllAudio(); // Ensure audio is stopped before navigation
    navigate("/home");
  };

  // Animation variants (same as before)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const floatingAnimation = {
    animate: {
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const mainTitle = "The Divine Journey";
  const letters = mainTitle.split("");

  useEffect(() => {
    const allowedBefore = localStorage.getItem("audioAllowed") === "true";
    
    if (allowedBefore) {
      bgAudioRef.current = new Audio(ganeshaMusic);
      bgAudioRef.current.loop = true;
      bgAudioRef.current.volume = 0.5;
      bgAudioRef.current.play().then(() => {
        setAudioAllowed(true);
      }).catch(() => {
        setAudioAllowed(false);
      });
    } else {
      setAudioAllowed(false);
    }

    wooshRef.current = new Audio(wooshSound);
    wooshRef.current.volume = 0.8;

    // Cleanup on component unmount
    return () => {
      stopAllAudio();
    };
  }, []);

  const handleAudioPermission = () => {
    if (!bgAudioRef.current) {
      bgAudioRef.current = new Audio(ganeshaMusic);
      bgAudioRef.current.loop = true;
      bgAudioRef.current.volume = 0.5;
    }
    
    bgAudioRef.current.play().then(() => {
      setAudioAllowed(true);
      localStorage.setItem("audioAllowed", "true");
    }).catch(err => {
      console.warn("Autoplay blocked:", err);
    });
  };

  const toggleMute = () => {
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  // Stop audio when component unmounts or navigates away
  useEffect(() => {
    return () => {
      stopAllAudio();
    };
  }, []);

  return (
    <>
      {showLoader && <MouseLoader onFinish={handleLoaderFinish} />}

      <AnimatePresence>
        {!videoEnded && (
          <motion.div
            className="fixed inset-0 w-full h-screen overflow-hidden"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Video */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
            >
              <source src={ganeshVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute top-5 left-5 z-50 flex gap-3">
              {!audioAllowed && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAudioPermission}
                  className="px-4 py-2 bg-primary-orange text-white rounded-full shadow-lg"
                >
                  🎵 Play Music
                </motion.button>
              )}
              {audioAllowed && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMute}
                  className="px-4 py-2 bg-primary-orange text-white rounded-full shadow-lg"
                >
                  {muted ? "🔇 Unmute" : "🔊 Mute"}
                </motion.button>
              )}
            </div>
            
            {/* Animated Gradient Overlay */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
                  "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.3), rgba(0,0,0,0.7))",
                  "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4), rgba(0,0,0,0.8))",
                ],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Particle Effects */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary-gold rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-20, -100],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Content Overlay */}
            <motion.div
              className="relative h-screen flex flex-col justify-center items-center z-10 px-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Sanskrit Mantra */}
              <motion.div variants={titleVariants} className="text-center mb-8">
                <motion.h1
                  className="text-4xl md:text-5xl text-primary-gold font-light mb-2"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(255,215,0,0.5)",
                      "0 0 40px rgba(255,215,0,0.8)",
                      "0 0 20px rgba(255,215,0,0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ॥ श्री गणेशाय नमः ॥
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="text-sm md:text-base text-primary-gold/70"
                >
                  Shri Ganeshaya Namah
                </motion.p>
              </motion.div>

              {/* Main Title with Letter Animation */}
              <motion.div
                variants={subtitleVariants}
                className="text-center mb-12"
                onAnimationComplete={() => setTextAnimationComplete(true)}
              >
                <h2 className="text-5xl md:text-7xl font-bold">
                  {letters.map((letter, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={letterAnimation}
                      initial="hidden"
                      animate="visible"
                      className="inline-block gradient-text"
                      style={{
                        background:
                          "linear-gradient(45deg, #FFD700, #FF6B00, #FF1744)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        filter: "drop-shadow(0 0 30px rgba(255,107,0,0.5))",
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3, duration: 1 }}
                  className="text-lg md:text-xl text-white/80 mt-4"
                >
                  Experience the divine blessings of Lord Ganesha
                </motion.p>
              </motion.div>

              {/* Animated Button */}
              <AnimatePresence>
                {showButton && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="relative"
                  >
                    {/* Button Glow Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-orange to-accent-red rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Main Button */}
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 40px rgba(255,107,0,0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEnter}
                      className="relative px-12 py-5 text-lg font-bold bg-gradient-to-r from-primary-orange via-accent-red to-primary-orange bg-size-200 bg-pos-0 text-white rounded-full cursor-pointer overflow-hidden transition-all duration-500 hover:bg-pos-100"
                      style={{
                        backgroundSize: "200% 100%",
                        backgroundPosition: "0% 0%",
                        transition: "background-position 0.5s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundPosition = "100% 0%";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundPosition = "0% 0%";
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Enter Divine Realm
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>

                      {/* Button Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

                            {/* Floating Om Symbols */}
              <motion.div
                className="absolute top-10 right-10 text-5xl text-primary-gold/30"
                variants={floatingAnimation}
                animate="animate"
              >
                ॐ
              </motion.div>

              <motion.div
                className="absolute bottom-20 left-10 text-4xl text-primary-gold/20"
                variants={floatingAnimation}
                animate="animate"
                style={{ animationDelay: "1s" }}
              >
                ॐ
              </motion.div>

              <motion.div
                className="absolute top-1/3 left-20 text-3xl text-primary-gold/25"
                variants={pulseAnimation}
                animate="animate"
              >
                🪔
              </motion.div>

              <motion.div
                className="absolute top-1/3 right-20 text-3xl text-primary-gold/25"
                variants={pulseAnimation}
                animate="animate"
                style={{ animationDelay: "1.5s" }}
              >
                🪔
              </motion.div>

              {/* Bottom Decorative Line */}
              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "200px", opacity: 1 }}
                transition={{ delay: 2, duration: 1.5 }}
              >
                <div className="h-[1px] bg-gradient-to-r from-transparent via-primary-gold to-transparent" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Landing;