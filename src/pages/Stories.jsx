import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import StoryTimeline from "../components/StoryTimeline";

const Stories = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const stories = [
    {
      id: 1,
      title: "Birth of Lord Ganesha",
      shortDescription: "The divine story of how Lord Ganesha came into being",
      fullStory: `One day, Goddess Parvati created a boy from the turmeric paste she used for bathing. She breathed life into him and asked him to guard the door while she bathed. When Lord Shiva returned and tried to enter, the boy refused to let him pass. This led to a fierce battle where Shiva, in his anger, severed the boy's head. 

      Upon learning the truth from Parvati, Shiva was filled with remorse. He sent his followers to bring the head of the first living being they found facing north. They returned with an elephant's head, which Shiva placed on the boy's body, bringing him back to life. He blessed him as Ganesha, the lord of all beings, and declared that he would be worshipped first in all ceremonies.`,
      icon: "👶",
      color: "from-orange-500 to-red-500",
      category: "origin",
      image: "🐘",
      moral:
        "Even from conflict can arise great blessings. Ganesha's transformation made him the remover of obstacles.",
    },
    {
      id: 2,
      title: "Ganesha and Kartikeya",
      shortDescription: "The race around the universe",
      fullStory: `Once, Lord Shiva and Parvati decided to test their two sons. They announced that whoever could circle the entire universe first would receive a divine fruit of knowledge. Kartikeya immediately mounted his peacock and flew off to circle the universe.

      Ganesha, with his wisdom, simply walked around his parents and said, "You are my universe. Where else do I need to go?" Touched by his devotion and intelligence, Shiva and Parvati declared Ganesha the winner. This story shows that wisdom and devotion are greater than physical strength.`,
      icon: "🏃",
      color: "from-yellow-500 to-orange-500",
      category: "wisdom",
      image: "🌍",
      moral:
        "True wisdom lies in recognizing what is truly important. Parents are indeed the universe for their children.",
    },
    {
      id: 3,
      title: "Ganesha and the Moon",
      shortDescription: "Why we don't look at the moon on Ganesh Chaturthi",
      fullStory: `On a Ganesh Chaturthi night, after feasting on modaks, Ganesha was riding his mouse when he stumbled and fell. The moon saw this and laughed at him. Angry at being mocked, Ganesha cursed the moon that anyone who looked at it on Ganesh Chaturthi would face false accusations.

      The moon begged for forgiveness, and Ganesha modified the curse, saying that those who hear this story would be freed from the curse. This is why people avoid looking at the moon on Ganesh Chaturthi and share this tale.`,
      icon: "🌙",
      color: "from-purple-500 to-pink-500",
      category: "lesson",
      image: "🌕",
      moral:
        "One should never mock others, for everyone deserves respect regardless of their appearance.",
    },
    {
      id: 4,
      title: "Ganesha's Broken Tusk",
      shortDescription: "The story behind Ekadanta",
      fullStory: `When sage Vyasa needed someone to write down the Mahabharata as he recited it, he approached Ganesha. Ganesha agreed on the condition that Vyasa would narrate without pause. Vyasa agreed, but asked that Ganesha must understand everything before writing.

      During the dictation, Ganesha's pen broke. Not wanting to stop the flow, he broke off his own tusk and used it as a pen to continue writing. This sacrifice earned him the name Ekadanta (one-tusked).`,
      icon: "✍️",
      color: "from-green-500 to-teal-500",
      category: "sacrifice",
      image: "📜",
      moral:
        "True dedication sometimes requires personal sacrifice for the greater good.",
    },
    {
      id: 5,
      title: "Ganesha and the Kheer",
      shortDescription: "A lesson in humility and devotion",
      fullStory: `A poor woman named Sudama had nothing but a handful of rice. With great devotion, she made kheer (sweet rice pudding) for Ganesha. Meanwhile, a wealthy merchant offered elaborate dishes to Ganesha.

      Ganesha appeared in the woman's humble hut first, enjoying her simple kheer made with love. When asked why he chose her offering over the merchant's feast, Ganesha replied, "It's not the offering but the devotion behind it that matters."`,
      icon: "🍚",
      color: "from-pink-500 to-rose-500",
      category: "devotion",
      image: "🙏",
      moral:
        "God values the purity of heart and devotion over material wealth.",
    },
    {
      id: 6,
      title: "Ganesha and Kubera",
      shortDescription: "The pride of wealth humbled",
      fullStory: `Kubera, the god of wealth, once invited Ganesha to dinner to show off his riches. Young Ganesha arrived and began eating everything in sight. No matter how much food was served, Ganesha's appetite seemed endless.

      Soon, Kubera's entire treasury was exhausted, yet Ganesha was still hungry. In desperation, Kubera ran to Shiva for help. Shiva gave him a handful of roasted rice and told him to offer it with humility. When Kubera did so, Ganesha was satisfied immediately, teaching that humility is more valuable than pride in wealth.`,
      icon: "💰",
      color: "from-amber-500 to-yellow-500",
      category: "lesson",
      image: "🏺",
      moral:
        "Pride in wealth leads to downfall, while humility brings satisfaction and peace.",
    },
  ];

  const categories = [
    { id: "all", name: "All Stories", icon: "📚" },
    { id: "origin", name: "Origin", icon: "🌟" },
    { id: "wisdom", name: "Wisdom", icon: "🧠" },
    { id: "lesson", name: "Life Lessons", icon: "📖" },
    { id: "devotion", name: "Devotion", icon: "🙏" },
    { id: "sacrifice", name: "Sacrifice", icon: "💝" },
  ];

  const filteredStories =
    activeFilter === "all"
      ? stories
      : stories.filter((story) => story.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 left-10 text-[300px] text-[#FF6B00]/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            ॐ
          </motion.div>
          <motion.div
            className="absolute bottom-10 right-10 text-[200px] text-[#FFD700]/5"
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            🕉️
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-[#FFD700] via-[#FF6B00] to-[#DC143C] bg-clip-text text-transparent animate-gradient">
                Divine Stories
              </span>
            </motion.h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Discover the timeless tales of Lord Ganesha that teach us wisdom,
              devotion, and the path to enlightenment
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? "bg-gradient-to-r from-[#FF6B00] to-[#DC143C] text-white shadow-lg scale-105"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredStories.map((story) => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              layout
              whileHover={{ scale: 1.03, y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B00]/20 to-[#DC143C]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>

              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 h-full flex flex-col hover:border-[#FF6B00]/50 transition-all duration-300">
                {/* Story Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${story.color} flex items-center justify-center text-5xl shadow-xl`}
                >
                  {story.icon}
                </motion.div>

                {/* Story Content */}
                <h3 className="text-2xl font-bold text-[#FFD700] mb-3 text-center">
                  {story.title}
                </h3>
                <p className="text-white/70 mb-6 text-center flex-grow">
                  {story.shortDescription}
                </p>

                {/* Category Badge */}
                <div className="text-center mb-6">
                  <span className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm text-white/60">
                    {categories.find((cat) => cat.id === story.category)?.name}
                  </span>
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => setSelectedStory(story)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#FF6B00] to-[#DC143C] text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Read Full Story
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Story Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto"
            onClick={() => setSelectedStory(null)}
          >
            <div className="min-h-screen flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#FF6B00]/30 rounded-3xl p-8 md:p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl"
                >
                  ✕
                </button>

                {/* Story Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-8xl mb-4"
                  >
                    {selectedStory.image}
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF6B00] bg-clip-text text-transparent">
                    {selectedStory.title}
                  </h2>
                </div>

                {/* Story Content */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-white/90 leading-relaxed whitespace-pre-line">
                    {selectedStory.fullStory}
                  </p>
                </div>

                {/* Moral of the Story */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 p-6 bg-gradient-to-r from-[#FF6B00]/20 to-[#DC143C]/20 rounded-2xl border border-[#FF6B00]/30"
                >
                  <h3 className="text-xl font-semibold text-[#FFD700] mb-2">
                    ✨ Moral of the Story
                  </h3>
                  <p className="text-white/80">{selectedStory.moral}</p>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8 justify-center">
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-semibold hover:bg-white/20 transition-all"
                  >
                    Close Story
                  </button>
                  <button className="px-8 py-3 bg-gradient-to-r from-[#FF6B00] to-[#DC143C] text-white rounded-full font-semibold hover:scale-105 transition-transform">
                    Share Blessing 🙏
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <motion.div
        className="fixed bottom-10 left-10 text-4xl opacity-20 pointer-events-none"
        animate={{
          y: [0, -30, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        📿
      </motion.div>

      <motion.div
        className="fixed top-32 right-10 text-3xl opacity-20 pointer-events-none"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        🪷
      </motion.div>

      <StoryTimeline />
    </div>
  );
};

export default Stories;
