"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

const colorStyles: Record<string, { bg: string; shadow: string }> = {
  pink: { bg: "bg-geni-pink", shadow: "shadow-[0.25rem_0.25rem_#9C44DA]" },
  blue: { bg: "bg-geni-blue", shadow: "shadow-[0.25rem_0.25rem_#131aaf]" },
  green: { bg: "bg-geni-green", shadow: "shadow-[0.25rem_0.25rem_#1b7b2b]" },
  orange: { bg: "bg-[#F75423]", shadow: "shadow-[0.25rem_0.25rem_#b86416]" },
};

export interface ElevatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: "pink" | "blue" | "green" | "orange";
  asChild?: boolean;
}

const ElevatedButton = React.forwardRef<HTMLButtonElement, ElevatedButtonProps>(
  ({ className, asChild = false, theme = "pink", ...props }, ref) => {
    const { bg, shadow } = colorStyles[theme] || colorStyles.pink;
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "font-inherit text-base py-5 px-9 font-black text-primary-foreground border border-primary rounded-[30px] cursor-pointer duration-100 transition-all transform translate-x-[-0.25rem] translate-y-[-0.25rem] active:translate-x-0 active:translate-y-0 active:shadow-none",
          bg,
          shadow,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

ElevatedButton.displayName = "ElevatedButton";

export { ElevatedButton };
