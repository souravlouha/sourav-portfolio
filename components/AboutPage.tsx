import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Award,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Interfaces ---
interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  type: string;
  date: string;
  description: string[];
  tags: string[];
  logoUrl: string;
}

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  location: string;
  date: string;
  description: string[];
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
}

// --- Mock Data ---
const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Freelance",
    location: "Kolkata, India",
    type: "Remote / Hybrid",
    date: "MAY 2025 - PRESENT",
    logoUrl: "https://ui-avatars.com/api/?name=F+D&background=random", 
    description: [
      "Engineered scalable web models using React and Next.js, improving site performance.",
      "Built and fine-tuned UI components for modern web applications.",
      "Streamlined deployment processes reducing latency and compute usage.",
      "Collaborated with backend teams to integrate APIs efficiently."
    ],
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"]
  },
  {
    id: 2,
    role: "Open Source Contributor",
    company: "Community",
    location: "Global",
    type: "Contributor",
    date: "JAN 2025 - CURRENT",
    logoUrl: "https://ui-avatars.com/api/?name=O+S&background=000&color=fff", 
    description: [
      "Actively contributing to open-source projects while sharpening Data Structures & Algorithms (DSA).",
      "Focused on improving code quality, implementing new features, and collaborating with developers across the globe."
    ],
    tags: ["GitHub", "Open Source", "JavaScript"]
  }
];

const educationData: EducationItem[] = [
  {
    id: 1,
    degree: "B.Tech in Electronics & Communication (ECE)",
    institution: "Techno Main Salt Lake (MAKAUT)",
    location: "Kolkata, West Bengal",
    date: "2022 - 2026 (Final Year)",
    description: [
      "Currently in my final year, maintaining a solid academic record with a CGPA of 7.1.",
      "Combining my core electronics knowledge with a strong passion for software engineering, web development, and digital forensics."
    ]
  },
  {
    id: 2,
    degree: "Higher Secondary Education (12th)",
    institution: "Falakata Government High School",
    location: "Falakata, Alipurduar, West Bengal",
    date: "Completed 2022",
    description: [
      "Board: West Bengal Council of Higher Secondary Education (WBCHSE).",
      "Focused on Science and Mathematics, building the core analytical and logical foundation required for my engineering journey."
    ]
  },
  {
    id: 3,
    degree: "Secondary Education (10th)",
    institution: "Falakata Government High School",
    location: "Falakata, Alipurduar, West Bengal",
    date: "Completed 2020",
    description: [
      "Board: West Bengal Board of Secondary Education (WBBSE).",
      "Developed a strong academic foundation with a keen interest in science and technology."
    ]
  }
];

const certificationsData: Certification[] = [
  {
    id: 1,
    title: "Advanced React & Next.js",
    issuer: "Frontend Masters",
    date: "Oct 2025"
  },
  {
    id: 2,
    title: "Python for Development",
    issuer: "Coursera",
    date: "Aug 2025"
  },
  {
    id: 3,
    title: "Cyber Forensics Basics",
    issuer: "Udemy",
    date: "Jan 2026"
  }
];

// --- Sub-Components ---
const SocialLink = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
    <Icon size={18} />
  </a>
);

const Tag: React.FC<{ text: string }> = ({ text }) => (
  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] md:text-xs rounded-full font-medium">
    {text}
  </span>
);

