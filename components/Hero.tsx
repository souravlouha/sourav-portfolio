import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 pb-16 px-4 flex flex-col items-center justify-center min-h-[70vh] text-center bg-white overflow-hidden">
      
      {/* --- DOT BACKGROUND START --- */}
      {/* Dot Pattern */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Radial Mask: Fades out the dots towards the edges */}
      <div className="absolute inset-0 pointer-events-none bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* --- DOT BACKGROUND END --- */}

      {/* Content Wrapper (z-10 ensures text is above the background) */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        
        {/* Top Tag */}
        <div className="text-neutral-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
          Creative Engineer / Building the Future
        </div>

        {/* Main Heading */}
        <h1 className="text-[15vw] md:text-[12rem] font-black leading-none tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 text-neutral-900">
          SOURAV
        </h1>

        {/* --- COLORFUL TEXT SECTION START --- */}
        <div className="max-w-2xl mx-auto flex flex-col gap-1">
          {/* First Line: Serif Italic & Grey */}
          <p className="text-2xl md:text-4xl font-serif italic font-light text-neutral-400 tracking-wide">
            I design and build products that
          </p>

          {/* Second Line: Gradient Pink/Purple */}
          <p className="text-3xl md:text-6xl font-serif italic font-medium pb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500">
            deliver real impact.
          </p>
        </div>
        {/* --- COLORFUL TEXT SECTION END --- */}

        {/* Bottom Status Bar */}
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center mt-20 text-[10px] font-bold tracking-widest uppercase text-neutral-500 px-4 md:px-0">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Based in West Bengal, India
          </div>
          <div className="flex items-center gap-2">
            Full Stack Dev & Designer
            <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;