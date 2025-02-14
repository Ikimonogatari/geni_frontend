import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  themeType?: string;
  type?: "submit" | "reset" | "button";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ themeType, className, type, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "border border-[#2D262D] py-3 sm:py-4 font-bold text-base sm:text-xl rounded-lg sm:rounded-xl transition-all",
          themeType,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
