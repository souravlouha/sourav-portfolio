import React from 'react';
import { Link } from 'react-router-dom'; // <-- Link ইম্পোর্ট করা হলো

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-neutral-100 relative overflow-hidden">
      
      {/* Background Gradient Orb (Visual Effect) */}
      <div className="absolute right-0 top-10 md:right-24 w-64 h-64 bg-gradient-to-br from-purple-400 via-blue-300 to-indigo-400 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* ==================== CTA SECTION ==================== */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12">
            
            {/* Left Side: Image + Text */}
            <div className="flex flex-col items-start">
                <div className="flex items-center gap-4 md:gap-6 mb-2">
                    {/* Your Image */}
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-lg shrink-0">
                        <img 
                            src="/images/about01.png" 
                            alt="Sourav" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    {/* Text Part 1 */}
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-neutral-900">
                        Let's create
                    </h2>
                </div>
                {/* Text Part 2 */}
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-neutral-300 italic serif font-normal lowercase">
                    something real.
                </h2>
            </div>

            {/* Right Side: The Black "Connect" Button */}
            <div className="relative w-32 h-32 md:w-44 md:h-44 group cursor-pointer">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
                
                {/* Black Circle Button Updated with Link */}
                <Link to="/contact" className="relative w-full h-full bg-neutral-900 rounded-full flex items-center justify-center p-4 border border-white/10 group-hover:scale-105 transition-transform shadow-2xl">
                    <div className="text-white text-center leading-none">
                       <span className="block text-[9px] md:text-[11px] font-bold uppercase tracking-widest mb-2 text-neutral-400 group-hover:text-white transition-colors">Start a Project</span>
                       
                       {/* Arrow Icon */}
                       <svg className="w-6 h-6 md:w-8 md:h-8 mx-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                       </svg>
                    </div>
                </Link>
            </div>

        </div>
        {/* ===================================================== */}

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 border-t border-neutral-100 pt-16">
          <div className="col-span-2 space-y-6">
            <h3 className="text-2xl font-black tracking-tighter">SOURAV</h3>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              Building digital experiences that matter, one line of code at a time. Crafting interfaces that feel alive, solving problems that make a difference, and turning ideas into reality.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">General</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-tight text-neutral-600">
              <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">About</Link></li>
              <li><Link to="/blog" className="hover:text-black transition-colors">Blogs</Link></li>
              <li><a href="#guestbook" className="hover:text-black transition-colors">Guestbook</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">About</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-tight text-neutral-600">
              <li><Link to="/about" className="hover:text-black transition-colors">About Me</Link></li>
              <li><Link to="/projects" className="hover:text-black transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">Future Startups</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-tight text-neutral-400">
              <li className="flex items-center cursor-not-allowed">
                Stealth Mode 
                <span className="ml-2 text-[8px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full border border-neutral-200">SOON</span>
              </li>
              <li className="flex items-center cursor-not-allowed">
                AI Venture 
                <span className="ml-2 text-[8px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full border border-neutral-200">DREAM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-24 pt-8 border-t border-neutral-100">
           <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">© 2026 Sourav Louha. All Rights Reserved.</p>
           
           {/* Social Icons Updated */}
           <div className="flex space-x-6 mt-4 md:mt-0">
              {/* GitHub */}
              <a href="https://github.com/souravlouha" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/sourav-louha-703953249/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#0A66C2] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/souravlouha_s/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-[#E1306C] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              {/* X / Twitter */}
              <a href="https://x.com/iamsouravn" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;