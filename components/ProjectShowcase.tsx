import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ExternalLink, Github } from 'lucide-react';

const ProjectShowcase: React.FC = () => {
  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 block mb-2">Crafting Modern Experiences</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            Venture <span className="italic serif font-normal lowercase text-purple-600">showcase</span>
          </h2>
        </div>

        {/* Projects List */}
        <div className="space-y-32">
          {/* Defensive check added to PROJECTS array */}
          {(PROJECTS || []).slice(0, 3).map((project, index) => (
            <div key={project?.id || index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-start`}>
              
              <div className="lg:w-1/3 space-y-6 sticky top-32">
                <div className="flex items-center space-x-2">
                   <div className="w-8 h-[2px] bg-red-500"></div>
                   {/* ====== Update: প্রজেক্টের নামের ওপর ক্লিক করলেও লিঙ্কে যাবে ====== */}
                   <Link to={`/projects/${project?.id}`} className="hover:text-purple-600 transition-colors">
                     <h3 className="text-3xl font-black tracking-tight">{project?.name}</h3>
                   </Link>
                </div>
                
                <p className="text-neutral-600 leading-relaxed text-sm">
                  {project?.longDescription || project?.description}
                </p>
                
                <ul className="space-y-3">
                  {/* Added ? before map to prevent crash if features are missing */}
                  {project?.features?.map((feature, i) => (
                    <li key={i} className="flex items-start text-xs text-neutral-500 font-medium">
                      <span className="text-red-500 mr-2 font-bold">+</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  {/* Added ? before map to prevent crash if tech is missing */}
                  {project?.tech?.map((t, i) => (
                    <span key={i} className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-[10px] font-bold flex items-center border border-neutral-200">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Direct Links (Github & Live) */}
                <div className="flex items-center gap-4 pt-2">
                  {project?.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors group">
                      <Github size={14} /> Code
                    </a>
                  )}
                  {project?.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors group">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* ====== Project Image (Clickable Link to Single Project) ====== */}
              <div className="lg:w-2/3 w-full group">
                <Link to={`/projects/${project?.id}`} className="block relative bg-neutral-900 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 cursor-pointer">
                  
                  {/* Main Preview */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                    <img src={project?.image} alt={project?.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  </div>
                  
                  {/* Secondary Previews Grid */}
                  {/* Added checking to ensure screenshots array exists before mapping */}
                  {project?.screenshots && project.screenshots.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {project.screenshots.map((s, i) => (
                        <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-white/10">
                          <img src={s} alt={`${project?.name} screen ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              </div>
              
            </div>
          ))}
        </div>

        {/* See more projects link */}
        <div className="mt-24 text-center">
          <div className="relative p-[3px] rounded-full overflow-hidden inline-flex group cursor-pointer w-fit">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[rgb(255,100,150)] via-[rgb(100,150,255)] to-[rgb(255,200,100)] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Noise overlay */}
            <div 
              className="absolute inset-0 mix-blend-overlay opacity-40 pointer-events-none" 
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            ></div>
            
            {/* Inner Button changed to Link */}
            <Link 
              to="/projects"
              className="relative bg-white px-8 py-3 rounded-full text-black font-bold text-lg flex items-center justify-center gap-2 shadow-[0px_2px_0px_0px_rgba(255,255,255,0.9)_inset,0px_1px_3px_0px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:scale-[0.98] active:scale-95"
            >
              See more projects
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ProjectShowcase;