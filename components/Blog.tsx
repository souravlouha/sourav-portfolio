import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Calendar,
  Clock
} from 'lucide-react';

// ================= TYPES =================
export type Category = 'all' | 'builder' | 'nation' | 'explorer';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'builder' | 'nation' | 'explorer';
  date: string;
  readTime: string;
  tags: string[];
}

export interface MicroThought {
  id: number;
  content: string;
  date: string;
  time: string;
}

// ================= DATA =================
export const blogsData: Article[] = [
  {
    id: "bond-duncan-aegon-targaryen",
    title: "A Bond Forged in Blood and Honor: The Unlikely Brotherhood of Ser Duncan and Aegon Targaryen",
    excerpt: "In the ruthless world of Westeros, the unbreakable bond between a humble hedge knight and a disguised Targaryen prince proves that true nobility lies in the courage of your heart.",
    content: "In the vast and often ruthless world of George R.R. Martin’s Westeros, love and loyalty are usually traded like currency. Nobles backstab each other for the Iron Throne, and family bloodlines are protected with cruel ferocity. Yet, hidden within the pages of A Knight of the Seven Kingdoms, lies the purest and most profoundly moving relationship in the entire A Song of Ice and Fire universe: the unbreakable bond between a giant, humble hedge knight named Ser Duncan the Tall, and a bald, foul-mouthed boy named Egg—who just so happens to be Prince Aegon Targaryen.\n\nTheir story, beginning at the fateful Tourney at Ashford Meadow, is not just a tale of adventure. It is a masterclass in what it means to be a true knight, and how chosen family can sometimes mean more than the blood of the dragon.\n\nThe Giant of Flea Bottom and the Dragon in Disguise\n\nWhen Dunk first meets Egg, there is nothing royal about the boy. He is completely bald, covered in dirt, and stubbornly insists on becoming Dunk’s squire. Dunk, a boy from the slums of Flea Bottom who has just buried his mentor, Ser Arlan of Pennytree, agrees. He sees something in this fierce, loyal child.\n\nDunk treats Egg not as a servant, but as a little brother. He feeds him, teaches him, and protects him, completely unaware that he is ordering around the future King of the Seven Kingdoms. This foundation of genuine equality is what makes their relationship so powerful. Egg experiences the world through the eyes of the common folk because of Dunk. He learns what it means to be hungry, cold, and overlooked—lessons that no maester in the Red Keep could ever teach him.\n\nThe Spark of Rebellion: A Knight’s Vow Tested\n\nThe true test of their love and loyalty comes abruptly and violently at Ashford Meadow. When Dunk sees Prince Aerion Targaryen (Egg’s cruel, sadistic older brother) viciously beating an innocent puppeteer named Tanselle, Dunk does what true knights are sworn to do: he protects the weak. He attacks Prince Aerion, striking royal blood.\n\nIn Westeros, a commoner striking a Targaryen prince means a death sentence—usually by losing a hand, a foot, or one's head. When the royal guards swarm Dunk, ready to kill him or drag him to the dungeons, the true depth of Egg’s love for his \"Ser\" is revealed.\n\nEgg’s Defiance: Standing Against the Dragon\n\nIt is in this terrifying moment that the dirty, bald squire steps in front of the royal guards. He pulls off his boot, retrieves his Targaryen signet ring, and reveals his true identity to the world: Prince Aegon of House Targaryen.\n\n“Leave him be!” Egg screams at the guards. “He is my knight!”\n\nThis is a monumental moment. Egg, a boy of only nine or ten, stands up against his terrifying older brother Aerion, and even risks the wrath of his stern, imposing father, Prince Maekar. Egg does not care about royal protocol or Targaryen pride. He only cares about Dunk.\n\nWhen Dunk’s punishment is decided by a Trial of Seven (a brutal 7-vs-7 deathmatch), nobody wants to fight for a poor hedge knight against the royal family. But Egg refuses to let his friend die. Running desperately through the muddy camp in the dead of night, the young prince secretly begs, negotiates, and rallies warriors to fight for Dunk. Egg uses his knowledge of the noble houses, his sharp wit, and his undeniable desperation to find champions. He betrays his own family’s interests to save a man he has only known for a few days, proving that his loyalty lies with true honor, not just Targaryen blood.\n\nPrince Baelor Breakspear: The Hand of Justice\n\nDespite Egg’s heroic efforts, Dunk is still one man short as the trial is about to begin. Facing Aerion, Prince Maekar, and three Kingsguard knights, Dunk’s death seems inevitable.\n\nThen comes the greatest twist of fate, delivered by the most honorable man in Westeros: Prince Baelor Breakspear.\n\nBaelor is the Crown Prince, the Hand of the King, and Egg’s uncle. He is the man destined to rule the Seven Kingdoms. Baelor had observed Dunk; he saw the giant knight’s humility, his honesty, and his unwavering moral compass. He also saw how deeply his nephew, Egg, loved this hedge knight.\n\nIn a moment that still gives readers chills, Prince Baelor steps forward to be Dunk’s seventh champion. He literally takes up arms against his own brother (Maekar) and nephews (Aerion and Daeron) to defend a commoner. Baelor understands that the laws of gods and men demand justice, and justice was on Dunk’s side.\n\n“This man protected the weak, as every true knight must swear to do,” Baelor proves with his actions.\n\nTragically, Baelor’s immense bravery costs him his life. He receives a fatal blow to the head from his brother Maekar’s mace during the trial. The greatest king Westeros never had dies in the mud, all to save the life of a hedge knight. Baelor’s sacrifice is the ultimate validation of Dunk’s goodness. It is a heartbreaking reminder that doing the right thing in Westeros often requires the ultimate price.\n\nA Journey of a Lifetime\n\nThe aftermath of the Trial of Seven cements Dunk and Egg forever. Prince Maekar, broken by the guilt of accidentally killing his brother Baelor, realizes something profound. He sees how Aerion turned out to be a monster despite having the best royal tutors. Then, he looks at Dunk—a poor, uneducated boy from Flea Bottom who possesses more honor, bravery, and chivalry than half the lords in the realm.\n\nMaekar allows Egg to remain Dunk’s squire. He realizes that if Egg is to grow up to be a good man, he needs to be raised by a true knight.\n\nAnd so, the giant and the bald boy ride off into the sunset. They are no longer just a knight and a squire. They are brothers. They are a family forged in the fires of Ashford Meadow. Egg’s unwavering support and Baelor’s ultimate sacrifice taught Dunk that true nobility has nothing to do with the blood in your veins, but the courage in your heart.\n\nTogether, they would go on to shape the history of Westeros, proving that sometimes, the greatest kings are the ones who learn to serve in the mud.",
    category: "explorer",
    date: "Feb 21, 2026",
    readTime: "8 min read",
    tags: ["Game of Thrones", "Lore", "Storytelling"]
  },
  {
    id: "react-19-nextjs-evolution",
    title: "Building for the Future: Why React 19 & Next.js are Game Changers",
    excerpt: "An analytical look into Server Components, better state management, and how the modern web is fundamentally shifting towards performance.",
    content: "The web development landscape is experiencing a paradigm shift...",
    category: "builder",
    date: "Feb 18, 2026",
    readTime: "6 min read",
    tags: ["React", "Next.js", "Performance"]
  },
  {
    id: "national-security-border-imperative",
    title: "Uncompromising Sovereignty: The Imperative of Border Security",
    excerpt: "A nation is defined by its borders. Reflecting on why geopolitical pressure must never compromise India's internal and external security policies.",
    content: "A nation without secure borders is akin to a house without walls...",
    category: "nation",
    date: "Feb 12, 2026",
    readTime: "7 min read",
    tags: ["Geopolitics", "India", "Security"]
  },
  {
    id: "bengal-assam-startup-ecosystem",
    title: "Fostering a Builder Ecosystem: The Road Ahead for Startups in East India",
    excerpt: "Analyzing the tech policies of Bengal and Assam, and what it takes to build a thriving, innovation-driven startup culture in the region.",
    content: "When we talk about the Indian startup ecosystem...",
    category: "builder",
    date: "Feb 05, 2026",
    readTime: "5 min read",
    tags: ["Startups", "Bengal", "Ecosystem"]
  },
  {
    id: "cyber-forensics-era",
    title: "The Invisible Layer of Cyber Security: A Primer on Digital Forensics",
    excerpt: "Exploring how digital footprints are traced, data is recovered, and why cyber forensics is the backbone of modern tech law enforcement.",
    content: "We are living in an era where our physical lives are deeply tethered...",
    category: "builder",
    date: "Jan 28, 2026",
    readTime: "8 min read",
    tags: ["Cyber Security", "Forensics"]
  },
  {
    id: "polity-fundamental-duties",
    title: "Beyond Rights: The Essence of Fundamental Duties in Indian Polity",
    excerpt: "A deep dive into the Indian Constitution, emphasizing why a focus on Fundamental Duties is the true mark of a responsible citizen.",
    content: "Modern democratic discourse is heavily skewed...",
    category: "nation",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    tags: ["Polity", "Constitution", "Duties"]
  },
  {
    id: "scalable-architecture-prisma",
    title: "Architecting Scalable Web Apps: Next.js, Prisma, and PostgreSQL",
    excerpt: "Technical breakdown of how I structure backend relationships, handle complex data modeling, and optimize queries for high-traffic apps.",
    content: "Building scalable web applications requires a fundamental shift...",
    category: "builder",
    date: "Jan 12, 2026",
    readTime: "9 min read",
    tags: ["Database", "Prisma", "PostgreSQL"]
  }
];

