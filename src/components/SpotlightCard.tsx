import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  enableTilt = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Calculate tilt degrees
  const rotateX = useTransform(smoothY, [-0.5, 0.5], enableTilt ? ['4deg', '-4deg'] : ['0deg', '0deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], enableTilt ? ['-4deg', '4deg'] : ['0deg', '0deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized from -0.5 to 0.5
    mouseX.set((x / rect.width) - 0.5);
    mouseY.set((y / rect.height) - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-xl bg-[#18191c] border border-[rgba(237,237,237,0.08)] transition-[border-color,background-color] duration-200 overflow-hidden ${
        isHovered ? 'border-[rgba(0,229,255,0.25)]' : ''
      } ${className}`}
    >
      {/* Dynamic Cursor Spotlight Raycast */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]: any[]) => {
              const px = (x + 0.5) * 100;
              const py = (y + 0.5) * 100;
              return `radial-gradient(350px circle at ${px}% ${py}%, rgba(0, 229, 255, 0.08), transparent 60%)`;
            }
          ),
        }}
      />

      {/* Card Content with Depth */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};
