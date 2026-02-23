import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SingleProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // URL এর id দিয়ে প্রজেক্ট খুঁজে বের করা
  const project = PROJECTS.find(p => String(p.id) === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-[70vh] bg-[#F9F9F9] flex flex-col justify-center items-center text-center px-4 py-32">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#111]">Project Not Found</h1>
        <p className="text-neutral-500 mb-8 max-w-md font-medium">The project you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/projects')} className="px-8 py-4 bg-[#111] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Archive
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans text-[#111] selection:bg-neutral-200 pt-32 pb-32">
      
      {/* ======================================================== */}
      {/* 1. PROJECT HEADER                                        */}
      {/* ======================================================== */}
      <header className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
        <Link 
          to="/projects" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black border border-neutral-200 hover:border-neutral-300 transition-all group shadow-sm mb-12"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Archive
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl lg:text-[90px] font-black tracking-tighter leading-[1] text-[#111] mb-8">
            {project.name}
          </h1>
          <p className="text-xl md:text-3xl text-neutral-500 font-serif italic max-w-3xl leading-relaxed">
            "{project.description}"
          </p>
        </motion.div>
      </header>

      {/* ======================================================== */}
      {/* 2. GIANT HERO IMAGE                                      */}
      {/* ======================================================== */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-[1400px] mx-auto px-4 md:px-8 mb-24"
      >
        <div className="aspect-video md:aspect-[21/9] w-full rounded-[2rem] overflow-hidden bg-neutral-100 border border-neutral-200 shadow-2xl relative">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] rounded-[2rem] pointer-events-none"></div>
        </div>
      </motion.div>

      {/* ======================================================== */}
      {/* 3. PROJECT DETAILS & INFO GRID                           */}
      {/* ======================================================== */}
      <main className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column (Overview & Features) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">Overview</h3>
              <p className="text-lg md:text-xl text-neutral-700 leading-[1.8] font-medium">
                {project.longDescription || project.description}
              </p>
            </section>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">Key Features</h3>
                <ul className="space-y-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-lg text-neutral-800 font-medium bg-neutral-50/50 p-4 rounded-2xl border border-neutral-100">
                      <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={24} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Screenshots Gallery */}
            {project.screenshots && project.screenshots.length > 0 && (
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.screenshots.map((img, i) => (
                    <div key={i} className="aspect-video rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                      <img src={img} alt={`${project.name} screenshot ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Column (Tech Stack & Links - Sticky) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-40 space-y-10 bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
              
              {/* Tech Stack */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-4 py-2 bg-neutral-50 text-neutral-700 rounded-xl text-xs font-bold uppercase tracking-widest border border-neutral-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full h-px bg-neutral-100"></div>

              {/* Action Links */}
              <div className="flex flex-col gap-4">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#111] hover:bg-black text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:shadow-lg hover:-translate-y-0.5">
                    <ExternalLink size={16} /> View Live Project
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-neutral-200 hover:border-black text-[#111] rounded-xl font-bold text-xs uppercase tracking-widest transition-all">
                    <Github size={16} /> Source Code
                  </a>
                )}
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default SingleProject;