// ================= COMPONENT =================
export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = blogsData.filter((article: Article) => {
    const matchesCategory = activeTab === 'all' || article.category === activeTab;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F9F9F9] font-sans text-[#111] selection:bg-neutral-200">
      
      {/* ======================================================== */}
      {/* 1. HERO TYPOGRAPHY                                       */}
      {/* ======================================================== */}
      <header className="relative pt-40 pb-16 md:pt-52 md:pb-24 px-4 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-white blur-[120px] -z-10 rounded-full pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center w-full"
        >
          <h1 className="text-[25vw] md:text-[18vw] lg:text-[16vw] leading-[0.8] font-black tracking-tighter text-[#111] uppercase mb-4 select-none">
            BLOGS
          </h1>
          
          <div className="flex flex-col items-center gap-1 md:gap-2">
             <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-neutral-500">
               THOUGHTS, TUTORIALS, AND
             </span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#111] tracking-tight pr-4">
               insights i share.
             </h2>
          </div>
        </motion.div>
      </header>

      <main className="max-w-[1300px] mx-auto px-6 md:px-12 pb-32">
        
        {/* ======================================================== */}
        {/* 2. SEARCH BAR & LATEST POSTS HEADER                      */}
        {/* ======================================================== */}
        <div className="flex flex-col gap-8 mb-16 pt-10">
           
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-neutral-200/60 pb-8">
             <h3 className="text-2xl font-bold tracking-tight text-black uppercase">Latest Posts</h3>
             
             <div className="flex flex-wrap gap-2">
                {['all', 'builder', 'nation', 'explorer'].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveTab(cat as Category)} 
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
           
           <div className="relative w-full max-w-3xl mx-auto -mt-4">
             <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
               <Search size={16} className="text-neutral-400" />
             </div>
             <input 
               type="text" 
               placeholder="Search articles by title or keyword..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-12 pr-6 py-4 bg-white border border-neutral-200/80 focus:border-neutral-400 rounded-full text-[14px] focus:outline-none transition-all placeholder:text-neutral-400 font-medium"
             />
           </div>
        </div>

        {/* ======================================================== */}
        {/* 3. ULTRA-MINIMAL GRID CARDS (Typography Focused)         */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence>
            {filteredArticles.map((article: Article, index) => (
              <motion.div 
                key={article.id} 
                layout
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="h-full"
              >
                <Link to={`/blog/${article.id}`} className="group flex flex-col p-8 bg-white rounded-3xl border border-neutral-100 hover:border-neutral-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 h-full cursor-pointer">
                  
                  {/* Top Meta Data (Date & Read Time) */}
                  <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-6">
                     <span>{article.date}</span>
                     <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                     <span>{article.readTime}</span>
                  </div>
                  
                  {/* Big Bold Title */}
                  <h3 className="text-2xl font-black text-black mb-4 leading-tight group-hover:text-neutral-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  {/* Crisp Excerpt */}
                  <p className="text-[15px] text-neutral-500 leading-relaxed mb-8 flex-grow font-medium line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  {/* Minimal Tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-auto pt-6 border-t border-neutral-100">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-neutral-50 text-neutral-600 rounded-md text-[10px] font-bold uppercase tracking-widest group-hover:bg-neutral-100 transition-colors">
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 2 && (
                       <span className="px-2 py-1 text-neutral-400 text-[10px] font-bold uppercase tracking-widest">
                         +{article.tags.length - 2}
                       </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
      
      {/* Decoding Section এবং Footer এখন Layout.tsx এর মাধ্যমে অটোমেটিক আসবে, তাই এখান থেকে রিমুভ করা হলো */}

    </div>
  );
}