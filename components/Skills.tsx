import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      
      {/* --- SKILLS GRID SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 text-center relative z-20">
        <div className="mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 block mb-2">My Skillset</span>
          <h2 className="text-5xl font-black tracking-tighter uppercase mb-2">
            The Magic <span className="italic serif font-normal lowercase text-neutral-400">behind</span>
          </h2>
        </div>

        {/* Skills Container */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="group bg-neutral-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 border border-neutral-100 px-6 py-4 rounded-3xl flex items-center space-x-3 transition-all duration-300 cursor-default"
            >
              <span className="text-xl">{skill.icon}</span>
              <span className="font-bold text-sm text-neutral-700">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- CROSSING STRIPS SECTION --- */}
      {/* mt-32 দেওয়া হয়েছে যাতে স্কিল সেকশনের সাথে ধাক্কা না খায় */}
      <div className="mt-32 relative w-full flex justify-center items-center h-48 md:h-56 pointer-events-none">
        
        {/* 1. Lighter Red Strip (Background) */}
        <div className="absolute w-[110vw] py-6 md:py-10 bg-red-400 rotate-[4deg] shadow-sm z-0 left-1/2 -translate-x-1/2 origin-center">
        </div>

        {/* 2. Darker Red Strip (Foreground with Text) */}
        <div className="absolute w-[110vw] py-6 md:py-8 bg-red-600 -rotate-[4deg] shadow-2xl z-10 overflow-hidden whitespace-nowrap left-1/2 -translate-x-1/2 origin-center flex">
          
          {/* Box 1 for Marquee */}
          <div className="flex animate-marquee text-white text-base md:text-lg font-black uppercase tracking-[0.4em] space-x-12 items-center shrink-0 pr-12">
              {[...Array(6)].map((_, i) => (
                <React.Fragment key={`first-${i}`}>
                  <span>User-Friendly</span><span className="text-white/30">✦</span>
                  <span>Adaptive</span><span className="text-white/30">✦</span>
                  <span>Fluid</span><span className="text-white/30">✦</span>
                  <span>Future-Proof</span><span className="text-white/30">✦</span>
                  <span>SEO-Ready</span><span className="text-white/30">✦</span>
                  <span>Immersive</span><span className="text-white/30">✦</span>
                  <span>Protected</span><span className="text-white/30">✦</span>
                </React.Fragment>
              ))}
          </div>

          {/* Box 2 for Marquee (To create a seamless infinite loop) */}
          <div className="flex animate-marquee text-white text-base md:text-lg font-black uppercase tracking-[0.4em] space-x-12 items-center shrink-0 pr-12">
              {[...Array(6)].map((_, i) => (
                <React.Fragment key={`second-${i}`}>
                  <span>User-Friendly</span><span className="text-white/30">✦</span>
                  <span>Adaptive</span><span className="text-white/30">✦</span>
                  <span>Fluid</span><span className="text-white/30">✦</span>
                  <span>Future-Proof</span><span className="text-white/30">✦</span>
                  <span>SEO-Ready</span><span className="text-white/30">✦</span>
                  <span>Immersive</span><span className="text-white/30">✦</span>
                  <span>Protected</span><span className="text-white/30">✦</span>
                </React.Fragment>
              ))}
          </div>

        </div>
      </div>

      {/* CSS Animation: 80s দেওয়া হয়েছে আরামদায়ক স্পিডের জন্য */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 150s linear infinite; 
        }
      `}</style>
    </section>
  );
};

export default Skills;