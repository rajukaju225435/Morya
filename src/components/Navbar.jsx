import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Stories", href: "/stories" },
    { name: "Mantras", href: "/mantras" },
    { name: "Puja Room", href: "/puja-room" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blessings", href: "/blessings" },
  ];

  const handleHome = () => {
    navigate("/home");
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (href) => {
    navigate(href);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl shadow-lg shadow-[#FF6B00]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer"
              onClick={handleHome}
            >
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#FFD700] via-[#FF6B00] to-[#DC143C] bg-clip-text text-transparent">
                Ganesha
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(item.href)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-3 xl:px-4 py-2 transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <span className="relative  z-10 bg-clip-text text-gray-300 group-hover:bg-gradient-to-r group-hover:from-[#FFD700] group-hover:to-[#FF6B00] transition-all duration-300">
                      {item.name}
                    </span>
                      <span
    className="absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#FFD700] to-[#FF6B00] transition-all duration-300 ease-in-out"
  />
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FF6B00]"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            >
              <motion.div className="relative w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FF6B00] rounded-full"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    x: isMobileMenuOpen ? -20 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FF6B00] rounded-full"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FF6B00] rounded-full"
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-80 bg-gradient-to-b from-black via-gray-900 to-black z-50 lg:hidden overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FF6B00] bg-clip-text text-transparent"
                >
                  Divine Menu
                </motion.h2>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <span className="text-2xl">✕</span>
                </motion.button>
              </div>

              {/* Menu Items */}
              <div className="p-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    onClick={() => handleNavClick(item.href)}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <span className="flex items-center space-x-4">
                      <motion.span
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl"
                      >
                        {item.icon}
                      </motion.span>
                      <span className="text-lg text-white/80 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                      <motion.span
                        className="ml-auto text-white/40 group-hover:text-white/80"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10"
              >
                <p className="text-center text-white/50 text-sm">
                  🙏 गणपति बाप्पा मोरया 🙏
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
