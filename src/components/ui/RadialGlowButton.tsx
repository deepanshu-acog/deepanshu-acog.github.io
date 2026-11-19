import React from 'react';
import { cn } from '../../utils/cn';

export interface RadialGlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  href?: string;
}

export const RadialGlowButton: React.FC<RadialGlowButtonProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  const content = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {/* Dynamic radial glow halo */}
      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#00e5ff]/30 via-[#4cc38a]/30 to-[#00e5ff]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
      <span className="absolute inset-[1px] rounded-[7px] bg-[#18191c] group-hover:bg-[#222327] transition-colors pointer-events-none" />
      <span className="relative z-10 text-xs font-mono font-medium text-[#ededed] group-hover:text-[#00e5ff] transition-colors flex items-center gap-1.5">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "group relative inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[rgba(237,237,237,0.12)] hover:border-[#00e5ff]/50 shadow-subtle transition-all duration-200 overflow-hidden cursor-pointer",
          className
        )}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center px-4 py-2 rounded-lg border border-[rgba(237,237,237,0.12)] hover:border-[#00e5ff]/50 shadow-subtle transition-all duration-200 overflow-hidden cursor-pointer",
        className
      )}
      {...props}
    >
      {content}
    </button>
  );
};
