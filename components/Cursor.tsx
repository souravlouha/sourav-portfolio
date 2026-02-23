import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // যদি মাউস কোনো বাটন বা লিংকের ওপর যায়, তখন কার্সার বড় হবে
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* মেইন ছোট ডট (সরাসরি মাউসের সাথে চলবে) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6, // সাইজের অর্ধেক বিয়োগ করে সেন্টারে আনা হলো
          y: mousePosition.y - 6,
          scale: isHovered ? 0 : 1 // হোভার করলে ছোট ডট গায়েব হয়ে যাবে
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0 }}
      />

      {/* বাইরের বড় রিং (একটু স্মুথলি ফলো করবে) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-neutral-500 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16, // সাইজের অর্ধেক (16px) বিয়োগ
          y: mousePosition.y - 16,
          scale: isHovered ? 2.5 : 1, // হোভার করলে বড় হবে
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
          borderColor: isHovered ? "transparent" : "rgba(115, 115, 115, 0.5)"
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />
    </>
  );
};

export default Cursor;