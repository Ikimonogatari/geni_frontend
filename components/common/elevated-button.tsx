"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ElevatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const ElevatedButton = forwardRef<HTMLButtonElement, ElevatedButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "bg-[#fbca1f] font-inherit px-5 py-2.5 font-black text-primary-foreground",
          "border border-primary rounded-[0.4em]",
          "shadow-[0.2em_0.2em_#9C44DA]",
          "cursor-pointer",
          "transition-transform duration-100",
          // "hover:translate-x-[-0.05em] hover:translate-y-[-0.05em] hover:shadow-[0.15em_0.15em_#000]",
          "active:translate-x-[0.1em] active:translate-y-[0.1em] active:shadow-[0.1em_0.1em_#9C44DA]",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ElevatedButton.displayName = "ElevatedButton";

export { ElevatedButton };
