import React from 'react';
import { Project, Skill, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'rune',
    name: 'Rune',
    description: 'All-in-one productivity toolkit with 100+ tools.',
    longDescription: 'Rune is your all-in-one productivity toolkit featuring 100+ powerful tools for learning, creating, and working smarter. From text editing to AI-powered assistants, Rune empowers students and professionals.',
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'OpenAI', 'Framer Motion', 'Node.js', 'Vercel'],
    features: [
      '100+ free tools including text editors, PDF converters',
      'AI-powered tools for writing, summarizing, and content creation',
      'Developer utilities with JSON formatter, regex tester'
    ],
    image: 'https://picsum.photos/seed/rune/800/600',
    screenshots: [
      'https://picsum.photos/seed/rune1/400/300',
      'https://picsum.photos/seed/rune2/400/300',
      'https://picsum.photos/seed/rune3/400/300'
    ]
  },
  {
    id: 'rune-ai',
    name: 'Rune AI',
    description: 'Powerful RAG system with specialized models.',
    longDescription: 'Rune AI features a powerful RAG system, three specialized models (Fast, Thinking, Pro), and a massive 500K context limit for deep research and intelligent automation.',
    tech: ['Rune UI', 'LangGraph', 'Tavily', 'Appwrite', 'Next.js', 'Vercel', 'Tailwind CSS'],
    features: [
      'Three specialized models: Fast, Thinking, Pro',
      'Massive 500K context limit for deep document analysis',
      'Advanced Web Search and intelligent automated Tool Calling'
    ],
    image: 'https://picsum.photos/seed/runeai/800/600',
    screenshots: [
      'https://picsum.photos/seed/ai1/400/300',
      'https://picsum.photos/seed/ai2/400/300'
    ]
  },
  {
    id: 'rune-hub',
    name: 'RuneHub',
    description: 'Comprehensive programming education platform.',
    longDescription: 'RuneHub is a comprehensive programming education platform featuring extensive tutorials and articles on different programming languages, frameworks, and technologies.',
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Sanity CMS', 'Prism.js', 'Algolia', 'Vercel'],
    features: [
      'Comprehensive programming tutorials and articles',
      'Tech trends section with latest industry insights',
      'Sanity CMS integration for efficient content management'
    ],
    image: 'https://picsum.photos/seed/runehub/800/600',
    screenshots: [
      'https://picsum.photos/seed/hub1/400/300',
      'https://picsum.photos/seed/hub2/400/300'
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: 'ReactJS', icon: '⚛️', category: 'frontend' },
  { name: 'NextJS', icon: '▲', category: 'frontend' },
  { name: 'TypeScript', icon: 'TS', category: 'frontend' },
  { name: 'Tailwind CSS', icon: '🌊', category: 'frontend' },
  { name: 'NodeJS', icon: '🟢', category: 'backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'backend' },
  { name: 'MongoDB', icon: '🍃', category: 'backend' },
  { name: 'Prisma', icon: '◮', category: 'backend' },
  { name: 'Sanity', icon: '📝', category: 'cms' },
  { name: 'Framer Motion', icon: '🎭', category: 'frontend' },
  { name: 'Zustand', icon: '🐻', category: 'frontend' },
  { name: 'Docker', icon: '🐳', category: 'devops' },
  { name: 'Vercel', icon: '▲', category: 'devops' },
  { name: 'Git', icon: '📦', category: 'tools' },
  
  // --- নতুন অ্যাড করা Data Science / ML স্কিলগুলো ---
  { name: 'Python', icon: '🐍', category: 'ml' },
  { name: 'Scikit-Learn', icon: '🤖', category: 'ml' },
  { name: 'NumPy', icon: '🔢', category: 'ml' },
  { name: 'Pandas', icon: '🐼', category: 'ml' },
  { name: 'Matplotlib', icon: '📊', category: 'ml' },
  { name: 'Plotly', icon: '📈', category: 'ml' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Gulshan Sharma',
    role: 'SDE 1',
    company: 'Big4',
    avatar: 'https://picsum.photos/seed/gulshan/100/100',
    quote: "Sourav's attention to detail and focus on creating smooth interfaces helped refine our work significantly. His frontend skills stand out clearly."
  },
  {
    name: 'Shashank Kumar',
    role: 'Senior Software Engineer',
    company: 'Cognizant',
    avatar: 'https://picsum.photos/seed/shashank/100/100',
    quote: "Working with Sourav has been genuinely positive. He brings strong frontend knowledge and fresh perspective to every problem."
  },
  {
    name: 'Armaan Singh',
    role: 'Technical Lead',
    company: 'Infosys',
    avatar: 'https://picsum.photos/seed/armaan/100/100',
    quote: "Sourav contributes improvements that make our work better. He is someone you can count on for building quality interfaces."
  }
];