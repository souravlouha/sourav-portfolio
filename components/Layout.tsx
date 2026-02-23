// src/components/Layout.tsx
import React from 'react';
import Header from './Header';
import DecodingSection from './DecodingSection';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* এই <main> এর ভেতরে আপনার নির্দিষ্ট পেজ (Home, About, Blog) লোড হবে */}
      <main className="flex-grow">
        {children}
      </main>

      {/* প্রতিটি পেজেই ফুটারের ঠিক ওপরে এই সেকশনটি থাকবে */}
      <DecodingSection />
      
      <Footer />
    </div>
  );
};

export default Layout;