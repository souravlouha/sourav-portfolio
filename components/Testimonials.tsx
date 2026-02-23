import React from 'react';
import { TESTIMONIALS } from '../constants';

const cardStyles = [
  { gradient: 'from-blue-500 to-blue-700', headingColor: 'text-white', textColor: 'text-blue-50', authorColor: 'text-white', roleColor: 'text-blue-200' },
  { gradient: 'from-purple-600 to-indigo-800', headingColor: 'text-white', textColor: 'text-purple-100', authorColor: 'text-white', roleColor: 'text-purple-300' },
  { gradient: 'from-teal-500 to-emerald-700', headingColor: 'text-white', textColor: 'text-teal-50', authorColor: 'text-white', roleColor: 'text-teal-200' },
  { gradient: 'from-rose-500 to-red-700', headingColor: 'text-white', textColor: 'text-rose-100', authorColor: 'text-white', roleColor: 'text-rose-200' },
  { gradient: 'from-amber-500 to-orange-700', headingColor: 'text-white', textColor: 'text-amber-50', authorColor: 'text-white', roleColor: 'text-amber-200' },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden relative">
      
      {/* CSS Animation for the infinite loop */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-[100vw] mx-auto">
        
        {/* হেডার সেকশন */}
        <div className="text-center mb-16 px-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 block mb-2">
            THE FEEDBACK LOOP
          </span>
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase text-neutral-900">
            Proof of impact from the{' '}
            <span 
              className="italic serif font-normal bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent"
              style={{ 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              trusted network
            </span>
          </h2>
        </div>

        {/* ইনফিনিট স্ক্রলিং কন্টেইনার */}
        <div className="relative w-full">
          
          {/* লেফট এবং রাইট ফেড ইফেক্ট */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* স্ক্রল ট্র্যাক */}
          <div className="animate-scroll pt-4 pb-12">
            
            {/* Array টিকে দু'বার রেন্ডার করা হলো যাতে লুপটি স্মুথ হয় */}
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => {
              const style = cardStyles[i % cardStyles.length];

              return (
                <div 
                  key={i} 
                  className={`bg-gradient-to-br ${style.gradient} p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group mx-3 border border-black/5 relative overflow-hidden shrink-0 w-[350px] md:w-[450px] hover:-translate-y-2 cursor-grab active:cursor-grabbing`}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 pointer-events-none"></div>

                  <div>
                    {t.title && (
                      <h3 className={`text-xl font-black tracking-tight mb-4 ${style.headingColor} leading-snug`}>
                        {t.title}
                      </h3>
                    )}
                    <p className={`font-medium text-sm leading-relaxed mb-8 ${style.textColor}`}>
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 mt-auto pt-6 border-t border-white/20">
                    <img 
                      src={t.avatar} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-white/40 bg-white/20" 
                      alt={t.name} 
                    />
                    <div>
                      <h4 className={`text-base font-black tracking-tight ${style.authorColor}`}>
                        {t.name}
                      </h4>
                      <p className={`text-[11px] font-bold uppercase tracking-wider ${style.roleColor}`}>
                        {t.role} • {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;