import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants'; 
import { ArrowLeft, ExternalLink, Github, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type ProjectCategory = 'all' | 'frontend' | 'fullstack' | 'backend' | 'design';

const AllProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const safeProjects = PROJECTS || [];

  const filteredProjects = safeProjects.filter((project) => {
    const projectCategoryStr = project.description.toLowerCase() + " " + project.tech.join(" ").toLowerCase();
    
    let matchesCategory = true;
    if (activeTab === 'frontend') matchesCategory = projectCategoryStr.includes('react') || projectCategoryStr.includes('frontend') || projectCategoryStr.includes('next');
    if (activeTab === 'fullstack') matchesCategory = projectCategoryStr.includes('full-stack') || projectCategoryStr.includes('fullstack') || (projectCategoryStr.includes('react') && projectCategoryStr.includes('node'));
    if (activeTab === 'backend') matchesCategory = projectCategoryStr.includes('node') || projectCategoryStr.includes('express') || projectCategoryStr.includes('database') || projectCategoryStr.includes('python') || projectCategoryStr.includes('machine learning');
    if (activeTab === 'design') matchesCategory = projectCategoryStr.includes('design') || projectCategoryStr.includes('ui');

    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
                          
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-[#111] selection:bg-neutral-200 selection:text-[#111] pb-32 relative">
      
      {/* ======================================================== */}
      {/* 1. HERO HEADER                                           */}
      {/* ======================================================== */}
      <header className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-4 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white blur-[120px] -z-10 rounded-full pointer-events-none"></div>

        {/* ================= SMALL BACK BUTTON (Top Left) ================= */}
        <div className="max-w-[1300px] mx-auto w-full absolute top-24 md:top-32 left-1/2 -translate-x-1/2 px-6 md:px-12 z-10 flex justify-start">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black border border-neutral-200 hover:border-neutral-300 transition-all group shadow-sm"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center w-full"
        >
          <h1 className="text-[20vw] md:text-[15vw] lg:text-[12vw] leading-[0.8] font-black tracking-tighter text-[#111] uppercase mb-4 select-none">
            ARCHIVE
          </h1>
          
          <div className="flex flex-col items-center gap-1 md:gap-2">
             <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-neutral-500">
               EXPERIMENTS, BUILDS, AND
             </span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#111] tracking-tight pr-4">
               projects i shipped.
             </h2>
          </div>
        </motion.div>
      </header>

      <main className="max-w-[1300px] mx-auto px-6 md:px-12">
        
        {/* ======================================================== */}
        {/* 2. SEARCH BAR & FILTER BUTTONS                           */}
        {/* ======================================================== */}
        <div className="flex flex-col gap-8 mb-16 pt-10">
           
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-200/60 pb-8">
             <h3 className="text-2xl font-bold tracking-tight text-black uppercase">All Projects</h3>
             
             <div className="flex flex-wrap gap-2">
                {['all', 'frontend', 'fullstack', 'backend'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveTab(cat as ProjectCategory)} 
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                      activeTab === cat 
                      ? 'bg-black text-white border-black' 
                      : 'bg-transparent text-neutral-500 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
           </div>
           
           {/* Search Bar */}
           <div className="relative w-full max-w-3xl mx-auto -mt-4">
             <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
               <Search size={16} className="text-neutral-400" />
             </div>
             <input 
               type="text" 
               placeholder="Search projects by name or technology..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-12 pr-6 py-4 bg-white border border-neutral-200/80 focus:border-neutral-400 rounded-full text-[14px] focus:outline-none transition-all placeholder:text-neutral-400 font-medium"
             />
           </div>
        </div>

        {/* ======================================================== */}
        {/* 3. PROJECTS GRID                                         */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div 
                  key={project?.id || index}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group flex flex-col bg-white rounded-3xl p-6 md:p-8 border border-neutral-100 hover:border-neutral-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 h-full"
                >
                  
                  {/* ====== UPDATE: Image is now a Clickable Link ====== */}
                  <Link to={`/projects/${project?.id}`} className="block aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-neutral-100 border border-neutral-200/50 relative cursor-pointer">
                    <img 
                      src={project?.image} 
                      alt={project?.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      
                      {/* ====== UPDATE: Title is now a Clickable Link ====== */}
                      <Link to={`/projects/${project?.id}`} className="hover:text-purple-600 transition-colors">
                        <h3 className="text-2xl font-black tracking-tight text-[#111] leading-tight">
                          {project?.name}
                        </h3>
                      </Link>
                      
                      {/* Action Icons */}
                      <div className="flex items-center gap-2 shrink-0 pt-1">
                        {project?.github && (
                          <a href={project.github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors" title="View Source">
                            <Github size={14} />
                          </a>
                        )}
                        {project?.link && (
                          <a href={project.link} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors" title="Live Preview">
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-[14px] text-neutral-500 leading-relaxed mb-8 flex-grow font-medium line-clamp-3">
                      {project?.longDescription || project?.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap items-center gap-2 mt-auto pt-6 border-t border-neutral-100">
                      {project?.tech?.slice(0, 3).map((t, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-neutral-50 text-neutral-600 rounded-md text-[10px] font-bold uppercase tracking-widest"
                        >
                          {t}
                        </span>
                      ))}
                      {project?.tech && project.tech.length > 3 && (
                         <span className="px-2 py-1 text-neutral-400 text-[10px] font-bold uppercase tracking-widest">
                           +{project.tech.length - 3}
                         </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-neutral-500 font-medium">
                No projects found matching your search criteria.
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
};

export default AllProjects;