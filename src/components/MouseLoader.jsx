import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import mouseImg from "../assets/images/mouse.png";

const MouseLoader = ({ onFinish }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      ]);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0A0A0A] z-50 overflow-hidden">
      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          initial={{
            x: sparkle.x,
            y: sparkle.y,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            scale: [0, 2, 0],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1 }}
          onAnimationComplete={() => {
            setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
          }}
        />
      ))}

      {/* Divine light rays */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-96 bg-gradient-to-t from-transparent to-orange-300"
            style={{
              transformOrigin: "center bottom",
            }}
            animate={{
              rotate: i * 45,
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              opacity: {
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
              },
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 flex items-center justify-center bg-[#0A0A0A] z-50 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          {/* Om symbols floating */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-orange-300 text-4xl opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360,
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear",
              }}
            >
              ॐ
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0">
          {/* Om symbols floating */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-orange-300 text-4xl opacity-20"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: 360,
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear",
              }}
            >
              ॐ
            </motion.div>
          ))}
        </div>

        {/* Main content container */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Sanskrit text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-1/3 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-orange-600 mb-2">
              श्री गणेशाय नमः
            </h1>
            <p className="text-xl md:text-2xl text-orange-500">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ
            </p>
          </motion.div>

          {/* Ground/Path for mouse */}
          <div className="absolute bottom-72 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-50" />

          {/* Mouse running animation */}
          <motion.div
            initial={{ x: "-150px" }} // Start from outside left screen
            animate={{
              x: `calc(100vw + 150px)`, // End outside right screen
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
            }}
            className="absolute bottom-72"
          >
            {/* Mouse container with running effect */}
            <motion.div
              animate={{
                y: [-5, -15, -5],
                rotate: [-5, 5, -5],
              }}
              transition={{
                y: {
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative"
            >
              {/* Dust particles behind mouse */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute -left-10 bottom-0 w-2 h-2 bg-orange-300 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: -i * 15 - 10,
                    y: Math.random() * 10 - 5,
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}

              {/* Mouse image */}
              <img
                src={mouseImg}
                alt="Mushak - Ganesh ji ka Vahan"
                className="w-36 h-auto md:w-32 transform scale-x-[-1]" // Flipped to face right
              />

              {/* Glowing effect */}
              <motion.div
                className="absolute inset-0 bg-orange-300 rounded-full blur-xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </motion.div>

          {/* Bottom Sanskrit text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-10 text-center"
          >
            <p className="text-lg text-orange-600 font-semibold">
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा
            </p>
          </motion.div>
        </div>

        {/* Auto finish after animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          onAnimationComplete={() => {
            if (onFinish) {
              setTimeout(onFinish, 200);
            }
          }}
        />
      </div>
    </div>
  );
};

export default MouseLoader;