const GitHubCalendar = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
        <div className="flex items-center gap-2">
           <Github size={16} className="text-gray-900" />
           <span className="text-gray-900 font-semibold">957</span> contributions in the last year
        </div>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="w-2 h-2 bg-gray-200 rounded-sm"></div>
          <div className="w-2 h-2 bg-green-200 rounded-sm"></div>
          <div className="w-2 h-2 bg-green-400 rounded-sm"></div>
          <div className="w-2 h-2 bg-green-600 rounded-sm"></div>
          <div className="w-2 h-2 bg-green-800 rounded-sm"></div>
          <span>More</span>
        </div>
      </div>
      
      <div className="flex gap-[3px] flex-wrap md:flex-nowrap mask-linear-fade justify-center">
        {Array.from({ length: 50 }).map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, rowIndex) => {
              const intensity = Math.random();
              let colorClass = "bg-gray-100";
              if (intensity > 0.85) colorClass = "bg-green-600";
              else if (intensity > 0.6) colorClass = "bg-green-400";
              else if (intensity > 0.4) colorClass = "bg-green-200";
              
              return (
                <div 
                  key={rowIndex} 
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${colorClass}`} 
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// PERFECTLY SIZED 3D COVERFLOW GALLERY (Medium Size, Right Aligned)
// ============================================================================
const CoverflowGallery = () => {
  const images = [
    "/images/image1.jpg",
    "/images/about02.jpeg", 
    "/images/image5.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500); 
    return () => clearInterval(timer);
  }, [images.length]);

  const smoothTransition = {
    type: "spring",
    stiffness: 150, 
    damping: 25,    
    mass: 1.2       
  } as const;

  return (
    // কন্টেইনারের হাইট মাঝারি মাপে (450px থেকে 550px) রাখা হয়েছে
    <div className="relative w-full flex items-center justify-center [perspective:1200px] mt-10 md:mt-0 h-[450px] md:h-[550px]">
      
      {/* ছবির সাইজ মাঝারি মাপে (w-64 থেকে w-80) রাখা হয়েছে */}
      <div className="relative w-64 md:w-80 aspect-[3/4]" style={{ transformStyle: "preserve-3d" }}>
        
        <AnimatePresence initial={false}>
          {images.map((img, index) => {
            let offset = index - currentIndex;
            if (offset === 2) offset = -1;
            if (offset === -2) offset = 1;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            // পজিশনিং একদম পারফেক্ট করা হয়েছে
            let x: string | number = 0;
            let rotateY = 0;
            let z = 0;
            let opacity = 1;
            let scale = 1;
            let zIndex = 10;

            if (isCenter) {
              x = 0;
              rotateY = 0;
              z = 50; 
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (isLeft) {
              x = "-60%"; 
              rotateY = 35; 
              z = -80; 
              scale = 0.85;
              opacity = 0.6;
              zIndex = 20;
            } else if (isRight) {
              x = "60%"; 
              rotateY = -35; 
              z = -80;
              scale = 0.85;
              opacity = 0.6;
              zIndex = 20;
            }

            return (
              <motion.div
                key={index}
                animate={{ x, rotateY, z, scale, opacity, zIndex }}
                transition={smoothTransition}
                onClick={() => setCurrentIndex(index)}
                className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer bg-neutral-900"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img 
                  src={img} 
                  alt="Gallery" 
                  onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'}
                  className="w-full h-full object-cover grayscale-[10%] contrast-[1.05]" 
                />
                {!isCenter && (
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-500" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

      </div>
    </div>
  );
};


// --- Main Component ---
export default function AboutPage() {
  return (
    <div className="bg-[#FDFDFD] overflow-x-hidden selection:bg-purple-100 selection:text-purple-900 font-sans text-neutral-900">
      
      {/* Hero Section */}
      <header className="pt-32 pb-16 md:pt-48 md:pb-24 text-center px-4">
        <h1 className="text-[12vw] leading-none font-black tracking-tighter text-gray-900 select-none">
          ABOUT ME
        </h1>
        <p className="mt-4 text-xs md:text-sm tracking-[0.2em] text-gray-500 uppercase">
          Get to know more about
        </p>
        <p className="font-serif italic text-3xl md:text-5xl mt-2 text-gray-800">
          who i am.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Intro Section with Adjusted Layout */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center mb-32">
          
          {/* Text Left Side (7 কলাম জায়গা দেওয়া হয়েছে এবং ডানদিকে প্যাডিং বাড়ানো হয়েছে) */}
          <div className="md:col-span-7 space-y-8 order-2 md:order-1 z-10 relative pr-4 lg:pr-12">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
              Nice to meet you. I'm <span className="font-serif italic text-fuchsia-500 font-medium">Sourav</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                I transform complex ideas into high-speed, scalable web products. As an engineering-driven developer, I focus on the entire stack—prioritizing clean architecture, seamless performance, and modern solutions that drive real value.
              </p>
              <p>
                Beyond writing code, I understand the product lifecycle. I've learned firsthand how to build, ship, and scale meaningful products in a fast-paced environment.
              </p>
              <p>
                My philosophy is simple: build things that last. I help startups and businesses bridge the gap between concept and reality with code that performs.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <SocialLink icon={Linkedin} href="https://www.linkedin.com/in/sourav-louha-703953249/" />
              <SocialLink icon={Github} href="https://github.com/souravlouha" />
              <SocialLink icon={Twitter} href="https://x.com/iamsouravn" />
            </div>
          </div>

          {/* 3D Gallery Right Side (5 কলাম জায়গা দেওয়া হয়েছে এবং একদম ডানদিকে চাপানো হয়েছে) */}
          <div className="md:col-span-5 relative flex justify-end w-full order-1 md:order-2 pl-4 lg:pl-10">
            <CoverflowGallery />
          </div>

        </section>

        {/* Experience Section */}
        <section className="mb-24 relative">
          <div className="text-center mb-16">
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">The Experience</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Experience That <br/>
              Brings <span className="font-serif italic text-fuchsia-500 font-medium">Ideas to Life</span>
            </h2>
          </div>

          <div className="hidden md:block absolute left-1/2 top-32 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 relative group">
                
                <div className="md:col-span-5 md:text-right flex flex-col items-start md:items-end justify-start pt-2">
                  <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1">{exp.date}</span>
                  <h3 className={`text-2xl font-serif italic ${index === 0 ? 'text-fuchsia-500' : 'text-fuchsia-400'}`}>
                    {exp.company}
                  </h3>
                  <div className="mt-2 text-xs text-gray-500 flex flex-col md:items-end gap-1">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} /> {exp.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={12} /> {exp.type}
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex md:col-span-2 justify-center pt-3 relative z-10">
                   <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                     <img src={exp.logoUrl} alt={exp.company} className="w-full h-full object-cover" />
                   </div>
                   {index === 0 && <div className="absolute top-14 bottom-[-60px] w-0.5 bg-gradient-to-b from-fuchsia-400 to-transparent"></div>}
                </div>

                <div className="md:col-span-5 pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{exp.role}</h3>
                  <ul className="space-y-3 mb-6">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-sm text-gray-600 leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => <Tag key={tag} text={tag} />)}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ================= EDUCATION SECTION ================= */}
        <section className="mb-32 relative">
          <div className="text-center mb-16">
            <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">The Foundation</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Academic <span className="font-serif italic text-blue-500 font-medium">Background</span>
            </h2>
          </div>

          <div className="hidden md:block absolute left-1/2 top-32 bottom-0 w-px bg-gray-200 -translate-x-1/2"></div>

          <div className="space-y-16">
            {educationData.map((edu, index) => (
              <div key={edu.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 relative group">
                
                {/* Left Side */}
                <div className="md:col-span-5 md:text-right flex flex-col items-start md:items-end justify-start pt-2">
                  <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1">{edu.date}</span>
                  <h3 className="text-2xl font-serif italic text-blue-500">
                    {edu.institution}
                  </h3>
                  <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} /> {edu.location}
                  </div>
                </div>

                {/* Center Node */}
                <div className="hidden md:flex md:col-span-2 justify-center pt-3 relative z-10">
                   <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg bg-blue-50 flex items-center justify-center text-blue-500">
                     <GraduationCap size={20} />
                   </div>
                </div>

                {/* Right Side */}
                <div className="md:col-span-5 pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{edu.degree}</h3>
                  <ul className="space-y-3 mb-6">
                    {edu.description.map((desc, i) => (
                      <li key={i} className="text-sm text-gray-600 leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ================= CERTIFICATIONS SECTION ================= */}
        <section className="mb-32">
           <div className="text-center mb-16">
             <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Continuous Learning</h4>
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
               Licenses <span className="font-serif italic text-green-500 font-medium">& Certifications</span>
             </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {certificationsData.map((cert) => (
               <div key={cert.id} className="bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-6">
                     <Award size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{cert.title}</h3>
                  <div className="flex items-center justify-between mt-4 border-t border-gray-50 pt-4">
                     <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">{cert.issuer}</p>
                       <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                     </div>
                     <ExternalLink size={16} className="text-gray-300 group-hover:text-green-500 transition-colors" />
                  </div>
               </div>
             ))}
           </div>
        </section>

        {/* GitHub Activity Section */}
        <section className="mb-32">
          <div className="text-center mb-12">
             <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">My Code Journey</h4>
             <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
               GitHub Activity <br/>
               <span className="font-serif italic text-blue-500 font-medium">&& Open Source</span>
             </h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
             <GitHubCalendar />
          </div>
        </section>

      </main>
    </div>
  );
}