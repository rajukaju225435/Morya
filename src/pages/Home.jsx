import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: '📿',
      title: 'Sacred Mantras',
      description: 'Listen to divine Ganesha mantras and chants',
      link: '/mantras',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '📖',
      title: 'Divine Stories',
      description: 'Read the legendary tales of Lord Ganesha',
      link: '/stories',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🪔',
      title: 'Virtual Puja',
      description: 'Perform online puja and seek blessings',
      link: '/puja-room',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🎨',
      title: 'Sacred Gallery',
      description: 'Beautiful collection of Ganesha artwork',
      link: '/gallery',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const blessings = [
    "विघ्नहर्ता मंगलकर्ता",
    "गणपति बाप्पा मोरया",
    "श्री गणेशाय नमः",
    "वक्रतुण्ड महाकाय"
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-hidden">
      <Navbar />
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#FF6B00]/20 to-[#FFD700]/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-r from-[#DC143C]/20 to-[#FF6B00]/20 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, 150, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-[#FFD700] to-[#FF6B00] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100, -20],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 1, 0],
                scale: [0, Math.random() * 2 + 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Sacred Symbols Background */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-8xl text-[#FFD700]"
              style={{
                left: `${(i % 4) * 25 + 10}%`,
                top: `${Math.floor(i / 4) * 50 + 20}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              ॐ
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        {/* Mouse Follow Effect */}
        <motion.div
          className="absolute w-[500px] h-[500px] bg-gradient-radial from-[#FF6B00]/20 to-transparent rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 250,
            y: mousePosition.y - 250,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 50 }}
        />

        {/* Main Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ scale, opacity }}
          className="relative z-10 text-center max-w-5xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block text-6xl mb-4"
            >
              🙏
            </motion.div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold mb-6"
            style={{ y: y1 }}
          >
            <span className="inline-block">
              {["Welcome", "to"].map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-4 bg-gradient-to-r from-[#FFD700] to-[#FF6B00] bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          
          <motion.h2 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-8"
            style={{ y: y2 }}
          >
            <motion.span 
              className="bg-gradient-to-r from-[#FF6B00] via-[#FFD700] to-[#DC143C] bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                backgroundSize: "200% 200%",
                filter: "drop-shadow(0 0 30px rgba(255,107,0,0.5))"
              }}
            >
              Ganesha's Divine Realm
            </motion.span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto"
          >
            Experience the divine journey through stories, mantras, and blessings of Lord Ganesha
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/stories">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,107,0,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="relative px-10 py-5 bg-gradient-to-r from-[#FF6B00] to-[#DC143C] text-white rounded-full font-bold text-lg shadow-lg overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative z-10 flex items-center gap-2">
                  Explore Stories
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </Link>
            <Link to="/mantras">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-full font-bold text-lg hover:border-[#FFD700]/50 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Listen Mantras
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎵
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden">
            <motion.div 
              className="w-2 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <motion.p
            className="text-white/50 text-sm mt-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll Down
          </motion.p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-7xl mx-auto"
        >
          <motion.h2 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FF6B00] to-[#DC143C] bg-clip-text text-transparent">
              Divine Experiences
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="relative group perspective-1000"
              >
                <Link to={feature.link}>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full overflow-hidden">
                    {/* Animated Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`}
                    />
                    
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                      animate={{
                        x: ["-200%", "200%"]
                      }}
                      transition={{
                        duration: 3,
                                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Icon with Animation */}
                    <motion.div 
                      className="text-6xl mb-6"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-white/70 mb-6">
                      {feature.description}
                    </p>
                    
                    {/* Hover Arrow */}
                    <motion.div
                      className="flex items-center text-white/50 group-hover:text-white transition-colors"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <span className="mr-2">Explore</span>
                      <motion.span
                        animate={{
                          x: [0, 5, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Blessings Section */}
      <section className="py-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-12"
          >
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] bg-clip-text text-transparent">
              Divine Blessings
            </span>
          </motion.h2>

          <div className="space-y-6">
            {blessings.map((blessing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-white/80 py-6 px-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md rounded-2xl border border-white/20"
                  whileHover={{
                    borderColor: "rgba(255, 215, 0, 0.5)",
                    boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)"
                  }}
                >
                  {blessing}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-[#FF6B00]/20 to-[#DC143C]/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundImage: "linear-gradient(to right, #FFD700, #FF6B00, #DC143C)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent"
              }}
            >
              Begin Your Spiritual Journey
            </motion.h2>
            
            <p className="text-xl text-white/70 mb-8">
              Immerse yourself in the divine presence of Lord Ganesha
            </p>
            
            <Link to="/puja-room">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-gradient-to-r from-[#FFD700] to-[#FF6B00] text-black font-bold text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  Enter Virtual Temple
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    🪔
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-white/50"
          >
            © 2025 Ganesha's Divine Realm. Made with devotion and love.
          </motion.p>
  
        </div>
      </footer>
    </div>
  );
};

export default Home;