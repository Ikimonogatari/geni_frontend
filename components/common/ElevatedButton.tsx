"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ElevatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: "pink" | "blue" | "green" | "orange";
}

const colorStyles: Record<string, { bg: string; shadow: string }> = {
  pink: { bg: "bg-geni-pink", shadow: "shadow-[0.25rem_0.25rem_#9C44DA]" },
  blue: { bg: "bg-geni-blue", shadow: "shadow-[0.25rem_0.25rem_#131aaf]" },
  green: { bg: "bg-geni-green", shadow: "shadow-[0.25rem_0.25rem_#1b7b2b]" },
  orange: { bg: "bg-[#F75423]", shadow: "shadow-[0.25rem_0.25rem_#b86416]" },
};

const ElevatedButton = forwardRef<HTMLButtonElement, ElevatedButtonProps>(
  ({ className, theme = "pink", children, ...props }, ref) => {
    const { bg, shadow } = colorStyles[theme] || colorStyles.pink;

    return (
      <button
        className={cn(
          bg,
          "font-inherit text-base py-5 px-9 font-black text-primary-foreground",
          "border border-primary rounded-[0.4em]",
          shadow,
          "cursor-pointer",
          "transition-transform duration-100",
          "transition-all transform translate-x-[-0.25rem] translate-y-[-0.25rem] active:translate-x-0 active:translate-y-0 active:shadow-none",
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
