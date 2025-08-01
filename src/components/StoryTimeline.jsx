// src/components/StoryTimeline.jsx
import React from 'react';
import { motion } from 'framer-motion';

const StoryTimeline = () => {
  const timeline = [
    { year: "Ancient Times", event: "Birth of Ganesha", icon: "👶" },
    { year: "First Worship", event: "Declared as Pratham Pujya", icon: "🙏" },
    { year: "Mahabharata Era", event: "Scribe of the Epic", icon: "✍️" },
    { year: "Modern Times", event: "Ganesh Chaturthi Celebrations", icon: "🎉" }
  ];

  return (
    <div className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        <span className="bg-gradient-to-r from-[#FFD700] to-[#FF6B00] bg-clip-text text-transparent">
          Through The Ages
        </span>
      </h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] to-[#FF6B00]"></div>
          
          {/* Timeline Items */}
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex items-center mb-8"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                className="w-16 h-16 bg-gradient-to-r from-[#FF6B00] to-[#DC143C] rounded-full flex items-center justify-center text-2xl z-10"
              >
                {item.icon}
              </motion.div>
              
              {/* Content */}
              <div className="ml-8 flex-1">
                <h3 className="text-xl font-semibold text-[#FFD700]">{item.year}</h3>
                <p className="text-white/70">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryTimeline;