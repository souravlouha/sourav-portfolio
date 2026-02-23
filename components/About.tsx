import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 bg-white scroll-fade opacity-0 translate-y-8 transition-all duration-1000 ease-out">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        <div className="flex-1 space-y-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 block mb-2">A Quick Glance</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
              Building the bridge between <br />
              ideas and <span className="italic serif font-normal text-purple-600">experiences</span>
            </h2>
          </div>
          <div className="space-y-6 text-neutral-600 font-medium leading-relaxed max-w-2xl">
            <p>
              Hello, I’m Sourav — an engineering student, a builder, and a traveler at heart.<br/>I study Electronics and Communication Engineering, but beyond academics, I’m driven by curiosity. I love turning ideas into real projects — building systems, experimenting with technology, and solving problems that challenge me to grow.<br/>Outside the world of code and circuits, you’ll often find me on long cycling routes or traveling to new places. The road gives me clarity. Traveling gives me perspective. It reminds me that growth doesn’t only happen in classrooms — it happens in experiences.<br/>Building has taught me discipline. Traveling has taught me patience. Together, they shape who I am.<br/>I’m someone who believes in creating meaningful work while living a meaningful life —<br/>one idea, one project, one journey at a time.
            </p>
          </div>
          
          {/* UPDATED BUTTON: Custom Noise Background Button (No extra files needed) */}
          <div className="pt-2">
            <div className="relative p-[3px] rounded-full overflow-hidden inline-flex group cursor-pointer w-fit">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[rgb(255,100,150)] via-[rgb(100,150,255)] to-[rgb(255,200,100)] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Noise overlay */}
              <div 
                className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
              ></div>
              
              {/* Inner Button */}
              <Link 
                to="/about" 
                className="relative bg-white px-8 py-3 rounded-full text-black font-bold text-lg flex items-center justify-center gap-2 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.9)_inset,0px_1px_3px_0px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:scale-[0.98] active:scale-95"
              >
                Dive in deeper
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

        </div>

        <div className="flex-1 relative">
          <div className="aspect-[4/5] rounded-[3rem] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700 shadow-2xl">
            <img src="/images/profile.jpeg" className="w-full h-full object-cover" alt="Profile" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;