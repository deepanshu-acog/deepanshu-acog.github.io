import React, { useState, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface AnimatedTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  children,
  content,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className={cn('relative inline-flex items-center', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span className="cursor-pointer inline-flex items-center">
        {children}
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg bg-[#222327] border border-[rgba(0,229,255,0.3)] shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-50 pointer-events-none whitespace-nowrap"
          >
            <div className="text-[11px] font-mono text-[#ededed] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
              {content}
            </div>
            {/* Arrow pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#222327]" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
