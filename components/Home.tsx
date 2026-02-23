import React, { useEffect } from 'react';
import Hero from './Hero';
import BentoGrid from './BentoGrid';
import About from './About';
import ProjectShowcase from './ProjectShowcase';
import Skills from './Skills';
import Testimonials from './Testimonials';

const Home: React.FC = () => {
  // Scroll Animation Logic 
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      }, { threshold: 0.1 });

    setTimeout(() => {
        document.querySelectorAll('.scroll-fade').forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-white selection:bg-purple-200 selection:text-purple-900">
      <main>
        <Hero />
        <BentoGrid />
        <About />
        <ProjectShowcase />
        <Skills />
        <Testimonials />
      </main>
    </div>
  );
};

export default Home;