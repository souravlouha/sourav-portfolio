// ==========================================
// 1. Project Interface 
// ==========================================
export interface Project {
  id: string | number;
  name: string;
  description: string;
  longDescription?: string;
  features: string[];
  tech: string[];
  image: string;
  screenshots?: string[];
  github?: string;
  link?: string;
}

// ==========================================
// 2. Projects Data Array
// ==========================================
export const PROJECTS: Project[] = [
  // 1. My Medicine App
  {
    id: "my-medicine-app", 
    name: "My Medicine App",
    description: "A comprehensive digital healthcare platform for seamless medicine management.",
    longDescription: "My Medicine App is a fully responsive digital solution designed to make healthcare management accessible and efficient. It provides users with a clean, modern interface to search, track, and manage their medicines seamlessly across both desktop and mobile devices.",
    features: [
      "User-friendly responsive design for mobile and desktop",
      "Seamless and fast searching capabilities",
      "Interactive UI built with modern React standards"
    ],
    tech: ["React", "Vite", "Tailwind CSS", "JavaScript"], 
    image: "/projects/medicine-main.png", 
    screenshots: [
      "/projects/medicine-laptop.png",
      "/projects/medicine-mobile.png"
    ],
    github: "https://github.com/souravlouha/my-medicine-app",
    link: "https://my-medicine-app.vercel.app/"
  },

  // 2. Plant Disease Detection
  {
    id: "plant-disease-detection", 
    name: "Plant Disease Detection",
    description: "An IoT and Machine Learning integrated system to detect plant diseases from leaf images.",
    longDescription: "This project utilizes Machine Learning algorithms to analyze agricultural data and leaf images for early detection of plant diseases. It aims to assist farmers in taking preventive measures to protect their crops.",
    features: [
      "Automated disease detection using image processing",
      "Machine learning model trained on agricultural datasets",
      "IoT hardware integration for real-time data analysis"
    ],
    tech: ["Python", "Machine Learning", "IoT", "Image Processing"], 
    image: "/projects/plant-main.png", 
    screenshots: [
      "/projects/plant-1.png",
      "/projects/plant-2.png"
    ],
    github: "https://github.com/souravlouha/IOT_2nd_year2023-24/tree/main/IOT_projects_NBA/Final_ProjectforNBA"
  },

  // 3. Cardiovascular Disease Detection
  {
    id: "cardiovascular-disease-detection", 
    name: "Cardio Disease Detection",
    description: "Detecting cardiovascular diseases using PCG, ECG, and PPG signals with ML models.",
    longDescription: "This healthcare project focuses on detecting cardiovascular diseases by processing PCG, ECG, and PPG signals. It combines advanced signal processing, feature extraction, and machine learning models to analyze heart health, identify murmurs, and support clinical decision-making for early diagnosis and remote monitoring.",
    features: [
      "Advanced signal processing and feature extraction",
      "Identification of heart murmurs and anomalies",
      "Support for clinical decision-making and remote monitoring"
    ],
    tech: ["Python", "Machine Learning", "Signal Processing", "Data Science"], 
    image: "/projects/cardio-main.png", 
    screenshots: [
      "/projects/cardio-1.png",
      "/projects/cardio-2.png"
    ],
    github: "https://github.com/souravlouha/Cardiovascular_Data_Acquisition-Disease_Detection_using_ML"
  },

  // 4. Agri-Horticulture Price Predictor
  {
    id: "agri-price-predictor", 
    name: "Agri Price Predictor",
    description: "A machine learning-based prediction system for forecasting agricultural commodity prices.",
    longDescription: "This project aims to build a machine learning-based prediction system for forecasting the prices of various agricultural and horticultural commodities. The goal is to help farmers, traders, and policymakers make data-driven decisions based on historical price trends and market insights.",
    features: [
      "Accurate price forecasting using ML algorithms",
      "Analysis of historical market trends",
      "Data-driven insights for farmers and policymakers"
    ],
    tech: ["Python", "Machine Learning", "Data Analytics", "Pandas"], 
    image: "/projects/agri-main.png", 
    screenshots: [
      "/projects/agri-1.png",
      "/projects/agri-2.png"
    ],
    github: "https://github.com/souravlouha/Predicting_Prices_of_Agri-Horticulture_Commodities_SIH24"
  },

  // 5. Traffic Signal FSM
  {
    id: "traffic-signal-fsm", 
    name: "Traffic Signal Simulation",
    description: "A simulation of traffic light control using a Finite State Machine (FSM) model.",
    longDescription: "A core computer science and engineering project featuring a simulation of traffic light control using a Finite State Machine (FSM) model. It efficiently cycles through RED, YELLOW, and GREEN states based on timed transitions or sensor inputs, mimicking real-world signal behavior.",
    features: [
      "Implementation of Finite State Machine (FSM) logic",
      "State transitions based on timing and sensors",
      "Efficient real-world logic simulation"
    ],
    tech: ["FSM", "System Design", "Simulation", "Logic Design"], 
    image: "/projects/traffic-main.png", 
    screenshots: [
      "/projects/traffic-1.png"
    ],
    github: "https://github.com/souravlouha/Traffic_Signal_using_Finite_State_Machine"
  },

  // 6. Movie Recommender System
  {
    id: "movie-recommender", 
    name: "Movie Recommender",
    description: "A personalized movie recommendation engine built using machine learning techniques.",
    longDescription: "A sophisticated movie recommendation system that suggests films to users based on similarities and historical data. It processes large movie datasets to find patterns and deliver accurate, personalized entertainment choices.",
    features: [
      "Content-based filtering and recommendation logic",
      "Large-scale dataset processing",
      "Personalized user suggestions"
    ],
    tech: ["Python", "Machine Learning", "Scikit-Learn", "Pandas"], 
    image: "/projects/movie-main.png", 
    screenshots: [
      "/projects/movie-1.png"
    ],
    github: "https://github.com/souravlouha/Movie_Recommender_System"
  }
];
// ==========================================
// 3. Testimonials Data Array
// ==========================================
export const TESTIMONIALS = [
  {
    title: "Supportive, creative, and great to build alongside",
    quote: "Working alongside Sourav has been a genuinely positive experience. He brings strong frontend knowledge and a fresh perspective to every problem. His ability to break down challenges and find clean solutions makes collaboration smooth.",
    avatar: "/images/shashank.jpg", // আপনার ফোল্ডারে থাকা ছবির নাম অনুযায়ী পাথ দিন
    name: "Shashank Kumar",
    role: "Senior Software Engineer",
    company: "Cognizant"
  },
  {
    title: "A dependable builder with strong attention to detail",
    quote: "Sourav contributed solid improvements to our project. His structured approach and clear communication helped raise the overall quality of the work. He is someone you can rely on when building interfaces and collaborating within a team environment.",
    avatar: "/images/armaan.jpg",
    name: "Armaan Singh",
    role: "Technical Lead",
    company: "Infosys"
  },
  {
    title: "Consistent quality and thoughtful execution",
    quote: "Sourav stands out as a reliable frontend contributor. His ability to write clean code and shape user-friendly interfaces consistently adds value. He takes initiative, stays dependable, and puts genuine effort into making sure things work well.",
    avatar: "/images/akshit.jpg",
    name: "Akshit Malik",
    role: "Software Engineer III",
    company: "Google"
  },
  {
    title: "Strong frontend skills plus good design sense",
    quote: "He is a great frontend developer to collaborate with. He understands design and helps improve things effectively. His attention to detail, creativity, and clean code made the process comfortable. I'm genuinely happy with the outcomes.",
    avatar: "/images/yuvika.jpg",
    name: "Yuvika Bhat",
    role: "Product Manager",
    company: "Amazon"
  },
  {
    title: "Fast learner and problem solver",
    quote: "Working with him was effortless. He quickly grasps complex requirements and turns them into pixel-perfect, functional components. Highly recommended for any frontend role.",
    avatar: "/images/rahul.jpg",
    name: "Rahul Verma",
    role: "Senior UI/UX Designer",
    company: "Microsoft"
  },
  {
    title: "Dedicated and passionate developer",
    quote: "His dedication to his craft is inspiring. He doesn't just write code; he thinks about the end-user experience. A truly valuable asset to any engineering team.",
    avatar: "/images/sneha.jpg",
    name: "Sneha Das",
    role: "Engineering Manager",
    company: "Atlassian"
  }
];

