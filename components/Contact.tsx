import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const SOCIAL_LINKS = [
  { name: 'Github', url: 'https://github.com/souravlouha' },
  { name: 'X (Twitter)', url: 'https://x.com/iamsouravn' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sourav-louha-703953249/' },
  { name: 'Instagram', url: 'https://www.instagram.com/souravlouha_s/' },
  { name: 'Email', url: 'mailto:souravlouha01@gmail.com' },
];

const Contact = () => {
  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState(false);

  // পেজ লোড হলে যাতে স্ক্রল একদম উপরে থাকে
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Formspree-তে ফর্ম সাবমিট হওয়ার পর, ইউজার যখন আবার এই পেজে ফিরে আসবে,
  // তখন URL-এ যদি "?success=true" থাকে, তাহলে আমরা একটি Success মেসেজ দেখাব।
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('success') === 'true') {
      setIsSuccess(true);
      // ৩ সেকেন্ড পর Success মেসেজ সরিয়ে দেব
      setTimeout(() => setIsSuccess(false), 5000);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white py-24 px-4 font-sans relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-neutral-100 to-transparent blur-3xl rounded-full opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================= HERO SECTION ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 block mb-4">
              Connect / Follow / Chat
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none text-neutral-900">
              My <span className="text-neutral-300">Digital</span> <br />
              Presence
            </h1>
          </div>
          
          {/* UPDATED IMAGE SECTION: Bigger size and red shirt image */}
          {/* w-32 h-32 থেকে বাড়িয়ে w-64 h-64 করা হয়েছে */}
          <div className="hidden md:block w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl shrink-0">
            <img 
              src="/images/about02.jpeg" // <--- লাল জামা পরা ছবিটির পাথ এখানে দিন
              alt="Sourav Louha" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ================= MAIN CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: Giant Social Links */}
          <div className="lg:col-span-7 flex flex-col">
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-center justify-between border-b border-neutral-200 py-8 hover:bg-neutral-50 px-4 -mx-4 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-neutral-300 text-sm font-bold font-mono">
                    0{index + 1}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-neutral-900 group-hover:text-purple-600 transition-colors">
                    {link.name}
                  </h3>
                </div>
                
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-900 group-hover:border-neutral-900 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-neutral-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </motion.a>
            ))}
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-50 p-8 md:p-10 rounded-[2.5rem] border border-neutral-100 shadow-sm sticky top-32">
              <div className="mb-8">
                <h3 className="text-3xl font-black tracking-tighter text-neutral-900 mb-2">Leave a message</h3>
                <p className="text-sm text-neutral-500 font-medium">Have an idea or a project? Let's talk about it.</p>
              </div>

              {/* Success Message Alert (ফর্ম সাবমিট হওয়ার পর দেখাবে) */}
              {isSuccess && (
                <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-700 rounded-xl text-sm font-bold flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Message sent successfully!
                </div>
              )}

              {/* Formspree Integration Starts Here */}
              <form action="https://formspree.io/f/xojnkoed" method="POST" className="flex flex-col gap-5">
                
                <input type="hidden" name="_next" value={window.location.origin + "/contact?success=true"} />
                <input type="hidden" name="_subject" value="New Contact Message from Portfolio!" />
                <input type="hidden" name="_captcha" value="false" />

                {/* Name Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pl-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    placeholder="John Doe" 
                    className="w-full bg-white px-5 py-4 rounded-2xl border border-neutral-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm font-medium"
                  />
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pl-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    placeholder="john@example.com" 
                    className="w-full bg-white px-5 py-4 rounded-2xl border border-neutral-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm font-medium"
                  />
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 pl-2">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project or ideas..." 
                    className="w-full bg-white px-5 py-4 rounded-2xl border border-neutral-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm font-medium resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="mt-4 w-full py-5 bg-neutral-900 hover:bg-black text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  Send Message 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;