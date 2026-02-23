import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// কম্পোনেন্ট ইম্পোর্ট
import Home from './components/Home';
import AboutPage from './components/AboutPage';
import BlogPage from './components/Blog'; 
import SingleBlog from './components/SingleBlog'; 
import AllProjects from './components/AllProjects';
import SingleProject from './components/SingleProject'; 
import Cursor from './components/Cursor'; 
import ScrollToTop from './components/ScrollToTop'; 
import Layout from './components/Layout'; 
import Contact from './components/Contact'; 
import BookCall from './components/BookCall';

// =========================================================
// AWWWARDS PREMIUM STYLE: "THE CURTAIN REVEAL WIPE"
// =========================================================
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* 1. The Wiping Curtain (পর্দা) */}
      <motion.div
        className="fixed left-0 right-0 z-[999999] bg-[#111] pointer-events-none"
        initial={{ height: "100vh", top: 0, bottom: "auto" }}
        animate={{ height: "0vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
        exit={{ height: "100vh", top: "auto", bottom: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      />

      {/* 2. The Page Content (কনটেন্ট) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.4, ease: [0.76, 0, 0.24, 1] } }}  
        exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }}   
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation(); 
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout><PageWrapper><Home /></PageWrapper></Layout>} />
        <Route path="/about" element={<Layout><PageWrapper><AboutPage /></PageWrapper></Layout>} />
        <Route path="/blog" element={<Layout><PageWrapper><BlogPage /></PageWrapper></Layout>} />
        <Route path="/blog/:id" element={<Layout><PageWrapper><SingleBlog /></PageWrapper></Layout>} />
        <Route path="/projects" element={<Layout><PageWrapper><AllProjects /></PageWrapper></Layout>} />
        <Route path="/projects/:id" element={<Layout><PageWrapper><SingleProject /></PageWrapper></Layout>} />
        <Route path="/book" element={<Layout><PageWrapper><BookCall /></PageWrapper></Layout>} />
        
        {/* <-- Contact পেজের জন্য নতুন রাউট যোগ করা হলো --> */}
        <Route path="/contact" element={<Layout><PageWrapper><Contact /></PageWrapper></Layout>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop /> 
      <Cursor />
      <AnimatedRoutes />
    </Router>
  );
};

export default App;