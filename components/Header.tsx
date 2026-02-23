import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation(); 
  const navigate = useNavigate(); 
  const [isScrolled, setIsScrolled] = useState(false);

  // স্ক্রল ডিটেক্ট করার জন্য
  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  // স্ক্রল হ্যান্ডলার
  const handleScroll = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // স্প্রিং ট্রানজিশন - একদম স্মুথ স্লাইড এবং সাইজ পরিবর্তনের জন্য
  const springTransition = {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 0.5
  } as const;

  return (
    // বাইরের কন্টেইনার ফিক্সড থাকবে, ভেতরেরটা মুভ করবে
    <header className="fixed top-4 md:top-6 left-0 right-0 z-[100] px-4 md:px-8 flex pointer-events-none">
      
      <motion.nav
        layout
        // এই স্টাইলটির কারণেই এটি স্মুথলি ডানদিকে গ্লাইড করে যাবে
        style={{
          marginLeft: isScrolled ? 'auto' : 'auto',
          marginRight: isScrolled ? '0px' : 'auto',
        }}
        transition={springTransition}
        className={`pointer-events-auto backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center overflow-visible transition-colors duration-500 ${
          isScrolled ? 'bg-white/90 rounded-[2rem] p-1.5' : 'bg-white/70 rounded-full px-2 py-2'
        }`}
      >
        {/* Logo */}
        <motion.div 
          layout 
          onClick={() => handleScroll('home')} 
          className={`text-black font-black tracking-tighter flex items-center cursor-pointer hover:opacity-70 transition-all duration-500 ${isScrolled ? 'mx-3 text-lg' : 'mx-4 text-xl'}`}
        >
          <span className={`bg-green-500 rounded-full mr-2 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse transition-all duration-500 ${isScrolled ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></span>
          SL
        </motion.div>

        {/* Menu Links */}
        <motion.div 
          layout 
          className={`hidden md:flex items-center bg-white/50 rounded-full border border-neutral-100/50 transition-all duration-500 ${isScrolled ? 'p-1 space-x-0 mr-2' : 'px-2 py-1 space-x-1 mr-4'}`}
        >
          <button onClick={() => handleScroll('home')} className={`font-semibold text-neutral-600 hover:text-black hover:bg-white rounded-full transition-all duration-300 ${isScrolled ? 'px-3 py-1.5 text-[11px]' : 'px-5 py-2 text-sm'}`}>Home</button>
          
          {/* About Link */}
          {location.pathname === '/' ? (
             <button onClick={() => handleScroll('about')} className={`font-semibold text-neutral-600 hover:text-black hover:bg-white rounded-full transition-all duration-300 ${isScrolled ? 'px-3 py-1.5 text-[11px]' : 'px-5 py-2 text-sm'}`}>About</button>
          ) : (
             <Link to="/about" className={`font-semibold text-neutral-600 hover:text-black hover:bg-white rounded-full transition-all duration-300 ${isScrolled ? 'px-3 py-1.5 text-[11px]' : 'px-5 py-2 text-sm'}`}>About</Link>
          )}

          <button onClick={() => handleScroll('work')} className={`font-semibold text-neutral-600 hover:text-black hover:bg-white rounded-full transition-all duration-300 ${isScrolled ? 'px-3 py-1.5 text-[11px]' : 'px-5 py-2 text-sm'}`}>Work</button>
          
          <Link to="/blog" className={`font-semibold text-neutral-600 hover:text-black hover:bg-white rounded-full transition-all duration-300 ${isScrolled ? 'px-3 py-1.5 text-[11px]' : 'px-5 py-2 text-sm'}`}>Blogs</Link>
          
          {/* More Dropdown */}
          <div className="group relative">
            <button className={`font-semibold text-neutral-600 hover:text-black hover:bg-white rounded-full transition-all duration-300 flex items-center ${isScrolled ? 'px-3 py-1.5 text-[11px]' : 'px-5 py-2 text-sm'}`}>
              More
              <svg className={`ml-1.5 opacity-50 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300 ${isScrolled ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className={`absolute top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 ${isScrolled ? 'right-0' : 'left-1/2 -translate-x-1/2'}`}>
              <div className={`bg-white/90 backdrop-blur-xl border border-neutral-100 shadow-xl rounded-2xl p-2 w-48 flex flex-col gap-1 relative before:absolute before:-top-2 before:border-8 before:border-transparent before:border-b-white/90 ${isScrolled ? 'before:right-6' : 'before:left-1/2 before:-translate-x-1/2'}`}>
                
                <Link to="/contact" className="px-4 py-2.5 text-sm font-semibold text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-xl transition-colors flex items-center justify-between group/item">
                  Contact
                  <svg className="w-3 h-3 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                
                {/* Guestbook Link */}
                <Link to="#" className="px-4 py-2.5 text-sm font-semibold text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-xl transition-colors flex items-center justify-between group/item cursor-not-allowed">
                  Guestbook
                  <span className="text-[9px] font-bold bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">SOON</span>
                </Link>

              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button -> Updated to link to /book */}
        <motion.div layout>
          <Link to="/book" className={`bg-neutral-900 text-white font-bold rounded-full flex items-center hover:bg-black hover:scale-105 active:scale-95 transition-all duration-500 shadow-md hover:shadow-xl ${isScrolled ? 'px-4 py-2 text-[10px]' : 'px-6 py-3 text-xs'}`}>
            Book a Call
            <svg className={`ml-2 transition-all duration-500 ${isScrolled ? 'w-2.5 h-2.5' : 'w-3 h-3'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l5 5m0 0l-5 5m5-5H3" /></svg>
          </Link>
        </motion.div>

      </motion.nav>
    </header>
  );
};

export default Header;