// src/notesData.ts

export interface MicroThought {
  id: number;
  content: string;
  date: string;
  time: string;
}

export const notesData: MicroThought[] = [
  {
    id: 1,
    content: "Strongly condemn the recent incidents regarding international border policies. A nation's security and sovereignty must never be compromised under any geopolitical pressure.",
    date: "Feb 20, 2026",
    time: "10:30 AM"
  },
  {
    id: 2,
    content: "Reading about the new tech policies for startups in Bengal and Assam. There's immense potential here if the execution aligns with the vision. We need more builder-friendly ecosystems.",
    date: "Feb 14, 2026",
    time: "09:15 AM"
  },
  {
    id: 3,
    content: "Just pushed a massive update to my portfolio! Built with React and Next.js, and refined the UI components. The performance boost is unreal. 🚀",
    date: "Feb 10, 2026",
    time: "11:45 PM"
  },
  {
    id: 4,
    content: "A quick reminder: Ideology without action is just philosophy. True change happens when you build systems—whether in code, or in society.",
    date: "Feb 05, 2026",
    time: "08:00 PM"
  }
];