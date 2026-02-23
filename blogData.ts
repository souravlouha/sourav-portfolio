// src/blogData.ts

export interface Article {
  id: string; // ইউআরএল-এর জন্য (যেমন: 'digital-forensics')
  title: string;
  excerpt: string;
  content: string; // এখানে আপনার পুরো ব্লগের লেখাটি থাকবে
  category: 'builder' | 'nation' | 'explorer';
  date: string;
  readTime: string;
}

export const blogsData: Article[] = [
  {
    id: "nextjs-prisma-architecture",
    title: "Building scalable architectures with Next.js & Prisma",
    excerpt: "A deep dive into how I structured the backend for RuneAI, handling complex database relations and API routes efficiently.",
    content: "Here goes your full blog content about Next.js and Prisma... (আপনি এখানে আপনার পুরো লেখাটি প্যারাগ্রাফ করে লিখতে পারবেন)",
    category: "builder",
    date: "Feb 18, 2026",
    readTime: "6 min read"
  },
  {
    id: "indian-polity-rights",
    title: "The essence of Indian Polity: Rights and Duties",
    excerpt: "Reflecting on the constitutional framework of India, the balance of power, and what it means for the youth shaping the nation today.",
    content: "Here goes your full blog content about Indian Polity... (আপনার সম্পূর্ণ রাজনৈতিক ও গঠনমূলক বিশ্লেষণ এখানে থাকবে)",
    category: "nation",
    date: "Feb 10, 2026",
    readTime: "8 min read"
  },
  {
    id: "cycling-dooars",
    title: "Cycling through the Dooars: Finding mental clarity",
    excerpt: "Sometimes, the best way to debug code is to step away from the screen. My recent cycling trip around Falakata and Alipurduar.",
    content: "Here goes your full blog content about your cycling experience... (সাইক্লিং নিয়ে আপনার অভিজ্ঞতা এখানে লিখবেন)",
    category: "explorer",
    date: "Jan 25, 2026",
    readTime: "4 min read"
  },
  {
    id: "digital-forensics-basics",
    title: "Digital Forensics: The invisible layer of cyber security",
    excerpt: "Exploring the basics of cyber forensics, how digital footprints are traced, and why it is crucial for modern tech policies.",
    content: "Full content about digital forensics...",
    category: "builder",
    date: "Jan 15, 2026",
    readTime: "7 min read"
  }
];