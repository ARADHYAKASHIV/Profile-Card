import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Subtle, tight spring response for natural pointer feel
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

  const ringX = useSpring(mouseX, { stiffness: 350, damping: 30 });
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 30 });

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const fineQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(fineQuery.matches);

    const handlePointerTypeChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    fineQuery.addEventListener('change', handlePointerTypeChange);

    if (!fineQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, input, textarea, [role="button"], .cursor-interactive');
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', checkHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      fineQuery.removeEventListener('change', handlePointerTypeChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isFinePointer || !isVisible) return null;

  const isDark = theme === 'dark';

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Subtle Hairline Halo (Minimalist & quiet) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 32 : 22,
          height: isHovered ? 32 : 22,
          borderColor: isDark
            ? isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.18)'
            : isHovered ? 'rgba(15, 23, 42, 0.45)' : 'rgba(15, 23, 42, 0.2)',
          backgroundColor: isHovered
            ? (isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)')
            : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      />

      {/* Tiny Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 4 : 5,
          height: isHovered ? 4 : 5,
          backgroundColor: isDark ? '#FFFFFF' : '#0F172A',
          opacity: isHovered ? 0.7 : 0.9,
        }}
      />
    </div>
  );
};
