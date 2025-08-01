import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);

  const categories = [
    { id: "all", name: "All Forms", icon: "🕉️" },
    { id: "traditional", name: "Traditional", icon: "🪔" },
    { id: "modern", name: "Modern Art", icon: "🎨" },
    { id: "festival", name: "Festivals", icon: "🎊" },
    { id: "temple", name: "Temple Darshan", icon: "🛕" },
  ];

  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1570032257804-d8c6dfcfb7d9?auto=format&fit=crop&w=800&q=80",
      title: "Siddhivinayak",
      category: "temple",
      description: "The Lord of Success and Prosperity",
      mantra: "ॐ गं गणपतये नमः",
      blessing: "May all obstacles be removed from your path",
    },
    {
      id: 2,
      src: "/src/assets/images/ganesha-bg.jpg",
      title: "Bal Ganesh",
      category: "traditional",
      description: "The Playful Divine Child",
      mantra: "वक्रतुण्ड महाकाय",
      blessing: "May innocence and joy fill your life",
    },
    {
      id: 3,
      src: "/src/assets/images/ganesha-bg.jpg",
      title: "Ekdanta",
      category: "traditional",
      description: "The Single-Tusked Lord",
      mantra: "एकदन्ताय विद्महे",
      blessing: "May you gain focus and determination",
    },
    {
      id: 4,
      src: "/src/assets/images/ganesha-bg.jpg",
      title: "Dancing Ganesha",
      category: "modern",
      description: "The Cosmic Dancer",
      mantra: "नृत्य गणपति",
      blessing: "May your life be filled with rhythm and grace",
    },
    {
      id: 5,
      src: "/src/assets/images/ganesha-bg.jpg",
      title: "Ganesh Chaturthi",
      category: "festival",
      description: "The Grand Celebration",
      mantra: "गणपति बप्पा मोरया",
      blessing: "May festivities bring community and joy",
    },
    {
      id: 6,
      src: "/src/assets/images/ganesha-bg.jpg",
      title: "Vighnaharta",
      category: "temple",
      description: "The Remover of Obstacles",
      mantra: "विघ्नहर्ता मंगलकर्ता",
      blessing: "May all hurdles vanish from your journey",
    },
  ];

  //   const images = [
  //   {
  //     id: 1,
  //     src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  //     title: 'Siddhivinayak',
  //     category: 'temple',
  //     description: 'The Lord of Success and Prosperity',
  //     mantra: 'ॐ गं गणपतये नमः',
  //     blessing: 'May all obstacles be removed from your path'
  //   },
  //   {
  //     id: 2,
  //     src: 'https://images.unsplash.com/photo-1604608672516-f1b9b1d37076?w=800&q=80',
  //     title: 'Bal Ganesh',
  //     category: 'traditional',
  //     description: 'The Playful Divine Child',
  //     mantra: 'वक्रतुण्ड महाकाय',
  //     blessing: 'May innocence and joy fill your life'
  //   },
  //   {
  //     id: 3,
  //     src: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80',
  //     title: 'Ekdanta',
  //     category: 'traditional',
  //     description: 'The Single-Tusked Lord',
  //     mantra: 'एकदन्ताय विद्महे',
  //     blessing: 'May you gain focus and determination'
  //   },
  //   {
  //     id: 4,
  //     src: 'https://images.unsplash.com/photo-1609003037513-d3da3e2dcdac?w=800&q=80',
  //     title: 'Dancing Ganesha',
  //     category: 'modern',
  //     description: 'The Cosmic Dancer',
  //     mantra: 'नृत्य गणपति',
  //     blessing: 'May your life be filled with rhythm and grace'
  //   },
  //   {
  //     id: 5,
  //     src: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80',
  //     title: 'Ganesh Chaturthi',
  //     category: 'festival',
  //     description: 'The Grand Celebration',
  //     mantra: 'गणपति बप्पा मोरया',
  //     blessing: 'May festivities bring community and joy'
  //   },
  //   {
  //     id: 6,
  //     src: 'https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?w=800&q=80',
  //     title: 'Vighnaharta',
  //     category: 'temple',
  //     description: 'The Remover of Obstacles',
  //     mantra: 'विघ्नहर्ता मंगलकर्ता',
  //     blessing: 'May all hurdles vanish from your journey'
  //   },
  //   {
  //     id: 7,
  //     src: 'https://images.unsplash.com/photo-1604607055958-4def78942d6e?w=800&q=80',
  //     title: 'Lambodara',
  //     category: 'traditional',
  //     description: 'The Large-Bellied Lord',
  //     mantra: 'लम्बोदराय नमः',
  //     blessing: 'May abundance and prosperity flow to you'
  //   },
  //   {
  //     id: 8,
  //     src: 'https://images.unsplash.com/photo-1582639590011-f5a8416d1101?w=800&q=80',
  //     title: 'Modak Priya',
  //     category: 'festival',
  //     description: 'Lover of Sweet Dumplings',
  //     mantra: 'मोदक प्रियाय नमः',
  //     blessing: 'May sweetness and happiness fill your days'
  //   },
  //   {
  //     id: 9,
  //     src: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=800&q=80',
  //     title: 'Gajanana',
  //     category: 'modern',
  //     description: 'The Elephant-Faced Deity',
  //     mantra: 'गजाननाय नमः',
  //     blessing: 'May wisdom and strength guide your path'
  //   },
  //   {
  //     id: 10,
  //     src: 'https://images.unsplash.com/photo-1571745544682-143ea663cf2c?w=800&q=80',
  //     title: 'Vinayaka Temple',
  //     category: 'temple',
  //     description: 'Sacred Temple Architecture',
  //     mantra: 'विनायकाय नमः',
  //     blessing: 'May divine grace always protect you'
  //   },
  //   {
  //     id: 11,
  //     src: 'https://images.unsplash.com/photo-1604608096262-f3e2ceeb8e42?w=800&q=80',
  //     title: 'Golden Ganesha',
  //     category: 'modern',
  //     description: 'The Radiant Form',
  //     mantra: 'सुवर्ण गणेशाय नमः',
  //     blessing: 'May your life shine with divine light'
  //   },
  //   {
  //     id: 12,
  //     src: 'https://images.unsplash.com/photo-1599582893920-181c0c68da8f?w=800&q=80',
  //     title: 'Festival Procession',
  //     category: 'festival',
  //     description: 'Community Celebration',
  //     mantra: 'मंगलमूर्ति मोरया',
  //     blessing: 'May unity and joy surround you always'
  //   }
  // ];

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  // Floating elements animation
  const floatingElements = [
    { id: 1, emoji: "🪷", delay: 0 },
    { id: 2, emoji: "🕉️", delay: 2 },
    { id: 3, emoji: "📿", delay: 4 },
    { id: 4, emoji: "🪔", delay: 6 },
  ];

  return (
    <section className="min-h-screen py-20 px-4 bg-[#0A0A0A]  relative overflow-hidden">
      <Navbar />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 text-[400px] text-[#FF6B00]/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        >
          ॐ
        </motion.div>
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute text-4xl opacity-10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: 20,
              delay: element.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {element.emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FF6B00] to-[#DC143C] bg-clip-text text-transparent animate-gradient">
              Divine Gallery
            </span>
          </motion.h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            दर्शन - Experience the sacred visions of Lord Ganesha in various
            divine forms
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-[#FF6B00] to-[#DC143C] text-white shadow-lg scale-105"
                  : "bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur-md"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid with Unique Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredId(image.id)}
                onHoverEnd={() => setHoveredId(null)}
                onClick={() => setSelectedImage(image)}
                className="group relative cursor-pointer"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/20 to-[#DC143C]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

                {/* Card */}
                <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-[#FF6B00]/50 transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Overlay with Mantra */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === image.id ? 1 : 0.7 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p
                        className="text-[#FFD700] text-2xl font-bold mb-2 text-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: hoveredId === image.id ? 0 : 20,
                          opacity: hoveredId === image.id ? 1 : 0,
                        }}
                      >
                        {image.mantra}
                      </motion.p>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-[#FFD700] mb-2">
                      {image.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4">
                      {image.description}
                    </p>

                    {/* Interactive Elements */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50 bg-white/10 px-3 py-1 rounded-full">
                        {
                          categories.find((cat) => cat.id === image.category)
                            ?.name
                        }
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-[#FF6B00] hover:text-[#FFD700] transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox with Enhanced Features */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.5, rotateY: -180 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.5, rotateY: 180 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#FF6B00]/30 rounded-3xl p-8 md:p-12">
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    ✕
                  </motion.button>

                  {/* Image */}
                  <motion.img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="w-full h-auto rounded-2xl mb-8 max-h-[60vh] object-contain"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  />

                  {/* Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF6B00] bg-clip-text text-transparent mb-4">
                      {selectedImage.title}
                    </h3>
                    <p className="text-3xl text-[#FFD700] mb-4">
                      {selectedImage.mantra}
                    </p>
                    <p className="text-xl text-white/80 mb-6">
                      {selectedImage.description}
                    </p>

                    {/* Blessing */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-[#FF6B00]/20 to-[#DC143C]/20 rounded-2xl p-6 border border-[#FF6B00]/30"
                    >
                      <p className="text-lg text-white/90 italic">
                        ✨ {selectedImage.blessing} ✨
                      </p>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-[#FF6B00] to-[#DC143C] text-white rounded-full font-semibold shadow-lg"
                      >
                        Share Blessing 🙏
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
                      >
                        Download Darshan 📸
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Decorative Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
            <span className="text-[#FFD700]">🕉️</span>
            <p className="text-white/70">
              Each image carries divine blessings. Click to receive your
              personal message.
            </p>
            <span className="text-[#FFD700]">🕉️</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Interactive Elements */}
      <motion.div
        className="fixed bottom-10 right-10 text-5xl cursor-pointer z-40"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
        onClick={() => {
          // Add blessing notification or animation
          alert("🙏 Ganpati Bappa Morya! May Lord Ganesha bless you!");
        }}
      >
        🪔
      </motion.div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
