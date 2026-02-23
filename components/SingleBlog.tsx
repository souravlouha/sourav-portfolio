import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Calendar, Twitter, 
  Linkedin, Link2, ThumbsUp, MessageCircle, Hash , ArrowRight
} from 'lucide-react';

// === Blog.tsx থেকে ডেটা ইম্পোর্ট করা হচ্ছে ===
import { blogsData } from './Blog'; 

export default function SingleBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = blogsData.find(blog => blog.id === id);
  
  // Reading Progress Bar State
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll করলে যেন একদম ওপরে থাকে তার জন্য
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-[70vh] bg-[#F9F9F9] flex flex-col justify-center items-center text-center px-4 py-32">
        <div className="w-24 h-24 bg-white shadow-sm border border-neutral-100 rounded-full flex items-center justify-center mb-6 text-4xl">
           📭
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#111] tracking-tight">Article Not Found</h1>
        <p className="text-neutral-500 mb-8 max-w-md font-medium text-lg">The article you are looking for does not exist, has been moved, or is currently unavailable.</p>
        <button 
          onClick={() => navigate('/blog')}
          className="px-8 py-4 bg-[#111] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Writings
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9F9] font-sans text-[#111] selection:bg-neutral-200 selection:text-[#111] relative pt-24 md:pt-32">
      
      {/* Reading Progress Bar (Fixed at the absolute top of the screen) */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-[#111] z-50 transition-all duration-150 ease-out" 
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>
      
      {/* Very Subtle Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white/80 to-transparent -z-10 pointer-events-none"></div>
      
      <main className="max-w-[1300px] mx-auto px-6 md:px-12 pb-32">
        
        {/* Main 3-Column Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-16 justify-center">
          
          {/* ================= LEFT SIDEBAR (Sticky Actions) ================= */}
          <aside className="hidden lg:flex flex-col w-16 shrink-0 sticky top-32 h-max items-center gap-6">
            <Link to="/blog" className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black hover:border-neutral-400 hover:shadow-md transition-all duration-300 mb-8 group" title="Back to blogs">
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </Link>

            <div className="w-px h-10 bg-neutral-200"></div>

            <button className="text-neutral-400 hover:text-black transition-colors flex flex-col items-center gap-1.5 group">
              <div className="w-10 h-10 rounded-full bg-white border border-transparent flex items-center justify-center group-hover:border-neutral-200 group-hover:bg-neutral-50 transition-all">
                <ThumbsUp size={18} />
              </div>
              <span className="text-[10px] font-bold">142</span>
            </button>

            <button className="text-neutral-400 hover:text-black transition-colors flex flex-col items-center gap-1.5 group">
              <div className="w-10 h-10 rounded-full bg-white border border-transparent flex items-center justify-center group-hover:border-neutral-200 group-hover:bg-neutral-50 transition-all">
                <MessageCircle size={18} />
              </div>
              <span className="text-[10px] font-bold">12</span>
            </button>

            <div className="w-px h-10 bg-neutral-200"></div>

            <button className="text-neutral-400 hover:text-[#1DA1F2] transition-colors p-2"><Twitter size={18} /></button>
            <button className="text-neutral-400 hover:text-[#0A66C2] transition-colors p-2"><Linkedin size={18} /></button>
            <button className="text-neutral-400 hover:text-black transition-colors p-2"><Link2 size={18} /></button>
          </aside>

          {/* ================= CENTER COLUMN (Main Article) ================= */}
          <div className="max-w-[750px] w-full">
            
            {/* Mobile Back Button */}
            <Link to="/blog" className="lg:hidden inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black mb-10 transition-colors group px-5 py-2.5 bg-white rounded-full border border-neutral-200 shadow-sm w-fit">
              <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to journal
            </Link>
            
            {/* Header Section */}
            <header className="mb-16">
              {/* Category, Date & Read Time */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-neutral-200 bg-white shadow-sm">
                  {article.category}
                </span>
                <div className="flex items-center gap-4 text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                   <span className="flex items-center gap-1.5"><Calendar size={14} className="text-neutral-300"/> {article.date}</span>
                   <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                   <span className="flex items-center gap-1.5"><Clock size={14} className="text-neutral-300"/> {article.readTime}</span>
                </div>
              </div>
              
              {/* Massive Title */}
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black tracking-tighter leading-[1.1] text-[#111] mb-8">
                {article.title}
              </h1>
              
              {/* Subtle Excerpt */}
              <p className="text-xl md:text-2xl text-neutral-500 font-serif italic leading-relaxed border-l-4 border-neutral-200 pl-6 py-2">
                "{article.excerpt}"
              </p>
            </header>

            {/* Article Content */}
            <article className="prose prose-lg md:prose-xl prose-neutral max-w-none text-[#333] leading-[1.8] tracking-normal font-medium">
              {article.content.split('\n').map((paragraph, index) => {
                if (!paragraph.trim()) return <div key={index} className="h-6"></div>; // Clean spacing between paragraphs
                
                // First Paragraph Drop Cap Styling
                if (index === 0) {
                  return (
                    <p key={index} className="text-lg md:text-[22px] text-neutral-800 leading-[1.8] mb-12 pb-12 border-b border-neutral-200/60">
                      <span className="text-[80px] md:text-[100px] font-black text-[#111] float-left mr-5 -mt-4 md:-mt-6 leading-none">
                        {paragraph.charAt(0)}
                      </span>
                      {paragraph.slice(1)}
                    </p>
                  );
                }

                // Subheadings logic (If a paragraph is short and doesn't end with a period, make it a heading)
                const isHeading = paragraph.length < 60 && !paragraph.endsWith('.');

                if (isHeading) {
                   return (
                     <h3 key={index} className="text-2xl md:text-3xl font-bold text-[#111] mt-12 mb-6 tracking-tight">
                       {paragraph}
                     </h3>
                   )
                }

                // Regular Paragraph
                return (
                  <p key={index} className="mb-6 text-[17px] md:text-[19px] text-neutral-600">
                    {paragraph}
                  </p>
                );
              })}
            </article>

            {/* Post-Article Tags */}
            <div className="mt-16 pt-8 border-t border-neutral-200">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-1">
                <Hash size={12}/> Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white border border-neutral-200 text-neutral-600 rounded-lg text-[11px] font-bold uppercase tracking-widest hover:border-black hover:text-black transition-colors cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Share */}
            <div className="lg:hidden flex flex-wrap items-center justify-center gap-4 py-10 mt-10 border-t border-neutral-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Share this piece</span>
              <button className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors"><Twitter size={18} /></button>
              <button className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-500 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors"><Linkedin size={18} /></button>
              <button className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-500 hover:text-black hover:border-black transition-colors"><Link2 size={18} /></button>
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR (Sticky Info) ================= */}
          <aside className="hidden xl:block w-80 shrink-0 sticky top-32 h-max">
             
             {/* Beautiful Author Card */}
             <div className="bg-white p-8 rounded-3xl border border-neutral-200 mb-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-neutral-100 p-0.5">
                    <img src="/images/about01.png" alt="Sourav Louha" className="w-full h-full object-cover rounded-full grayscale-[10%]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[#111] leading-none mb-1.5">Sourav Louha</h4>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Software Engineer</p>
                  </div>
                </div>
                <p className="text-[14px] text-neutral-500 leading-relaxed font-medium mb-8">
                  Building scalable web architectures, exploring digital forensics, and discussing Indian polity. Rooted in tradition, reaching for the stars.
                </p>
                <Link to="/about" className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#F9F9F9] border border-neutral-200 hover:border-black hover:bg-black hover:text-white text-xs font-bold text-[#111] uppercase tracking-widest rounded-xl transition-all duration-300 group">
                  View Profile <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>

             {/* Quick Actions (Read Next / Similar) */}
             <div className="bg-[#111] text-white p-8 rounded-3xl relative overflow-hidden group cursor-pointer">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 blur-2xl rounded-full group-hover:bg-white/20 transition-all duration-500"></div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">Read Next</h4>
                <h3 className="text-xl font-bold leading-snug mb-6 group-hover:text-neutral-300 transition-colors">
                  Architecting Scalable Web Apps: Next.js, Prisma, and PostgreSQL
                </h3>
                <Link to="/blog/scalable-architecture-prisma" className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-white">
                  Read Article <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>

          </aside>

        </div>
      </main>

    </div>
  );
}