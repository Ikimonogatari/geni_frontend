"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface BadgeProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  bgcolor?: string;
  currentTarget: number;
  nextTarget: number;
}

const BadgeProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  BadgeProgressProps
>(
  (
    { className, value, bgcolor = "", currentTarget, nextTarget, ...props },
    ref
  ) => {
    // Calculate progress percentage
    const progressPercentage =
      nextTarget > 0 ? Math.round((currentTarget / nextTarget) * 100) : 100;

    return (
      <div className="w-full">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            "relative h-4 !w-full overflow-hidden rounded-full bg-primary-bg",
            className
          )}
          value={progressPercentage}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={`h-full w-full flex-1 ${
              bgcolor || "bg-geni-blue"
            } transition-all rounded-full`}
            style={{ transform: `translateX(-${100 - progressPercentage}%)` }}
          />
        </ProgressPrimitive.Root>

        <div className="text-lg font-bold text-black flex items-center justify-center">
          <div className="relative">
            <span className="">{currentTarget}</span>/{nextTarget}
            <span className="text-sm absolute bottom-0.5 -right-5.5">&nbsp;XP</span>
          </div>
        </div>
      </div>
    );
  }
);

BadgeProgress.displayName = ProgressPrimitive.Root.displayName;

export { BadgeProgress };