// ==========================================
// 4. Skills Data Array
// ==========================================
export const SKILLS = [
  // Web & Frontend
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "🟦" },
  { name: "JavaScript", icon: "🟨" },
  { name: "HTML", icon: "📙" },
  { name: "CSS", icon: "📘" },
  { name: "Tailwind CSS", icon: "🌊" },
  
  // Backend & Databases
  { name: "Node.js", icon: "🟩" },
  { name: "Django", icon: "🐎" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MySQL", icon: "🐬" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Prisma", icon: "🔗" },

  // Core Languages & Logic
  { name: "Python", icon: "🐍" },
  { name: "Java", icon: "☕" },
  { name: "C++", icon: "⚙️" },
  { name: "DSA", icon: "🧠" },

  // Machine Learning & Data
  { name: "TensorFlow", icon: "🤖" },
  { name: "PyTorch", icon: "🔥" },
  { name: "Jupyter", icon: "📓" },

  // App & Hardware
  { name: "Flutter", icon: "🦋" },
  { name: "Arduino", icon: "♾️" },

  // Cloud & DevOps
  { name: "AWS", icon: "☁️" },
  { name: "Google Cloud", icon: "🌥️" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "🐙" },

  // Design
  { name: "UI/UX Design", icon: "✨" },
  { name: "Figma", icon: "🎨" }
];