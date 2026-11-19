import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const InteractiveHoverButton: React.FC<InteractiveHoverButtonProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  const content = (
    <>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[#00e5ff] transition-all duration-300 group-hover:scale-[100]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 left-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-[#0f0f10] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 font-medium">
        <span>{children}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-lg border border-[rgba(237,237,237,0.12)] bg-[#18191c] text-[#ededed] px-5 py-2.5 text-xs font-medium text-center shadow-subtle hover:border-[#00e5ff]/50 transition-colors",
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
        "group relative inline-flex items-center justify-center cursor-pointer overflow-hidden rounded-lg border border-[rgba(237,237,237,0.12)] bg-[#18191c] text-[#ededed] px-5 py-2.5 text-xs font-medium text-center shadow-subtle hover:border-[#00e5ff]/50 transition-colors",
        className
      )}
      {...props}
    >
      {content}
    </button>
  );
};
