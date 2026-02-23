export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  tech: string[];
  features: string[];
  image: string;
  screenshots: string[];
}

export interface Skill {
  name: string;
  icon: string;
  // এখানে 'ml' যোগ করা হয়েছে
  category: 'frontend' | 'backend' | 'devops' | 'cms' | 'tools' | 'ml';
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
}