import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const CHARS = '!<>-_\\/[]{}—=+*^?#_0101';

interface CyberGlitchTextProps {
  text: string;
  className?: string;
  scrambleOnMount?: boolean;
  scrambleDuration?: number;
}

export const CyberGlitchText: React.FC<CyberGlitchTextProps> = ({
  text,
  className,
  scrambleOnMount = true,
  scrambleDuration = 35,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, scrambleDuration);
  };

  useEffect(() => {
    if (scrambleOnMount) {
      scramble();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, scrambleOnMount]);

  return (
    <div
      className={cn('relative inline-block group cursor-pointer', className)}
      onMouseEnter={() => {
        setIsHovered(true);
        scramble();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Text */}
      <span className="relative z-10">{displayText}</span>

      {/* Glitch Layers for Chromatic Aberration */}
      {isHovered && (
        <>
          <motion.span
            className="absolute top-0 left-[-2px] z-0 text-[#00e5ff] opacity-80 mix-blend-screen select-none pointer-events-none"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: [-2, 2, -1, 3, 0], opacity: [0, 0.9, 0.4, 0.9, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: 'mirror' }}
            aria-hidden="true"
          >
            {displayText}
          </motion.span>
          <motion.span
            className="absolute top-0 left-[2px] z-0 text-violet-400 opacity-80 mix-blend-screen select-none pointer-events-none"
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: [2, -2, 1, -3, 0], opacity: [0, 0.9, 0.4, 0.9, 0] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatType: 'mirror', delay: 0.05 }}
            aria-hidden="true"
          >
            {displayText}
          </motion.span>

          {/* Slice Glitch Line Overlay */}
          <motion.div
            className="absolute inset-0 bg-[#00e5ff]/20 z-20 pointer-events-none mix-blend-overlay"
            initial={{ top: '0%', height: '0%' }}
            animate={{ top: ['0%', '40%', '80%', '0%'], height: ['2px', '4px', '1px', '0px'] }}
            transition={{ duration: 0.25, repeat: Infinity }}
          />
        </>
      )}
    </div>
  );
};
