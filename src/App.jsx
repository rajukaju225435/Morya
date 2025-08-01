import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';
import Landing from './components/Landing';
import Home from './pages/Home';
import Stories from './pages/Stories';
import MantrasPage from './components/Mantras';
import PujaRoomPage from './components/PujaRoom';
import GalleryPage from './components/Gallery';
import About from './components/About';
import Blessings from './components/Blessings';
import ScrollToTop from "./components/ScrollToTop";
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/mantras" element={<MantrasPage />} />
        <Route path="/puja-room" element={<PujaRoomPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/blessings" element={<Blessings />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ParallaxProvider>
      <Router> <ScrollToTop />
        <AnimatedRoutes />
      </Router>
    </ParallaxProvider>
  );
}

export default App;