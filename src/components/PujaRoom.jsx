import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbar from './Navbar';

const DraggableItem = ({ id, x, y, type, emoji, isDragging }) => {
  const [{ opacity }, drag] = useDrag(() => ({
    type: type,
    item: { id, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  }));

  return (
    <motion.div
      ref={drag}
      style={{ 
        opacity,
        cursor: 'move',
        position: 'absolute',
        left: x,
        top: y
      }}
      whileHover={{ scale: 1.2, rotate: 5 }}
      className="text-4xl select-none z-20"
    >
      {emoji}
    </motion.div>
  );
};

const PujaRoomContent = () => {
  const [diyaLit, setDiyaLit] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [incenseLit, setIncenseLit] = useState(false);
  const [mantraPlaying, setMantraPlaying] = useState(false);
  const [blessings, setBlessings] = useState(0);
  const [showArti, setShowArti] = useState(false);
  const [prasadOffered, setPrasadOffered] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const audioRef = useRef(null);
  const bellAudioRef = useRef(null);
  const controls = useAnimation();

  // Set window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Puja Items
  const [pujaItems, setPujaItems] = useState([
    { id: 1, type: 'flower', emoji: '🌺', x: 50, y: 450 },
    { id: 2, type: 'flower', emoji: '🌸', x: 120, y: 450 },
    { id: 3, type: 'flower', emoji: '🌼', x: 190, y: 450 },
    { id: 4, type: 'prasad', emoji: '🍥', x: 260, y: 450 },
    { id: 5, type: 'prasad', emoji: '🥥', x: 330, y: 450 },
    { id: 6, type: 'water', emoji: '🥤', x: 400, y: 450 },
  ]);

  const [offeredItems, setOfferedItems] = useState([]);

  // Ganesha Drop Zone
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ['flower', 'prasad', 'water'],
    drop: (item) => {
      const pujaItem = pujaItems.find(p => p.id === item.id);
      if (pujaItem) {
        const newOfferedItem = {
          ...pujaItem,
          x: 250 + Math.random() * 300,
          y: 100 + Math.random() * 150,
          id: Date.now() + Math.random()
        };
        setOfferedItems(prev => [...prev, newOfferedItem]);
        setPujaItems(prev => prev.filter(p => p.id !== item.id));
        setBlessings(prev => prev + 10);
        
        // Special effects for different items
        if (item.type === 'prasad') setPrasadOffered(true);
        
        // Trigger blessing animation
        controls.start({
          scale: [1, 1.2, 1],
          transition: { duration: 0.5 }
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  // Ring Bell Function
  const ringBell = () => {
    setBellRinging(true);
    // Create new audio instance to avoid the NotSupportedError
    const audio = new Audio('/src/assets/audio/bells.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
    setBlessings(prev => prev + 5);
    setTimeout(() => setBellRinging(false), 2000);
  };

  // Light Diya Function
  const lightDiya = () => {
    setDiyaLit(!diyaLit);
    if (!diyaLit) setBlessings(prev => prev + 5);
  };

  // Light Incense Function
  const lightIncense = () => {
    setIncenseLit(!incenseLit);
    if (!incenseLit) setBlessings(prev => prev + 5);
  };

  // Play Mantra
  const toggleMantra = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/src/assets/audio/om-chanting.mp3');
      audioRef.current.loop = true;
    }
    
    if (mantraPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      setBlessings(prev => prev + 10);
    }
    setMantraPlaying(!mantraPlaying);
  };

  // Perform Arti
  const performArti = () => {
    setShowArti(true);
    setBlessings(prev => prev + 20);
    setTimeout(() => setShowArti(false), 5000);
  };

  // Reset Puja
  const resetPuja = () => {
    setPujaItems([
      { id: 1, type: 'flower', emoji: '🌺', x: 50, y: 450 },
      { id: 2, type: 'flower', emoji: '🌸', x: 120, y: 450 },
      { id: 3, type: 'flower', emoji: '🌼', x: 190, y: 450 },
      { id: 4, type: 'prasad', emoji: '🍥', x: 260, y: 450 },
      { id: 5, type: 'prasad', emoji: '🥥', x: 330, y: 450 },
      { id: 6, type: 'water', emoji: '🥤', x: 400, y: 450 },
    ]);
    setOfferedItems([]);
    setDiyaLit(false);
    setIncenseLit(false);
    setPrasadOffered(false);
    if (audioRef.current) {
      audioRef.current.pause();
      setMantraPlaying(false);
    }
  };

  // Calculate particle count safely
  const particleCount = Math.min(Math.floor(blessings / 10), 20);

  return (
    <section className="min-h-screen py-20 px-4 bg-[#0A0A0A] relative overflow-hidden">
        <Navbar/>   
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: windowSize.height + 10,
            }}
            animate={{
              y: -10,
              x: Math.random() * windowSize.width,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
            Virtual Puja Room
          </h2>
          <p className="text-xl text-gray-300">पूजा - Experience Divine Connection</p>
        </motion.div>

        {/* Blessing Counter */}
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-full px-6 py-3 border border-yellow-500/50"
          animate={controls}
        >
          <p className="text-yellow-400 font-semibold">Blessings: {blessings} ✨</p>
        </motion.div>

        {/* Main Puja Area */}
        <div className="relative bg-gradient-to-b from-purple-900/20 via-neutral-900/50 to-neutral-900/80 rounded-3xl p-8 backdrop-blur-md border border-yellow-500/30 min-h-[600px] shadow-[0_0_50px_rgba(255,215,0,0.1)]">
          
          {/* Temple Background */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-80 bg-gradient-to-b from-orange-500/10 to-transparent rounded-full blur-3xl" />
          </div>

          {/* Ganesha Murti Area */}
          <motion.div 
            ref={drop}
            className={`absolute top-10 left-1/2 -translate-x-1/2 w-96 h-72 flex flex-col items-center justify-center rounded-3xl transition-all ${
              isOver ? 'bg-yellow-500/20 shadow-[0_0_30px_rgba(255,215,0,0.5)]' : 'bg-gradient-to-b from-neutral-800/30 to-neutral-900/30'
            } ${canDrop ? 'border-2 border-yellow-500' : 'border border-yellow-500/20'}`}
            animate={{
              boxShadow: isOver 
                ? ["0 0 20px rgba(255,215,0,0.3)", "0 0 40px rgba(255,215,0,0.6)", "0 0 20px rgba(255,215,0,0.3)"]
                : "0 0 20px rgba(255,215,0,0.1)"
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Ganesha Image/Icon */}
            <motion.div 
              className="text-[180px] mb-4"
              animate={{
                scale: [1, 1.05, 1],
                filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🕉️
            </motion.div>
            <p className="text-yellow-400 text-sm">Drop offerings here</p>
          </motion.div>

          {/* Offered Items */}
          <AnimatePresence>
            {offeredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0, rotate: 0, opacity: 0 }}
                animate={{ scale: 1, rotate: 360, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                style={{ position: 'absolute', left: item.x, top: item.y }}
                className="text-3xl"
              >
                {item.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Draggable Items */}
          {pujaItems.map((item) => (
            <DraggableItem key={item.id} {...item} />
          ))}

          {/* Multiple Diyas */}
          <div className="absolute bottom-20 left-10 flex space-x-4">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="cursor-pointer"
                onClick={() => index === 0 && lightDiya()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="text-4xl">🪔</div>
                <AnimatePresence>
                  {(index === 0 ? diyaLit : true) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -10 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                    >
                      <motion.div 
                        className="text-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        🔥
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Incense Sticks */}
          <motion.div
            className="absolute bottom-20 left-40 cursor-pointer"
            onClick={lightIncense}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="text-4xl">🥢</div>
            <AnimatePresence>
              {incenseLit && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2"
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gray-400 rounded-full"
                      animate={{
                        y: [-5, -20, -35],
                        x: [0, Math.random() * 10 - 5, Math.random() * 20 - 10],
                        opacity: [0.8, 0.5, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          // src/components/PujaRoom.jsx (continued)

          {/* Bell */}
          <motion.div
            className="absolute bottom-20 right-20 cursor-pointer"
            onClick={ringBell}
            animate={{
              rotate: bellRinging ? [0, -15, 15, -15, 15, 0] : 0
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="text-5xl">🔔</div>
            {bellRinging && (
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <div className="text-2xl">🎵</div>
              </motion.div>
            )}
          </motion.div>

          {/* Mantra Player */}
          <motion.div
            className="absolute bottom-20 right-40 cursor-pointer"
            onClick={toggleMantra}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div 
              className="text-4xl"
              animate={{
                rotate: mantraPlaying ? 360 : 0
              }}
              transition={{
                duration: 3,
                repeat: mantraPlaying ? Infinity : 0,
                ease: "linear"
              }}
            >
              📿
            </motion.div>
            {mantraPlaying && (
              <motion.div
                className="absolute -top-8 left-1/2 -translate-x-1/2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="text-xl">🕉️</div>
              </motion.div>
            )}
          </motion.div>

          {/* Arti Thali */}
          <motion.div
            className="absolute bottom-20 right-60 cursor-pointer"
            onClick={performArti}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="text-4xl">🍽️</div>
          </motion.div>

          {/* Arti Animation */}
          <AnimatePresence>
            {showArti && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  className="text-8xl"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 5,
                    ease: "linear"
                  }}
                >
                  🔥
                </motion.div>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-4xl"
                    initial={{
                      x: 0,
                      y: 0,
                    }}
                    animate={{
                      x: Math.cos(i * Math.PI / 4) * 150,
                      y: Math.sin(i * Math.PI / 4) * 150,
                      rotate: 360,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Instructions Panel */}
          <motion.div 
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-full px-6 py-3 border border-yellow-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <p className="text-yellow-400 text-sm font-medium">
              Drag offerings to deity • Light diyas & incense • Ring bell • Play mantras • Perform arti
            </p>
          </motion.div>

          {/* Reset Button */}
          <motion.button
            className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-full text-orange-400 hover:border-orange-500 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetPuja}
          >
            Reset Puja 🔄
          </motion.button>
        </div>

        {/* Puja Items Legend */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { emoji: '🌺', name: 'Flowers', desc: 'For beauty and devotion' },
            { emoji: '🍥', name: 'Modak', desc: "Ganesha's favorite sweet" },
            { emoji: '🥥', name: 'Coconut', desc: 'Symbol of selfless offering' },
            { emoji: '🥤', name: 'Holy Water', desc: 'For purification' },
            { emoji: '🪔', name: 'Diya', desc: 'Light of knowledge' },
            { emoji: '🔔', name: 'Bell', desc: 'Awakens divine presence' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-sm p-4 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
            >
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{item.emoji}</div>
                <div>
                  <h4 className="font-semibold text-yellow-400">{item.name}</h4>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Special Effects Container */}
        <AnimatePresence>
          {prasadOffered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 pointer-events-none z-50"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{
                    x: windowSize.width / 2,
                    y: windowSize.height / 2,
                    scale: 0
                  }}
                  animate={{
                    x: Math.random() * windowSize.width,
                    y: Math.random() * windowSize.height,
                    scale: [0, 1, 0],
                    rotate: 360
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.1,
                  }}
                  onAnimationComplete={() => {
                    if (i === 19) setPrasadOffered(false);
                  }}
                >
                  🌟
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blessing Messages */}
        <AnimatePresence>
          {blessings > 0 && blessings % 50 === 0 && (
            <motion.div
              key={blessings}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-2xl z-50"
            >
              🙏 Ganpati Bappa Morya! 🙏
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Blessing Particles */}
        {blessings > 0 && particleCount > 0 && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(particleCount)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{
                  x: Math.random() * windowSize.width,
                  y: windowSize.height,
                }}
                animate={{
                  y: -20,
                  x: Math.random() * windowSize.width,
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}

        {/* Achievement Notifications */}
        <div className="fixed bottom-4 right-4 space-y-2">
          <AnimatePresence>
            {blessings >= 100 && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                🏆 Divine Devotee - 100 Blessings!
              </motion.div>
            )}
            {blessings >= 200 && (
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg"
              >
                🌟 Blessed Soul - 200 Blessings!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Puja Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <div className="bg-neutral-800/50 rounded-full p-1 backdrop-blur-sm border border-yellow-500/20">
            <motion.div
              className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full h-4"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((blessings / 200) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-center text-yellow-400 text-sm mt-2">
            Puja Progress: {Math.min(Math.floor((blessings / 200) * 100), 100)}%
          </p>
        </motion.div>

        {/* Mobile Touch Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="md:hidden text-center mt-8 text-gray-400 text-sm"
        >
          <p>Touch and drag items to offer them to Lord Ganesha</p>
        </motion.div>

        {/* Puja Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-500/20 max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">🙏 Puja Tips</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              Start by lighting the diyas for divine illumination
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              Offer flowers with devotion and pure heart
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              Ring the bell to invoke Lord Ganesha's presence
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              Complete with arti for maximum blessings
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

const PujaRoom = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <PujaRoomContent />
    </DndProvider>
  );
};

export default PujaRoom;