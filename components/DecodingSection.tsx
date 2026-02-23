import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  ArrowRight, 
  GitCommit,
  X 
} from 'lucide-react';

const DecodingSection: React.FC = () => {
  // =========================================================
  // 1. GITHUB REAL-TIME LOGIC
  // =========================================================
  const [githubData, setGithubData] = useState({
    message: "Fetching latest commit...",
    repo: "souravlouha/...",
    time: "Just now"
  });

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        const response = await fetch('https://api.github.com/users/souravlouha/events/public');
        const data = await response.json();
        
        const pushEvents = data.filter((event: any) => event.type === 'PushEvent');
        
        if (pushEvents.length > 0) {
          const latestPush = pushEvents[0];
          const commitMsg = latestPush.payload.commits[0]?.message || "Made some changes";
          const repoName = latestPush.repo.name.split('/')[1]; 
          
          setGithubData({
            message: commitMsg,
            repo: repoName,
            time: "Recently"
          });
        }
      } catch (error) {
        console.error("Error fetching GitHub data", error);
      }
    };
    
    fetchGitHubActivity();
  }, []);

  // =========================================================
  // 2. YOUTUBE MUSIC REAL-TIME LOGIC (Via Last.fm)
  // =========================================================
  const [musicData, setMusicData] = useState({
    song: "A Knight of the Seven Kingdoms", 
    artist: "Ramin Djawadi",
    album: "Game of Thrones",
    // একটি ডিফল্ট ওয়ার্ম-টোন ইমেজ যা ব্লার হলে ভালো লাগবে
    coverArt: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop", 
    isPlaying: true
  });

  useEffect(() => {
    const LASTFM_USERNAME = "YOUR_LASTFM_USERNAME"; 
    const LASTFM_API_KEY = "YOUR_LASTFM_API_KEY";   

    const fetchMusic = async () => {
      if (LASTFM_USERNAME === "YOUR_LASTFM_USERNAME") return; 

      try {
        const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`);
        const data = await res.json();
        const track = data.recenttracks.track[0];
        
        setMusicData({
          song: track.name,
          artist: track.artist['#text'],
          album: track.album['#text'] || "Unknown Album",
          coverArt: track.image[3]['#text'] || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop", // Extra large image
          isPlaying: track['@attr']?.nowplaying === 'true'
        });
      } catch (error) {
        console.error("Error fetching music data", error);
      }
    };

    fetchMusic();
    const interval = setInterval(fetchMusic, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#F9F9F9]">
       <div className="max-w-[1300px] mx-auto px-6 md:px-12">
           
           <div className="text-center mb-16">
             <h4 className="text-[10px] font-bold tracking-[0.3em] text-neutral-400 uppercase mb-4">
               Behind The Curtains
             </h4>
             <h2 className="text-4xl md:text-5xl font-black text-[#111] tracking-tight leading-tight">
               Decoding logic <br/>
               <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 font-normal">
                 && the lyrics
               </span>
             </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             
             {/* ========================================= */}
             {/* CARD 1: LIVE GITHUB ACTIVITY              */}
             {/* ========================================= */}
             <a href="https://github.com/souravlouha" target="_blank" rel="noreferrer" className="bg-white p-8 rounded-[2rem] border border-neutral-200 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[300px] group">
               <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-2">
                   <Github size={24} className="text-black" />
                   <h3 className="text-lg font-bold text-black">Sourav's <span className="font-serif italic font-normal text-neutral-500">DevLog</span></h3>
                 </div>
                 <ArrowRight size={16} className="text-neutral-300 group-hover:text-black group-hover:-rotate-45 transition-all" />
               </div>
               
               <div className="mt-auto">
                 <div className="flex items-center gap-2 mb-4">
                   <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-400">Latest Push</span>
                   <span className="px-2.5 py-1 bg-[#E8F5E9] text-[#0A7B3E] text-[9px] font-bold rounded-full flex items-center gap-1.5 border border-[#C8E6C9]">
                     <span className="w-1.5 h-1.5 bg-[#0A7B3E] rounded-full animate-pulse"></span>
                     {githubData.time}
                   </span>
                 </div>
                 <div className="flex items-start gap-2 mb-4">
                   <GitCommit size={18} className="text-neutral-400 mt-0.5 shrink-0" />
                   <p className="text-[15px] font-bold text-[#111] leading-snug line-clamp-3">
                     "{githubData.message}"
                   </p>
                 </div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono ml-6">
                   Repo: <span className="text-blue-500">{githubData.repo}</span>
                 </p>
               </div>
             </a>

             {/* ========================================= */}
             {/* CARD 2: PREMIUM GUESTBOOK SIGNATURE       */}
             {/* ========================================= */}
             <div className="bg-white p-8 rounded-[2rem] border border-neutral-200 flex flex-col justify-between min-h-[300px] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                 
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-100 blur-3xl rounded-full group-hover:bg-purple-200 transition-all duration-500"></div>

                 <div className="relative z-10">
                   <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">Visitors</h4>
                   <h3 className="text-4xl font-black text-gray-900 leading-[1.1] mb-1">Leave your</h3>
                   <h3 className="text-4xl font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-fuchsia-500 to-orange-500 mb-4">signature</h3>
                   <p className="text-sm text-gray-500 mt-4 font-medium">Let me know you were here.</p>
                 </div>

                 <div className="flex items-center justify-between mt-8 relative z-10">
                   <div className="flex items-center -space-x-3">
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"><img src="/images/about01.png" alt="" className="w-full h-full object-cover grayscale opacity-60"/></div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden"><img src="/images/about01.png" alt="" className="w-full h-full object-cover grayscale opacity-80"/></div>
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-[10px] font-black text-gray-500">
                        +20
                      </div>
                   </div>
                   <button className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-purple-600 transition-colors">
                     Sign Guestbook <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                 </div>
             </div>

             {/* ========================================= */}
             {/* CARD 3: LISTENING NOW (Exact Reference Match) */}
             {/* ========================================= */}
             <div className="bg-[#EAEAEA] rounded-[2rem] p-8 border border-neutral-200 flex flex-col relative overflow-hidden min-h-[300px] group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
               
               {/* Blurred Album Art Background */}
               <div className="absolute inset-0 z-0 overflow-hidden">
                 <img 
                   src={musicData.coverArt} 
                   alt="Album Cover" 
                   className="w-full h-full object-cover blur-[35px] scale-150 opacity-60 mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.6]" 
                 />
                 {/* White overlay for text readability */}
                 <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
               </div>
               
               <div className="relative z-10 flex flex-col h-full">
                  {/* Top Badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center justify-center w-[18px] h-[18px] rounded-full border-[1.5px] border-green-600">
                      <div className={`w-1.5 h-1.5 bg-green-600 rounded-full ${musicData.isPlaying ? 'animate-pulse' : ''}`}></div>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#111]">
                      {musicData.isPlaying ? "Listening Now" : "Last Played"}
                    </span>
                  </div>
                  
                  {/* Song Details Typography */}
                  <div className="max-w-[210px]">
                    <p className="text-[17px] leading-[1.5] font-medium text-[#222]">
                      I'm listening to <span className="font-bold text-black">{musicData.song}</span> OST from the album <span className="font-bold text-black">{musicData.album}</span>
                    </p>
                  </div>
               </div>

               {/* Large Vinyl Record at Bottom Right */}
               <div className={`absolute -bottom-16 -right-16 w-56 h-56 z-10 transition-transform duration-700 ${musicData.isPlaying ? 'animate-[spin_5s_linear_infinite]' : ''} group-hover:-translate-y-2 group-hover:-translate-x-2`}>
                 <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center shadow-2xl">
                    {/* Vinyl Grooves */}
                    <div className="absolute inset-3 rounded-full border border-[#1A1A1A]"></div>
                    <div className="absolute inset-6 rounded-full border border-[#222]"></div>
                    <div className="absolute inset-10 rounded-full border border-[#1A1A1A]"></div>
                    <div className="absolute inset-14 rounded-full border border-[#222]"></div>
                    
                    {/* Red Center Label */}
                    <div className="w-[72px] h-[72px] bg-[#A32226] rounded-full flex items-center justify-center shadow-inner">
                       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                       </div>
                    </div>
                 </div>
               </div>

             </div>

           </div>
       </div>
    </section>
  );
};

export default DecodingSection;